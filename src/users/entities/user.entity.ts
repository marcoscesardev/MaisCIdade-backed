import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Complaint } from '../../complaint/entities/complaint.entity';
import { Rate } from '../../rates/entities/rate.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Complaint, (complaint) => complaint.user)
  complaints: Complaint[];

  @OneToMany(() => Rate, (rate) => rate.user)
  rates: Rate[];

  @OneToMany(() => Complaint, (complaint) => complaint.solvedBy)
  solvedComplaints: Complaint[];

  @Column({ nullable: true })
  level: string;
}
