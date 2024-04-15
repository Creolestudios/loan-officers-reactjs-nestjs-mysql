import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Refers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ comment: 'If refered by coBranded user then its ParentLO id , if refered by Lo then LO id' })
  referred_by: number;

  @PrimaryColumn()
  referred_to: number;

  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'referred_by' })
  public user_referred_by!: Users;

  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'referred_to' })
  public user_referred_to!: Users;

  @Column({ nullable: true, comment: 'co-branded user id if refered by coBranded else null' })
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'co_branding_id' })
  co_branding_id: Users;

  @Column({ type: 'text', nullable: true })
  meta_data: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
