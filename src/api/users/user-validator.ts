import * as Boom from 'boom'
import { Deserializer } from 'jsonapi-serializer';
import { validate, ValidationError } from 'class-validator'

import { User } from "../../entity/User";
import { IResource } from "../../types";

const deserializer = new Deserializer()

const combineValidationMessages = (errors: ValidationError[]): string => {
  return errors.reduce((prev: string, curr: any) => {
    return prev += `${Object.values(curr.constraints).join('. ')}. `
  }, '');
}

export async function createUser(value: IResource) {
  try {
    let data = await deserializer.deserialize(value)

    let user: any  = new User();
    Object.entries(data).forEach(([key, value]: any ) => {
      user[key] = value;
    })

    return validate(user).then(errors => {
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
