import * as Boom from 'boom';
import { validate, ValidationError } from 'class-validator';
import { Deserializer } from 'jsonapi-serializer';

import { User } from '../../entity/User';
import { IResource } from '../../types';

const deserializer = new Deserializer();

const combineValidationMessages = (errors: ValidationError[]): string => {
  return errors.reduce((prev: string, curr: any) => {
    return prev += `${Object.values(curr.constraints).join('. ')}. `;
  }, '');
};

export async function createUser(value: IResource) {
  try {
    const data = await deserializer.deserialize(value);

    const user: any  = new User();
    Object.entries(data).forEach(([key, val]: any ) => {
      user[key] = val;
    });

    return validate(user).then((errors) => {
      if (errors.length > 0) {
        throw Boom.badData(combineValidationMessages(errors), errors);
      } else {
        return user;
      }
    });
  } catch (error) {
    throw Boom.boomify(error);
  }
}
