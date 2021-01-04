import { Field, ObjectType } from 'type-graphql';
import { Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
export abstract class Base {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({ name: 'updated_at', precision: 3 })
  readonly updatedAt: Date = new Date();

  @Field()
  @Column()
  readonly createdAt: Date = new Date();
}
