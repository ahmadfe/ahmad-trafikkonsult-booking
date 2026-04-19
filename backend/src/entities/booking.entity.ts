import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  student: User;

  @ManyToOne(() => User)
  @JoinColumn()
  instructor: User;

  @Column()
  date: Date;

  @Column()
  duration: number; // 50 or 75 min

  @Column({ default: 'pending' })
  status: string; // pending, confirmed, cancelled

  @CreateDateColumn()
  createdAt: Date;
}