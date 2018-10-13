import * as Boom from 'boom';
import * as Hapi from 'hapi';
import { Serializer } from 'jsonapi-serializer';
import { singular } from 'pluralize';
import { getConnection, getRepository } from 'typeorm';

import entities from '../../entity';
import { IRequest, IResource } from '../../types';

export default class Controller {

  public async create(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const { type } = request.params;
      const { payload }: any = request;
      const singleType = singular(type);

      const { raw: [raw] } = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(entities[singleType])
        .values(payload)
        .execute();

      return h.response(this.serialize(raw, type, request)).code(201);
    } catch (error) {
      return Boom.boomify(error);
    }
  }

  public async update(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const { type } = request.params;
      const { id } = request.params;
      const { payload }: any = request;
      const singleType = singular(type);

      await getConnection()
        .createQueryBuilder()
        .update(entities[singleType])
        .set(payload)
        .where('id = :id', { id })
        .execute();

      return h.response().code(200);
    } catch (error) {
      return Boom.boomify(error);
    }
  }

  public async delete(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const { type } = request.params;
      const { id } = request.params;
      const singleType = singular(type);

      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(entities[singleType])
        .where('id = :id', { id })
        .execute();

      return h.response().code(200);
    } catch (error) {
      return Boom.boomify(error);
    }
  }

  public async get(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const { type } = request.params;
      const { id } = request.params;
      const singleType = singular(type);

      const resource = await getConnection()
        .createQueryBuilder()
        .select(singleType)
        .from(entities[singleType], singleType)
        .where(`${singleType}.id = :id`, { id })
        .getOne();

      return h.response(this.serialize(resource, type, request)).code(200);
    } catch (error) {
      return Boom.boomify(error);
    }
  }

  public async gets(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      const { type } = request.params;
      const { query }: any = request;
      const { offset } = query.page;
      const { limit } = query.page;
      const singleType = singular(type);

      const resources = await getRepository(entities[singleType])
        .createQueryBuilder(singleType)
        .select(`${singleType}.id`)
        .skip(offset)
        .take(limit)
        .getMany();

      return h.response(this.serialize(resources, type, request)).code(200);
    } catch (error) {
      return Boom.boomify(error);
    }
  }

  private serialize(data: any, type: string, request: any): IResource {
    const { pathname } = request.url;
    const attributes = request.query.fields;

    const serializer = new Serializer(type, {
      attributes,
      topLevelLinks: {
        self: () => `${pathname}`,
      },
      dataLinks: {
        self: (dataSet: any, resource: any) => `//localhost:3000/api/${type}/${resource.id}`,
      },
    });

    return serializer.serialize(data);
  }
}
