import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message_title: string;

  @Column({ type: 'longtext' })
  message_body: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
