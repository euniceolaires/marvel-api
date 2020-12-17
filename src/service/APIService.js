import NodeFetch from 'node-fetch';
import Util from '../helpers/util';

export default class APIService {
  
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  async get(endpoint, {queries=null}) {
    try {
      const url = Util.toURL(this.baseUrl, endpoint, queries);
      const response = await NodeFetch(url);
      const json = await response.json(); 

      if (json.code !== 200) {
        throw new Error(json.code)
      }

      return json.data

    } catch(error) {
      console.error("APIService.get: ", error);
      throw error;
    }
  }

  async getAll(totalCount, endpoint, {queries=null}) {
    try {
      const tasks = Util.buildPromiseArray(totalCount, this.baseUrl, endpoint, queries);
      const arrayOfPromises = tasks.map(task => task());
      const response = await Promise.all(arrayOfPromises);
      let mergeResponse = [];

      response.forEach(({code, data={}}) => {
        if (code !== 200) {
          throw new Error(code)
        }
        mergeResponse = mergeResponse.concat(data.results);
      });

      return mergeResponse;

    } catch(error) {
      console.error("APIService.getAll: ", error);
      throw error;
    }
  }
}