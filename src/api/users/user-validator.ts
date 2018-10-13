import * as Boom from 'boom';
import { validate, ValidationError } from 'class-validator';
import { Deserializer } from 'jsonapi-serializer';

import { User } from '../../entity/User';
import RequestQuery from '../../models/RequestQuery';
import { IResource } from '../../types';

const deserializer = new Deserializer();

const combineValidationMessages = (errors: ValidationError[]): string => {
  return errors.reduce((prev: string, curr: any) => {
    return prev += `${Object.values(curr.constraints).join('. ')}. `;
  }, '');
};

export async function validateUser(value: IResource) {
  try {
    let user = new User();
    user = await deserializer.deserialize(value);

    const errors = await validate(user);

    if (errors.length > 0) {
      throw Boom.badData(combineValidationMessages(errors), errors);
    } else {
      return user;
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
