import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Learning_Center extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({
    comment:
      'If Role is loan officer, values will be related to them only. If admin, values will be relating to all : foreign key (users)',
  })
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
