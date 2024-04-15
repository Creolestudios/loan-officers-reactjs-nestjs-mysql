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
export class Recent_Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activity_text: string;

  @Column({ comment: 'foreign key (users)' })
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'activity_by_id' })
  activity_by_id: number;

  @Column()
  activity_by_name: string;

  @Column({
    nullable: true,
    comment: '1: has signed up as Branch Manager. 2: has requested for a branded app. 3: added a Co-Branding Officer.',
  })
  activity_category: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
