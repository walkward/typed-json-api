import { Deserializer } from 'jsonapi-serializer';
import { defaultsDeep } from 'lodash';
import { plural } from 'pluralize';
import { EntityTypes, IDeserializeOptions } from '../../types';
import { AppError } from '../errors';

export async function deserialize(type: EntityTypes, data: any, options?: any) {
  try {
    const valueForRelationship = ({id}: any) => ({id});

    const defaults: IDeserializeOptions = {
      keyForAttribute: 'camelCase',
    };

    // Create relationship values if they exist
    if (data.data.relationships) {
      Object.keys(data.data.relationships).forEach((relationship: string) => {
        defaults[plural(relationship)] = { valueForRelationship };
      });
    }

    const result = await new Deserializer(defaultsDeep(options, defaults)).deserialize(data);
    return result;
  } catch (error) {
    throw new AppError(error.message, false, error);
  }
}
