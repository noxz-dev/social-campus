/* eslint-disable @typescript-eslint/no-unused-vars */
import { Authorized, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Tag } from '../entity/tag.entity';

@Resolver(() => Tag)
export class TagResolver {
  /**
   * Get all existing Tags
   */
  @Authorized()
  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    return getRepository(Tag).find({
      order: {
        name: 'ASC',
      },
    });
  }
}
