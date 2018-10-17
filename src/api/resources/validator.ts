import * as Boom from 'boom';
// import { transformAndValidate } from 'class-transformer-validator';
import { ValidationError } from 'class-validator';
// import { singular } from 'pluralize';

// import entities from '../../entity';
import { EntityTypes } from '../../../types';
import { deserialize } from '../../../utils/json';
import RequestQuery from '../../models/RequestQuery';

const combineValidationMessages = (errors: ValidationError[]): string => {
  return errors.reduce((prev: string, curr: any) => {
    return prev += `${Object.values(curr.constraints).join('. ')}. `;
  }, '');
};

export async function validateResource(value: any) {
  try {
    const type: EntityTypes = value.data.type;
    const resource = await deserialize(type, value);

    // TODO: Implement some validation here
    // const Entity = entities[singular(type)];
    // resource = await transformAndValidate(Entity, resource);

    return resource;
  } catch (error) {
    if (error.length) {
      throw Boom.badData(combineValidationMessages(error), error);
    } else {
      throw Boom.boomify(error);
    }
  }
}

export async function validateQuery(params: any): Promise<RequestQuery> {
  try {
    return new RequestQuery(params);
  } catch (error) {
    throw Boom.boomify(error);
  }
}
