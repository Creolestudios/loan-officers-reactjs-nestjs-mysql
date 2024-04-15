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
export class Branded_App_Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'loan_officer_id' })
  loan_officer_id: Users;

  @Column({ nullable: true })
  company_name: string;

  @Column({ nullable: true })
  app_name: string;

  @Column({ nullable: true })
  name: string;

  @Column('float', { precision: 10, scale: 2, nullable: true })
  taxes: number;

  @Column('float', { precision: 10, scale: 2, nullable: true })
  additional_charges: number;

  @Column({ nullable: true })
  email: string;

  @Column({
    type: 'tinyint',
    width: 2,
    comment: '1: active 2: in-active 3: pending 4: rejected 5: cancelled 6:expired',
  })
  status: number;

  @Column({
    type: 'tinyint',
    width: 2,
    comment: '1: Paid 2: Inprogress 3: Complete',
    default: 2,
  })
  playstore_status: number;

  @Column({ type: 'text', nullable: true })
  invitation_send: string;

  //Doubt this
  @Column('float', { precision: 10, scale: 2, nullable: true })
  subscription_amount: number;

  @Column({ type: 'text', nullable: true })
  reject_reason: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @Column({ default: null })
  config_id: string;
}
