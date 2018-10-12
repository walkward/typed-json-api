import * as Boom from 'boom';
import * as Hapi from 'hapi';
import { Serializer } from 'jsonapi-serializer';
import { getConnection } from 'typeorm';

import { User } from '../../entity/User';
import { IRequest, IResource } from '../../types';

export default class UserController {

  public async createUser(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const { payload }: any = request;
      const { raw: [raw] } = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(payload)
        .execute();

      return h.response(this.serialize(raw)).code(201);
    } catch (error) {
      return Boom.boomify(error);
    }
  }

  public async updateUser(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const { id } = request.params;
      const { payload }: any = request;
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set(payload)
        .where('id = :id', { id })
        .execute();

      return h.response().code(200);
    } catch (error) {
      return Boom.boomify(error);
    }
  }

  public async deleteUser(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const { id } = request.params;
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('id = :id', { id })
        .execute();

      return h.response().code(200);
    } catch (error) {
      return Boom.boomify(error);
    }
  }

  public async getUser(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const { id } = request.params;
      const user = await getConnection()
        .createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .where('user.id = :id', { id })
        .getOne();

      return h.response(this.serialize(user)).code(200);
    } catch (error) {
      return Boom.boomify(error);
    }
  }

  private serialize(data: any = {}): IResource {
    const attributes = Object.keys(data);
    const serializer = new Serializer('users', { attributes });
    return serializer.serialize(data);
  }
}
