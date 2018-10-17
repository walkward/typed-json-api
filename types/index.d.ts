import * as Hapi from 'hapi';
import { RequestQuery } from '../src/helpers/requests'

/* ============= Requests ============= */

export interface ICredentials extends Hapi.AuthCredentials {
  id: string;
}

export interface IRequestAuth extends Hapi.RequestAuth {
  credentials: ICredentials;
}

export interface IRequest extends Hapi.Request {
  auth: IRequestAuth;
}

export interface ILoginRequest extends IRequest {
  payload: {
    email: string;
    password: string;
  };
}

/* ============= Configs ============= */

export interface IServerConfigurations {
  port: number;
  plugins: string[];
  jwtSecret: string;
  jwtExpiration: string;
  routePrefix: string;
}

/* ============= Plugins ============= */

export interface IPluginOptions {
  serverConfigs: IServerConfigurations;
}

export interface IPlugin {
  register(server: Hapi.Server, options?: IPluginOptions): Promise<void>;
  info(): IPluginInfo;
}

export interface IPluginInfo {
  name: string;
  version: string;
}

/* ============= Plain JSON:API ============= */

export interface IResource {
  type: string;
  id: string;
  attributes?: IAttributes;
  relationships: IRelationships;
}

export interface IAttributes {
  [value: string]: any;
}

export interface IRelationship {
  data: ICollection | IResource | IDataResource | {};
}

export interface IRelationships {
  [value: string]: IRelationship;
}

export interface ICollection extends Array<IResource> {
  data: IDataResource[];
  page: IPage;
}

export interface IPage {
  number: number;
  limit?: number;
  total_resources?: number;
  resources_per_page?: number;
}

export interface IDataResource {
  type: string;
  id: string;
  attributes?: IAttributes;
  relationships?: object;
  links?: ILinks;
  meta?: object;
}

export interface ILinks {
  self?: string;
  related?: {
    href: string;
    meta: object;
  };
}

/* ============= JSON:API Serializer ============= */

export type SerializeCaseType = 'dash-case' | 'lisp-case' | 'spinal-case' | 'kebab-case' | 'underscore_case' | 'snake_case' | 'camelCase' | 'CamelCase';

export declare type SerializeLinkFunction = (links: any, current?: any, parent?: any) => string;

export declare type SerializeKeyForAttributeFunction = (attribute: string) => string | SerializeCaseType

export interface ISerializeLinks {
  [key: string]: string | SerializeLinkFunction
}

export declare type ISerializeRelationshipMetaFunction = (record: any) => string;

export interface ISerializeRelationshipMeta {
  [key: string]: number | ISerializeRelationshipMetaFunction
}

export interface ISerializeOptions {
  [index: string]: any,
  id?: string,
  attributes: string[],
  topLevelLinks?: ISerializeLinks,
  keyForAttribute?: SerializeCaseType | SerializeKeyForAttributeFunction,
  ref?: string | boolean | Function,
  typeForAttribute?: (attribute: any, user: any) => any,
  nullIfMissing?: boolean,
  pluralizeType?: boolean,
  ignoreRelationshipData?: boolean,
  relationshipLinks?: ISerializeLinks,
  relationshipMeta?: ISerializeRelationshipMeta,
  dataLinks?: ISerializeLinks,
  included?: boolean,
  includedLinks?: ISerializeLinks,
  embed?: boolean,
  meta?: any
}

export interface IDeserializeOptions {
  [index: string]: any,
  keyForAttribute?: SerializeCaseType | SerializeKeyForAttributeFunction,
}

/* ============= OUR JSON:API ============= */

export type EntityTypes = 'users' | 'groups' | 'projects' | 'customers' | 'folders' | 'assets' | 'collections';
// export enum EntityTypesEnum {
//   users = 'users',
//   groups = 'groups',
//   projects = 'projects',
//   customers = 'customers',
//   folders = 'folders',
//   assets = 'assets',
//   collections = 'collections',
// }
