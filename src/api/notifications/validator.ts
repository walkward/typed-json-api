import * as Boom from 'boom';
import { transformAndValidate } from 'class-transformer-validator';
import { ValidationError } from 'class-validator';

import { Notification } from 'app/entity/Notification';

const combineValidationMessages = (errors: ValidationError[]): string => {
  return errors.reduce((prev: string, curr: any) => {
    return prev += `${Object.values(curr.constraints).join('. ')}. `;
  }, '');
};

export async function validatePayload(value: any) {
  try {
    const payload = await transformAndValidate(Notification, value);
    return payload;
  } catch (error) {
    if (error.length) {
      throw Boom.badData(combineValidationMessages(error), error);
    } else {
      throw Boom.boomify(error);
    }
  }
}
