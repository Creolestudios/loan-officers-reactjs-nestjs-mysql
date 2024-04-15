import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class App_Installations extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'foreign key (users)' })
  @OneToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'loan_officer_id' })
  loan_officer_id: Users;

  @Column({
    type: 'tinyint',
    width: 1,
    comment: '0: Android 1: Web',
  })
  app_type: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
