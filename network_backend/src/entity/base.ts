import { Field, ObjectType } from 'type-graphql';
import { Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export abstract class Base {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({ name: 'updated_at', precision: 3 })
  readonly updatedAt: Date = new Date();

  @Field(() => Date)
  @Column({ type: 'timestamp' })
  createdAt: Date = new Date();
}
