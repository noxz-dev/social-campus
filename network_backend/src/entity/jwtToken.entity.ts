import { Column, Entity } from 'typeorm';
import { Base } from './base';

@Entity()
export class JwtToken extends Base {
  @Column()
  userId: string;

  @Column()
  token!: string;

  constructor(token: string, userId: string) {
    super();
    this.token = token;
    this.userId = userId;
  }
}
