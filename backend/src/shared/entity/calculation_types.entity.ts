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
export class Calculation_Types extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  calculation_name: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'This will be json string containing of all the default values required for this particular calculation',
  })
  calculation_default_values: string;

  @Column({
    type: 'text',
    comment: 'This will be json string containing of all the loan factors for this particular calculation',
  })
  calculation_loan_factors: string;

  @Column({
    type: 'text',
    comment: 'calculator Disclaimer',
    nullable: true,
  })
  calculator_disclaimer: string;

  @Column({ nullable: true })
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'loan_officer_id' })
  loan_officer_id: Users;

  @Column({
    type: 'text',
    comment: 'This will be json string containing of all the other values if any particular calculation needs',
    nullable: true,
  })
  other_default_values: string;

  @Column({
    default: true,
  })
  is_enable: boolean;

  @Column({
    type: 'tinyint',
    width: 1,
    comment: '0: Changed values 1: pre-set default values(this will be used when user does restore default value)',
    default: 1,
  })
  restore_default_values: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
