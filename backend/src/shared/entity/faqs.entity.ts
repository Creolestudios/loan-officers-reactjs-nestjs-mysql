import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export class Faqs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ comment: 'the sequence in which the question will be displayed', type: 'tinyint' })
  sequence_number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
