import * as Hapi from 'hapi';

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

/* ============= JSON:API ============= */

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
  data: Array<IDataResource>;
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
