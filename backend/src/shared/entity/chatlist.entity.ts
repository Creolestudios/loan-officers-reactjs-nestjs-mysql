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
export class ChatList extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinyint', default: 1, comment: '0: disabled, 1: enabled' })
  status: number;

  @Column()
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'borrower_id' })
  borrower_id: number;

  @Column()
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'lo_id' })
  lo_id: number;

  @Column()
  chat_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
