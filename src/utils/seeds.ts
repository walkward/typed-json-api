/**
 * Seeds: A class for generating seed data
 * ------------------------------------
 * This class extends the chance.js library using "mixins"
 * See [github repo](chance.js library](https://github.com/chancejs/chancejs) for information
 * on all the available methods
 *
 * Calling any of the "resource generator methods" will return the requested resource in addition to
 * adding that resource to its associated array (e.g. this.customers)
 *
 * Calling seed.init() will generate an entire tree of resources starting from the customer down.
 * Afterwards you can access seeds[<resource type>] to access each object. You will likely want to
 * call init once before seeding a database, but calling seed.init() multiple times will do no harm.
 *
 * @example
 * const seeds = new Seeds();           // Instantiate a Seeds instance
 * seeds.asset()                        // Returns an asset object
 * seeds.folder({ assets })             // Returns a folder object that hasMany assets
 *
 * const seeds = new Seeds(Date.now())  // Seeding with the current timestamp guarantees uniqueness
 *
 * @namespace seeds
 */

import * as Chance from 'chance';
import { transformAndValidate } from 'class-transformer-validator';
import { defaults, omit, pick } from 'lodash';

import * as entities from 'app/entity';

interface IOptions {
  customerCount: number;
  maxFolderDepth: number;
  maxAssets: number;
  maxProjects: number;
  maxFolders: number;
  maxCollections: number;
  quiet: boolean;
}

interface IRecords {
  [index: string]: any[];
  customers: entities.Customer[];
  projects: entities.Project[];
  users: entities.User[];
  groups: entities.Group[];
  folders: entities.Folder[];
  collections: entities.Collection[];
  assets: entities.Asset[];
}

interface IData {
  names: string[];
  companyNames: string[];
  buzzWords: string[];
  titleWords: string[];
}

export default class Seeds extends Chance {
  private options: IOptions;
  private records: IRecords;
  private data: IData;
  private initialized: boolean;

  constructor(instance: number, options?: IOptions) {
    super(instance);

    this.options = Object.assign({
      customerCount: 2,
      maxFolderDepth: 6,
      maxAssets: 30,
      maxProjects: 10,
      maxFolders: 10,
      maxCollections: 10,
      quiet: true,
    }, options);

    this.records = {
      customers: [],
      projects: [],
      users: [],
      groups: [],
      folders: [],
      collections: [],
      assets: [],
    };

    /* tslint:disable */

    this.data = {
      names: ['justin', 'walker'],
      companyNames: ['Zoonder', 'Voolith', 'Gabcube', 'Rooxo', 'Einti', 'Zava', 'Fivespan', 'Dablist', 'Twitterbridge', 'Jaxworks', 'Zooxo', 'Aimbo', 'Shuffletag', 'Brightbean', 'Yombu', 'Leenti', 'Trunyx', 'Zoonoodle', 'Aimbo', 'Zoomdog', 'Dynazzy', 'Meedoo', 'Fadeo', 'Blogtag', 'Vipe', 'Mydo', 'Bluejam', 'Jaloo', 'Oba', 'Skilith', 'Skiptube', 'Devbug', 'Centimia', 'Twitternation', 'Edgeclub', 'Photospace', 'Rhyzio', 'Kazio', 'Avamba', 'Avamba', 'Avavee', 'Linkbridge', 'Camido', 'Jayo', 'Kazu', 'Realpoint', 'Jabbersphere', 'Zoomlounge', 'Shuffletag', 'Omba'],
      buzzWords: ['actuating', 'synergy', 'Streamlined', 'success', 'alliance', 'Proactive', 'leverage', 'analyzing', 'static', 'Proactive', 'bifurcated', 'Front-line', '3rd generation', 'optimizing', 'synergy', 'throughput', 'core', 'Cloned', 'Quality-focused', 'database', 'Innovative', 'approach', 'Devolved', 'full-range', 'disintermediate', 'support', 'interface', 'Business-focused', 'protocol', 'local', 'high-level', 'cohesive', 'analyzer', 'User-centric', 'protocol', 'concept', 'Enterprise-wide', 'leading edge', 'cohesive', 'systemic', '5th generation', 'web-enabled', 'multi-tasking', 'open system', 'hybrid', 'approach', 'leverage', 'foreground', 'Front-line', 'Inverse', 'approach', 'Enterprise-wide', 'multi-state', 'flexibility', 'Optimized', 'Cloned', 'object-oriented', 'Fully-configurable', 'Face to face', 'uniform', 'national', 'object-oriented', 'Automated', 'solution', 'secured line'],
      titleWords: ['tresom', 'bytecard', 'stim', 'it', 'fintone', 'biodex', 'andalax', 'fixflex', 'cardify', 'sonair', 'tres-zap', 'cardguard', 'konklab', 'regrant', 'wrapsafe', 'treeflex', 'bitchip', 'solarbreeze', 'duobam', 'voltsillam', 'voltsillam', 'sub-ex', 'temp', 'zoolab', 'quo lux', 'sonair', 'ventosanzap', 'treeflex', 'fix san', 'hatity', 'holdlamis', 'sub-ex', 'flowdesk', 'zaam-dox', 'stronghold', 'hatity', 'solarbreeze', 'redhold', 'toughjoyfax', 'lotstring', 'gembucket', 'it', 'fix san', 'cardguard', 'hatity', 'y-find', 'alphazap', 'ronstring', 'alphazap', 'opela', 'zoolab', 'mat lam tam', 'veribet', 'solarbreeze', 'opela', 'ventosanzap', 'zoolab', 'cardguard', 'opela', 'y-solowarm', 'aerified', 'regrant', 'fintone', 'otcom', 'wrapsafe', 'zathin'],
    };

    /* tslint:enable */
  }

  /* ======= Begin Helper Methods ======= */

  public generate(count: number, method: (opts?: any) => any, opts?: any): any[] {
    return Array(count).fill(null).map(() => method(opts));
  }

  public companyName(): string {
    return this.pickone(this.data.companyNames);
  }

  public titleWord(): string {
    return this.pickone(this.data.titleWords);
  }

  public buzzWord(): string {
    return this.pickone(this.data.buzzWords);
  }

  public created(): string {
    const date = this.date({ year: 2017, string: false });
    if (typeof date === 'string') {
      return date.replace(/.{5}$/, 'Z');
    } else {
      return date.toJSON().replace(/.{5}$/, 'Z');
    }
  }

  public modified(): string {
    const date = this.date({ year: 2018, string: false });
    if (typeof date === 'string') {
      return date.replace(/.{5}$/, 'Z');
    } else {
      return date.toJSON().replace(/.{5}$/, 'Z');
    }
  }

  public randomCount(min: number = 1, max: number = 10): number {
    return this.integer({ min, max });
  }

  public useOnce(array: any[], defaultValue: any): any {
    if (array.length === 0) return defaultValue;
    const index = this.randomCount(0, array.length - 1);
    const value = array[index];
    array.splice(index, 1);
    return value;
  }

  public smallCount(max = 6): number {
    const values = Array.from(Array(max + 1).keys());
    const weight = Array.from(Array(max + 1).keys()).reverse().map((value) => value * value);
    return this.weighted(values, weight);
  }

      // NOTE: Not currently used anywhere, but will be useful in the future...
  public largeCount(max = 6): number {
    const values = Array.from(Array(max + 1).keys());
    const weight = Array.from(Array(max + 1).keys()).map((value) => value * value);
    return this.weighted(values, weight);
  }

  public title(): string {
    return this.pickone([
      `${this.titleWord()}`,
      `${this.capitalize(this.buzzWord())} ${this.titleWord()}`,
      `${this.capitalize(this.buzzWord())} ${this.capitalize(this.companyName())}`,
      `${this.capitalize(this.buzzWord())} ${this.capitalize(this.buzzWord())} ${this.titleWord()}`,
      `${this.capitalize(this.buzzWord())} ${this.word({ length: this.randomCount(4, 12) })}`,
      `${this.capitalize(this.buzzWord())} ${this.word({ length: 12 })} ${this.word({ length: 8 })}`,
    ]);
  }

  public addRecord(item: any, type: string): any {
    this.records[type].push(item);
    return item;
  }

  public serialize(recordType: string): any[] {
    const records = this.records[recordType];
    const hasManys = ['rootFolder', ...Object.keys(this.records)];
    const belongsTo = Object.keys(this.records).map((o) => o.replace(/[s]$/, ''));

    return records.map((record) => {
      record = omit(record, belongsTo);
      return hasManys.reduce((prev, hasMany) => {
        if (typeof prev[hasMany] !== 'undefined') {
          if (prev[hasMany].id) prev[hasMany] = pick(prev[hasMany], ['id', 'type']);
          else prev[hasMany] = prev[hasMany].map((o: any[]) => pick(o, ['id', 'type']));
        }
        return prev;
      }, record);
    });
  }

  /* ======= End Helper Methods ======= */

  /* ======= Begin Resource Generator Methods ======= */

  public asset(overrides: any = {}): entities.Asset {
    const asset = Object.assign({
      id: this.guid(),
      name: `XDAM_${this.pad(this.records.assets.length + 1, 5)}.jpg`,
      created: this.created(),
      modified: this.modified(),
      fileType: 'jpg',
      location: 's3.amazonaws.com/xdam-clique-qa-assets',
      folder: null,
    }, overrides);

    return this.addRecord(asset, 'assets');
  }

  public collection(overrides: any = {}): entities.Collection {
    const collection = Object.assign({
      id: this.guid(),
      name: this.title(),
      created: this.created(),
      modified: this.modified(),
      assets: [],
      user: null,
    }, overrides);

    return this.addRecord(collection, 'collections');
  }

  public folder(overrides: any = {}): entities.Folder {
    const folder = Object.assign({
      id: this.guid(),
      name: this.title(),
      created: this.created(),
      modified: this.modified(),
      folders: [],
      collections: [],
      assets: [],
      folder: null,
    }, overrides);

    return this.addRecord(folder, 'folders');
  }

  public project(overrides: any = {}): entities.Project {
    const project = Object.assign({
      id: this.guid(),
      name: this.title(),
      created: this.created(),
      modified: this.modified(),
      rootFolder: overrides.rootFolder || this.folder(),
      customer: null,
    }, overrides);

    Object.defineProperties(project, {
      assets: {
        enumerable: false,
        get() {
          // Recursively finding all assets within the folder tree
          const assets: entities.Asset[] = [];
          const nested = (obj: any) => {
            if (typeof obj.assets !== 'undefined') assets.push(...obj.assets);
            if (typeof obj.folders !== 'undefined' && obj.folders.length > 0) obj.folders.forEach(nested);
          };
          nested(this.rootFolder);
          return assets;
        },
      },
    });

    return this.addRecord(project, 'projects');
  }

  public user(overrides: any = {}): entities.User {
    const firstname = this.useOnce(this.data.names, this.first({ nationality: 'en' }));
    const lastname = this.last({ nationality: 'en' });

    const user = Object.assign({
      id: this.guid(),
      created: this.created(),
      modified: this.modified(),
      email: `${firstname}_${lastname}@email.com`.toLowerCase(),
      login: `${firstname}`.toLowerCase(),
      password: 'test',
      firstname,
      lastname,
      collections: [],
      groups: [],
      customer: null,
    }, overrides);

    return this.addRecord(user, 'users');
  }

  public async group(overrides: any = {}): Promise<entities.Group> {
    try {
      const resource: entities.Group = defaults(overrides, {
        id: this.guid(),
        name: this.title(),
        created: this.created(),
        modified: this.modified(),
        collections: [],
        users: [],
        customer: null,
      });
      const validated: entities.Group = await transformAndValidate(entities.Group, resource);
      return validated;
    } catch (error) {
      throw error;
    }
  }

  public customer(overrides: any = {}): entities.Customer {
    const customer = Object.assign({
      id: this.guid(),
      name: this.title(),
      created: this.created(),
      modified: this.modified(),
      groups: [],
      projects: [],
      users: [],
    }, overrides);

    Object.defineProperties(customer, {
      assets: {
        enumerable: false,
        get() {
          return this.projects.reduce((total: entities.Asset[], project: any) => {
            return [...total, ...project.assets];
          }, []);
        },
      },
    });

    return this.addRecord(customer, 'customers');
  }

  /* ======= End Resource Generator Methods ======= */

  /* ======= Begin Seed Generation Lifecycle Methods  ======= */

  public init(): void {
    if (!this.initialized) {
      this.initialized = true;

      const customers = this.generate(this.options.customerCount, this.customer);

      customers.forEach((customer) => {
        const projects = this.generate(this.randomCount(), this.project, { customer });
        customer.projects.push(...projects);

        projects.forEach((project) => {
          const { rootFolder } = project;

          const assets = this.generate(this.randomCount(), this.asset, {
            folder: rootFolder,
          });
          rootFolder.assets.push(...assets);

          const collections = this.generate(this.randomCount(), this.collection, {
            assets: this.pickset(assets, this.randomCount()),
            folder: rootFolder,
          });
          rootFolder.collections.push(...collections);

          const folders = this.generate(this.randomCount(), this.folder, {
            folder: rootFolder,
          });
          rootFolder.folders.push(...folders);
        });

        const users = this.generate(this.randomCount(), this.user, { customer });
        const groups = this.generate(this.randomCount(), this.group, { customer });

        users.forEach((user) => {
          const collections = this.generate(this.randomCount(), this.collection, {
            assets: customer.assets,
            user,
          });
          user.collections.push(...collections);
          user.groups.push(...this.pickset(groups, this.randomCount()));
        });
        customer.users.push(...users);

        groups.forEach((group) => {
          const collections = this.generate(this.randomCount(), this.collection, {
            assets: this.pickset(customer.assets, this.randomCount()),
            customer,
          });
          group.collections.push(...collections);
          group.users.push(...customer.users.filter((user: any) => {
            return user.groups.some((g: any) => g.id === group.id);
          }));
        });
        customer.groups.push(...groups);
      });
    }
  }

  /* ======= End Seed Generation Lifecycle Methods  ======= */
}
