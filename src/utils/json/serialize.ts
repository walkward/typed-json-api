import { Serializer } from 'jsonapi-serializer';
import { defaultsDeep } from 'lodash';
import { EntityTypes, IDataResource, IResource, ISerializeOptions } from '../../types';
import { AppError } from '../errors';

const BASE_PATH = '/api';

export function serialize(type: EntityTypes, data: any, options: ISerializeOptions) {
  try {
    const defaults: ISerializeOptions = {
      id: 'id',
      keyForAttribute: 'camelCase',
      attributes: ['type', 'id'],
      meta: {},
      topLevelLinks: {
        self: (links: IDataResource, current: IResource, parent: IResource) => `${BASE_PATH}/${type}`,
        next: (links: IDataResource, current: IResource, parent: IResource) => `TODO`,
        last: (links: IDataResource, current: IResource, parent: IResource) => `TODO`,
      },
      dataLinks: {
        self: (dataSet: IDataResource, resource: IResource) => `${BASE_PATH}/${type}/${resource.id}`,
      },
    };

    return new Serializer(type, defaultsDeep(options, defaults)).serialize(data);
  } catch (error) {
    throw new AppError(error.message, false, error);
  }
}
