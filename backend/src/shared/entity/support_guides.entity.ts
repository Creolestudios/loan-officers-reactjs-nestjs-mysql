import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { Support_Guides_Categories } from './support_guides_categories.entity';

@Entity()
export class Support_Guides extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'foreign key (support_guide_categories)' })
  @ManyToOne(
    () => Support_Guides_Categories,
    Support_Guides_Categories => Support_Guides_Categories.id,
  )
  @JoinColumn({ name: 'category_id' })
  category_id: Support_Guides_Categories;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true, default: 0 })
  checked: number;

  @Column({ type: 'text' })
  guide_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
