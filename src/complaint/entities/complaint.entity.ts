import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Rate } from '../../rates/entities/rate.entity';

@Entity('complaints')
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, type: 'float' })
  latitude: number;

  @Column({ nullable: false, type: 'float' })
  longitude: number;

  @ManyToOne(() => User, (user) => user.complaints)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false, name: 'user_id' })
  userId: number;

  @ManyToOne(() => Category, (category) => category.complaints)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ nullable: false, name: 'category_id' })
  categoryId: number;

  @OneToMany(() => Rate, (rate) => rate.complaint)
  rates: Rate[];
}
