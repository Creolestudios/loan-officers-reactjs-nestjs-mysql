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
export class Device_Tokens extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'foreign key (users)' })
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'user_id' })
  user_id: Users;

  @Column()
  device_token: string;

  @Column()
  platform: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
