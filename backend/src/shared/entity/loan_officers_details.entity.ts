import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Branded_App_Users } from './branded_app_users.entity';

@Entity()
export class Loan_Officers_Details extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @OneToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'user_id' })
  user_id: Users;

  @Column({ type: 'text', comment: 'JSON string ', nullable: true })
  loan_officers_id: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  licence: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'text', nullable: true })
  welcome_text: string;

  @Column({
    type: 'blob',
    comment: 'This will be json string containing key:value pairs',
    nullable: true,
  })
  dashboard_menu_details: string;

  @Column({
    type: 'blob',
    comment: 'json string containing {company_links:[{...,isChangeable:boolean}] }',
    nullable: true,
  })
  dashboard_company_links: string;

  @Column({
    type: 'blob',
    comment: 'json string containing {company_links:[{...,isChangeable:boolean}] }',
    nullable: true,
  })
  appMenu_company_links: string;

  @Column({
    type: 'blob',
    comment: 'This will be json string containing key:value pairs',
    nullable: true,
  })
  dashboard_menu_custom_links: string;

  @Column({
    type: 'blob',
    comment: 'This will be json string containing key:value pairs',
    nullable: true,
  })
  app_menu_details: string;

  @Column({
    type: 'blob',
    comment: 'This will be json string containing key:value pairs',
    nullable: true,
  })
  app_menu_custom_links: string;

  @Column({
    type: 'text',
    comment: 'This will be json string containing key:value pairs',
    nullable: true,
  })
  extra_column: string;

  @Column({
    type: 'text',
    comment: 'This will be json string containing key:value pairs',
    nullable: true,
  })
  mortgage_guide: string;

  @Column({ type: 'tinyint', width: 1, comment: '0: pending 1: Inactive 2:active 3:Cancelled' })
  status: number;

  @Column({ type: 'tinyint', width: 1, comment: '0: disable 1: enabled ', default: 1 })
  enable_disable_status: number;

  @Column({ type: 'tinyint', width: 1, comment: '0: off 1: on', default: 0})
  isDM: number;

  @OneToOne(
    () => Branded_App_Users,
    Branded_App_Users => Branded_App_Users.id,
    {
      nullable: true,
    },
  )
  @JoinColumn({ name: 'has_branded_app' })
  has_branded_app: Branded_App_Users;

  @Column({ type: 'text', comment: 'JSON string ', nullable: true })
  profile_bio_settings: string;

  @Column({ type: 'text', comment: 'JSON string ', nullable: true })
  profile_contact_settings: string;

  @Column({ type: 'text', comment: 'JSON string ', nullable: true })
  profile_link_settings: string;

  @Column({ type: 'text', comment: 'JSON string ', nullable: true })
  app_color_scheme_settings: string;

  @Column({ type: 'text', comment: 'JSON string ', nullable: true })
  notification_settings: string;

  @Column({ type: 'text', comment: 'JSON string ', nullable: true })
  report_settings: string;

  @Column({ type: 'text' })
  link: string;

  // custom web link for Qr code deep link
  @Column({ type: 'text', default: null })
  web_link: string;

  @Column({ type: 'text', nullable: true })
  stripe_customer_id: string;

  @Column({
    comment:
      'name of the qr code. Whatever size is selected by officer, we generate a new QR code from the link everytime to save space and DB fields',
    nullable: true,
    type: 'longtext',
  })
  qr_code: string;

  @Column({
    type: 'text',
    comment: `JSON string. Every new signature will be stored as an object with values containing:
      1. signature text
      2. signature type (0: text 1: image)`,
  })
  email_signatures: string;

  @Column({
    type: 'longtext',
    comment: `JSON string. Object of key value pair containing:
  1. from_email
  2. from_name
  3. subject
  4. email_body`,
  })
  auto_responders_settings: string;

  @Column({
    type: 'text',
    comment: 'JSON string. Object of key value pair',
    nullable: true,
  })
  social_links: string;

  @Column({
    type: 'text',
    comment: 'This will be json string containing key:value pairs',
    nullable: true,
  })
  profile_links: string;

  @Column({ nullable: true })
  logo: string;

  @Column({
    comment: '1: Partner Only 2: Dual-Partner+Me 3:Dual-Me+Partner',
    nullable: true,
  })
  dual_link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;
}
