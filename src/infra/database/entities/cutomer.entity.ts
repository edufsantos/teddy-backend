import { EntityBase } from '@common/entities/entity-base';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customers' })
export class Customer extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}
