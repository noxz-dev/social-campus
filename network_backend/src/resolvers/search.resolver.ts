/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { getRepository, ILike } from 'typeorm';
import { Group } from '../entity/group.entity';
import { Tag } from '../entity/tag.entity';
import { User } from '../entity/user.entity';
import { Search } from '../graphql_types/search';

@Resolver(() => Search)
export class SearchResolver {
  /**
   * Search to find information like tags, users and group
   */
  @Authorized()
  @Query(() => Search)
  async search(@Arg('searchString', () => String) searchString: string): Promise<Search> {
    const users = await getRepository(User).find({
      where: [{ firstname: ILike(`%${searchString}%`) }, { lastname: ILike(`%${searchString}%`) }],
      order: {
        firstname: 'ASC',
      },
    });

    const tags = await getRepository(Tag).find({
      where: { name: ILike(`%${searchString}%`) },
      order: {
        name: 'ASC',
      },
    });

    const groups = await getRepository(Group).find({
      where: { name: ILike(`%${searchString}%`) },
      order: {
        name: 'ASC',
      },
    });

    const searchResult: Search = { users, tags, groups };
    return searchResult;
  }
}
