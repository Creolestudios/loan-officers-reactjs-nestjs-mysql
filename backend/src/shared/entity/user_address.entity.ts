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
export class User_Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @OneToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column()
  country_id: number;

  @Column({ nullable: true })
  state_id: number;

  @Column({ comment: 'keeping city open for text', nullable: true })
  city: string;

  @Column({ nullable: true })
  zip_code: string;

  @Column({ nullable: true })
  street_details: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
