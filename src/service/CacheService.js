import NodeCache from 'node-cache';

export default class Cache {

  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2})
  }

  setArrays(array) {
    //Array<{key, val, ttl?}>
    this.cache.mset(array)
  }

  getIds() {
    return this.cache.keys();
  }

  set(key, val) {
    this.cache.set(key, val);
  }

  getById(id) {
    return this.cache.get(id);
  }
}