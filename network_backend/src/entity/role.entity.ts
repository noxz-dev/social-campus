import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Base } from './base';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Role extends Base {
  @Field(() => String)
  @Column({ unique: true, type: 'varchar' })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: 'varchar' })
  description?: string;

  @Field(() => [User])
  @ManyToMany(() => User, (u) => u.roles)
  @JoinTable()
  users: User[];

  constructor(name, description?) {
    super();
    this.name = name;
    this.description = description;
  }
}
