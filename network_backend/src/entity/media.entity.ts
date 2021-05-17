import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import { Base } from './base';

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  FILE = 'FILE',
}

registerEnumType(MediaType, {
  name: 'MediaType',
});

@Entity()
@ObjectType()
export class Media extends Base {
  @Field(() => MediaType)
  @Column({ type: 'enum', enum: MediaType })
  type: MediaType;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  blurhash: string;
}
