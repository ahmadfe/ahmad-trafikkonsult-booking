import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  student: User;

  @ManyToOne(() => User)
  @JoinColumn()
  instructor: User;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}