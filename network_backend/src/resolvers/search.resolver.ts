/* eslint-disable @typescript-eslint/no-unused-vars */
import { Arg, Authorized, Query, Resolver } from 'type-graphql';
import { getRepository, ILike } from 'typeorm';
import { Group } from '../entity/group.entity';
import { Tag } from '../entity/tag.entity';
import { User } from '../entity/user.entity';
import { Search } from '../graphql_types/search';

@Resolver(() => Search)
export class SearchResolver {
  @Authorized()
  @Query(() => Search)
  async search(@Arg('searchString') searchString: string): Promise<Search> {
    const users = await getRepository(User).find({
      where: [{ firstname: ILike(`%${searchString}%`) }, { lastname: ILike(`%${searchString}%`) }],
    });

    const tags = await getRepository(Tag).find({
      where: { name: ILike(`%${searchString}%`) },
    });

    const groups = await getRepository(Group).find({
      where: { name: ILike(`%${searchString}%`) },
    });

    const searchResult: Search = { users, tags, groups };
    return searchResult;
  }
}
