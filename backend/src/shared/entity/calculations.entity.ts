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
import { Calculation_Types } from './calculation_types.entity';

@Entity()
export class Calculations extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'calculation_by_id' })
  calculation_by_id: Users;

  @Column({ nullable: true })
  @ManyToOne(
    () => Calculation_Types,
    Calculation_Types => Calculation_Types.id,
  )
  @JoinColumn({ name: 'calculation_type_id' })
  calculation_type_id: Calculation_Types;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    // enum: [0, 1],
  })
  calculation_saved: number;

  @Column({
    nullable: true,
  })
  calculation_name: string;

  @Column({
    nullable: true,
  })
  calculation_category: string;

  @Column({
    nullable: true,
  })
  calculation_document_name: string;

  @Column({
    type: 'longtext',
    comment: 'This will be json string containing of all the calculated and entered values by the user',
  })
  calculations_details: string;

  @Column({
    type: 'text',
    default: null,
    comment: 'This will be json string containing of all request payload',
  })
  calculation_request_payload: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
