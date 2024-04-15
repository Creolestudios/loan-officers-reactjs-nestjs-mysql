import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export class Color_Schemes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  scheme_name: string;

  @Column({ type: 'text', comment: 'JSON string' })
  scheme_details: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
