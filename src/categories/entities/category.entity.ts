import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Complaint } from '../../complaint/entities/complaint.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Complaint, (complaint) => complaint.category)
  complaints: Complaint[];
}
