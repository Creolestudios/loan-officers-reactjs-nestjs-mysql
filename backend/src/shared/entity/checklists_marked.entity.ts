import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Checklists_Marked extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    comment: 'this will be json string of all required items selected by users',
    nullable: true,
  })
  check_list_marked_items: string;

  @Column({
    comment: 'loan officer id',
  })
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'loan_officer_id' })
  loan_officer_id: Users;

  @Column({
    comment: 'borrower id',
  })
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'user_id' })
  user_id: Users;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
