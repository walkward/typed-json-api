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
import { omit, pick } from 'lodash';

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
  private records: IRecords;
  private data: IData;

  constructor(instance: number, options?: IOptions) {
    super(instance);

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
      names: ['justin', 'walker', 'clique'],
      companyNames: ['Zoonder', 'Voolith', 'Gabcube', 'Rooxo', 'Einti', 'Zava', 'Fivespan', 'Dablist', 'Twitterbridge', 'Jaxworks', 'Zooxo', 'Aimbo', 'Shuffletag', 'Brightbean', 'Yombu', 'Leenti', 'Trunyx', 'Zoonoodle', 'Aimbo', 'Zoomdog', 'Dynazzy', 'Meedoo', 'Fadeo', 'Blogtag', 'Vipe', 'Mydo', 'Bluejam'],
      buzzWords: ['actuating', 'synergy', 'Streamlined', 'success', 'alliance', 'Proactive', 'leverage', 'analyzing', 'static', 'Proactive', 'bifurcated', 'Front-line', '3rd generation', 'optimizing', 'synergy', 'throughput', 'core', 'Cloned', 'Quality-focused', 'database', 'Innovative', 'approach', 'Devolved'],
      titleWords: ['tresom', 'bytecard', 'stim', 'it', 'fintone', 'biodex', 'andalax', 'fixflex', 'cardify', 'sonair', 'tres-zap', 'cardguard', 'konklab', 'regrant', 'wrapsafe', 'treeflex', 'bitchip', 'solarbreeze', 'duobam', 'voltsillam', 'voltsillam', 'sub-ex', 'temp', 'zoolab', 'quo lux', 'sonair'],
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
}
