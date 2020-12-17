import NodeFetch from 'node-fetch';

const Util = {
  toURL: (baseURL, endpoint, queries) => {
    let url = new URL(baseURL + endpoint);
    if (queries) {
      for (let key in queries) {
        url.searchParams.append(key, queries[key]);
      }
    }
    return url.href;
  },
  buildPromiseArray: (totalCount, baseUrl, endpoint, queries) => {
    const promiseArray = [];
    const maxLimit = parseInt(queries.limit);
    
    for(let offset=0; offset < totalCount; offset = offset + maxLimit) {
      queries.offset = offset;
      const url = Util.toURL(baseUrl, endpoint, queries);
      promiseArray.push(() => NodeFetch(url).then((response) => response.json()));
    }

    return promiseArray;
  }
};

export default Util;