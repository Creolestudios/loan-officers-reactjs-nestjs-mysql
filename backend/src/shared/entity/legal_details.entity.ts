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
export class Legal_Details extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column({
    type: 'tinyint',
    width: 1,
    // enum: [0, 1],
  })
  detail_type: number;

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
