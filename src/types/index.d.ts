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
