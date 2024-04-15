import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Support_Guides } from './support_guides.entity';

@Entity()
export class Support_Guides_Categories extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;

  @Column({ type: 'text', nullable: true })
  category_description: string;

  @OneToMany(
    () => Support_Guides,
    support_Guides => support_Guides.id,
  )
  support_Guides: Support_Guides;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
