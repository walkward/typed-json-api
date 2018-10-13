import * as Boom from 'boom';
import { validate, ValidationError } from 'class-validator';
import { Deserializer } from 'jsonapi-serializer';
import { singular } from 'pluralize';

import entities from '../../entity';
import RequestQuery from '../../models/RequestQuery';

const deserializer = new Deserializer();

const combineValidationMessages = (errors: ValidationError[]): string => {
  return errors.reduce((prev: string, curr: any) => {
    return prev += `${Object.values(curr.constraints).join('. ')}. `;
  }, '');
};

export async function validateResource(value: any) {
  try {
    let resource = new entities[singular(value.data.type)]();
    resource = await deserializer.deserialize(value);

    const errors = await validate(resource);

    if (errors.length > 0) {
      throw Boom.badData(combineValidationMessages(errors), errors);
    } else {
      return resource;
    }
  } catch (error) {
    throw Boom.boomify(error);
  }
}

export async function validateQuery(params: any): Promise<RequestQuery> {
  try {
    return new RequestQuery(params);
  } catch (error) {
    throw Boom.boomify(error);
  }
}
