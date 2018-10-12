import * as Hapi from "hapi";
import * as Boom from 'boom'
import { getConnection } from "typeorm";
import { Serializer } from 'jsonapi-serializer';

import { IRequest, IResource } from "../../types";
import { User } from "../../entity/User";

export default class UserController {
  private serialize(data: any = {}): IResource {
    const attributes = Object.keys(data);
    const serializer = new Serializer('users', { attributes })
    return serializer.serialize(data)
  }

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
      return Boom.boomify(error)
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
        .where("id = :id", { id })
        .execute();

      return h.response().code(200);
    } catch (error) {
      return Boom.boomify(error)
    }
  }

  public async deleteUser(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const { id } = request.params;
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id })
        .execute();

      return h.response().code(200);
    } catch (error) {
      return Boom.boomify(error)
    }
  }

  public async getUser(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const { id } = request.params;
      const user = await getConnection()
        .createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.id = :id", { id })
        .getOne();
      console.log(request)
      return h.response(this.serialize(user)).code(200);
    } catch(error) {
      return Boom.boomify(error)
    }
  }
}
