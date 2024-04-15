import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export class Subscription_Plans extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  plan_name: string;

  @Column({ type: 'longtext' })
  plan_details: string;

  @Column('float', { precision: 10, scale: 2 })
  plan_fees: number;

  @Column({ type: 'datetime', nullable: true })
  start_date: Date;

  // @Transform(end_date => moment(end_date).format('DD/MM/YY'))
  @Column({ nullable: true })
  end_date: Date;

  @Column()
  duration: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
