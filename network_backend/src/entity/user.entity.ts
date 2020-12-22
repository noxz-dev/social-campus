import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { UserValidator } from '../validators/user.validator';
import { Base } from './base';
import { Post } from './post.entity';
import { Role } from './role.entity';

@Entity()
@ObjectType()
export class User extends Base {
  @Field(() => String)
  @Column()
  firstname: string;

  @Field(() => String)
  @Column()
  lastname: string;

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable()
  roles: Role[];

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  constructor(body: UserValidator, hashedPassword: string) {
    super();
    this.firstname = body?.firstName;
    this.lastname = body?.lastname;
    this.email = body?.email;
    this.password = hashedPassword;
  }
}
