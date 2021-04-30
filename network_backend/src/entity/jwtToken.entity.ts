import { Column, Entity } from 'typeorm';
import { Base } from './base';

@Entity()
export class JwtToken extends Base {
  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  token!: string;

  constructor(token: string, userId: string) {
    super();
    this.token = token;
    this.userId = userId;
  }
}
