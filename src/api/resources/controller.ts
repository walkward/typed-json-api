import * as Boom from 'boom';
import * as Hapi from 'hapi';
import { singular } from 'pluralize';
import { getConnection, getRepository } from 'typeorm';

import { EntityTypes } from '../../../types';
import { serialize } from '../../../utils/json';
import entities from '../../entity';

export default class Controller {

  public async create(request: any, h: Hapi.ResponseToolkit) {
    try {
      const type: EntityTypes = request.params.type;
      const singleType: string = singular(type);
      const payload: any = request.payload;

      const { raw: [raw] } = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(entities[singleType])
        .values(payload)
        .execute();

      const data = serialize(type, raw, { attributes: request.query.fields });
      return h.response(data).code(201);
    } catch (error) {
      return Boom.boomify(error);
    }
  }

  public async update(request: any, h: Hapi.ResponseToolkit) {
    try {
      const type: EntityTypes = request.params.type;
      const id: string = request.params.id;
      const singleType: string = singular(type);
      const payload: any = request.payload;

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

  public async delete(request: any, h: Hapi.ResponseToolkit) {
    try {
      const type: EntityTypes = request.params.type;
      const id: string = request.params.id;
      const singleType: string = singular(type);

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

  public async get(request: any, h: Hapi.ResponseToolkit) {
    try {
      const type: EntityTypes = request.params.type;
      const id: string = request.params.id;
      const singleType: string = singular(type);

      const resource = await getConnection()
        .createQueryBuilder()
        .select(singleType)
        .from(entities[singleType], singleType)
        .where(`${singleType}.id = :id`, { id })
        .getOne();

      const data = serialize(type, resource, { attributes: request.query.fields });
      return h.response(data).code(200);
    } catch (error) {
      return Boom.boomify(error);
    }
  }

  public async gets(request: any, h: Hapi.ResponseToolkit) {
    try {
      const type: EntityTypes = request.params.type;
      const query: any = request.query;
      const offset: number = query.page.offset;
      const limit: number = query.page.limit;
      const singleType: string = singular(type);

      const resources = await getRepository(entities[singleType])
        .createQueryBuilder(singleType)
        .select(`${singleType}.id`)
        .skip(offset)
        .take(limit)
        .getMany();

      const data = serialize(type, resources, { attributes: request.query.fields });
      return h.response(data).code(200);
    } catch (error) {
      return Boom.boomify(error);
    }
  }
}
