import { Injectable } from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from './entities/rate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
  ) {}

  async create(createRateDto: CreateRateDto) {
    const newComplaint = this.rateRepository.create(createRateDto);
    return await this.rateRepository.save(newComplaint);
  }

  async findByComplaintIdAndUserId(complaintId: number, userId: number) {
    return await this.rateRepository
      .createQueryBuilder('rate')
      .select('COUNT(rate.id)', 'total')
      .addSelect(
        'SUM(CASE WHEN rate.valuation = -1 THEN 1 ELSE 0 END)',
        'negative',
      )
      .addSelect(
        'SUM(CASE WHEN rate.valuation = 1 THEN 1 ELSE 0 END)',
        'positive',
      )
      .addSelect(
        'MAX(CASE WHEN rate.user = :userId THEN rate.id ELSE NULL END)',
        'userRateId',
      )
      .addSelect(
        'CASE WHEN MAX(CASE WHEN rate.user = :userId THEN rate.valuation ELSE NULL END) IS NOT NULL THEN MAX(CASE WHEN rate.user = :userId THEN rate.valuation ELSE NULL END) ELSE 0 END',
        'userValuation',
      )
      .where('rate.complaint = :complaintId', { complaintId })
      .setParameter('userId', userId)
      .getRawOne();
  }

  async remove(id: number): Promise<void> {
    await this.rateRepository.delete(id);
  }
}
