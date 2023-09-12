import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { Complaint } from './entities/complaint.entity';

@Injectable()
export class ComplaintService {
  constructor(
    @InjectRepository(Complaint)
    private readonly complaintRepository: Repository<Complaint>,
  ) {}

  async create(createComplaintDto: CreateComplaintDto): Promise<Complaint> {
    const newComplaint = this.complaintRepository.create(createComplaintDto);
    return await this.complaintRepository.save(newComplaint);
  }

  async findAll(): Promise<Complaint[]> {
    return await this.complaintRepository.find();
  }

  async findOne(id: any): Promise<Complaint> {
    return await this.complaintRepository.findOne(id);
  }

  async update(
    id: any,
    updateComplaintDto: UpdateComplaintDto,
  ): Promise<Complaint> {
    await this.complaintRepository.update(id, updateComplaintDto);
    return await this.complaintRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.complaintRepository.delete(id);
  }
}
