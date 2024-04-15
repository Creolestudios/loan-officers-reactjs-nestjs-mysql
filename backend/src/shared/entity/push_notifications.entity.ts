import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Push_Notifications extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: 'foreign key (users)', nullable: true })
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'notification_by' })
  notification_by: Users;

  @Column({ comment: 'foreign key (users)', nullable: true })
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'notification_to' })
  notification_to: Users;

  @Column()
  notification_text: string;

  @Column({
    nullable: true,
    comment:
      '1: Borrower_Uploads_Doc, 2: DeepLink_LO, 3: Promotions, 4: Callback_Request, 5: Card_ExpiryDate_Nearby, 6: Approved_BrandedApp, 7:Receives_msg_admin, 8:Receives_msg_LoanOfficer',
  })
  notification_category: number;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'JSON string of {key:val} , Extra information to be added for a notification',
  })
  meta_data: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, comment: 'If deleted that means it has been read buy user.' })
  deleted_at: Date;
}
