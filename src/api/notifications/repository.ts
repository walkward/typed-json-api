import * as Boom from 'boom';
import * as Hapi from 'hapi';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Notification } from 'app/entity/Notification';

@Service()
export default class NotificationRepository {
  @InjectRepository(Notification)
  private repository: Repository<Notification>;

  // constructor(@InjectRepository(Notification) private repository: Repository<Notification>) {
  // }

  public async create(request: any, h: Hapi.ResponseToolkit) {
    try {
      const result = await this.repository.insert(request.payload);
      return h.response(result).code(201);
    } catch (error) {
      return Boom.boomify(error);
    }
  }
}
