import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Unique,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/utils/constant';

@Entity()
@Unique(['email'])
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @ManyToOne(
    () => Users,
    Users => Users.id,
  )
  @JoinColumn({ name: 'parent_id' })
  parent_id: Users;

  @Column({
    type: 'tinyint',
    width: 2,
    comment: '1: Admin 2: Loan Officer 3: Borrower 4: Guest 5: Partners/co-branding officer 6: Employees',
  })
  role: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({ nullable: true, default: 1 })
  contact_code: number;

  @Column({
    type: 'bigint',
    nullable: true,
    width: 15,
  })
  contact_number: number;

  @Column()
  password: string;

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: true })
  company_name: string;

  @Column({ type: 'tinyint', width: 1, nullable: true })
  want_branded_app: number;

  @Column({ nullable: true })
  verification_code: number;

  @Column({ nullable: true, default: 0 })
  referred_to: number;

  @Column({ nullable: true, default: 0 })
  referred_to_and_installed: number;

  @Column({ default: false })
  is_reset: boolean;

  @Column({ nullable: true })
  code_created_at: Date;

  @Column({ nullable: true })
  remember_me: string;

  @Column({ nullable: true })
  lo_selection: Date;

  @Column({
    type: 'text',
    comment: 'This will be json string containing key:value pairs',
    nullable: true,
  })
  app_menu_details: string;

  @Column({ nullable: true })
  verified_at: Date;

  @Column({ nullable: true })
  forgot_password_code: number;

  @Column({ nullable: true })
  co_branded_notify: boolean;

  @Column({ nullable: true })
  profile_photo: string;

  @Column({ nullable: true })
  firebase_user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @Column({ nullable: true, default: null })
  last_switched_LO: number;

  @Column({
    nullable: true,
    default: null,
    comment: 'If the borrower signup from brandapp, the user is associated to that particular application',
  })
  signed_brand_id: number;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  async getAdminUserDetails(): Promise<Users> {
    return await Users.findOne({
      role: UserRole.ADMIN,
    });
  }
}
