import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  hashPassword: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  hashToken: string;

  @Column({ default: true })
  isActive: boolean;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
