import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Loan_Programs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  program_name: string;

  @Column({ type: 'longtext' })
  program_description: string;

  @Column()
  program_icon: string;

  @Column()
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'loan_officer_id' })
  loan_officer_id: number;

  @Column()
  is_default: boolean;

  @Column({ comment: 'the sequence in which it will be displayed', type: 'tinyint' })
  sequence_number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
