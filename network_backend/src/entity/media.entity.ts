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

@ObjectType()
export class GroupMedia extends Media {
  @Field(() => String)
  createdByName: string;

  constructor(media: Media, userName: string) {
    super();
    this.id = media.id;
    this.name = media.name;
    this.type = media.type;
    this.blurhash = media.blurhash;
    this.createdByName = userName;
  }
}
