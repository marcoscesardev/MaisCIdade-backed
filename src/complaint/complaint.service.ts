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
    return await this.complaintRepository.find({
      relations: ['category'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findTopRatedComplaints(): Promise<any[]> {
    const complaintsWithVotes = await this.complaintRepository
      .createQueryBuilder('complaint')
      .leftJoin(
        `(WITH vote_counts AS (
          SELECT c.id AS complaint_id,
                 SUM(CASE WHEN r.valuation = 1 THEN 1 ELSE 0 END) AS positiveVotes,
                 SUM(CASE WHEN r.valuation = -1 THEN 1 ELSE 0 END) AS negativeVotes
          FROM complaints c
          LEFT JOIN rates r ON c.id = r.complaint_id
          GROUP BY c.id
      )
      SELECT v.complaint_id, v.positiveVotes, v.negativeVotes, v.positiveVotes - v.negativeVotes AS totalVotes
      FROM vote_counts v)`,
        'votes',
        'votes.complaint_id = complaint.id',
      )
      .leftJoin('categories', 'category', 'category.id = complaint.category_id') // Join com a tabela categories
      .select('complaint')
      .addSelect('votes.positiveVotes', 'positiveVotes')
      .addSelect('votes.negativeVotes', 'negativeVotes')
      .addSelect('votes.totalVotes', 'totalVotes')
      .addSelect('category.name', 'categoryName')
      .orderBy('votes.totalVotes', 'DESC')
      .limit(5)
      .getRawMany();

    return complaintsWithVotes;
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
