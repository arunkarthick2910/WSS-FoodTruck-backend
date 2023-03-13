import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FoodTruck {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  truckName: string;

  @Column({ type: Date })
  @Transform((x: any) => new Date(x))
  date: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdTs: Date;

  @UpdateDateColumn()
  updatedTs: Date;
}
