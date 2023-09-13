import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Complaint } from '../../complaint/entities/complaint.entity';

@Entity('rates')
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', unsigned: true, nullable: false })
  valuation: number;

  @ManyToOne(() => User, (user) => user.rates)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Complaint, (complaint) => complaint.rates)
  @JoinColumn({ name: 'complaint_id' })
  complaint: Complaint;

  @Column({ nullable: false, name: 'complaint_id' })
  complaintId: number;

  @Column({ nullable: false, name: 'user_id' })
  userId: number;
}
