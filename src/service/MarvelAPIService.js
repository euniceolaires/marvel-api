import md5 from 'md5';
import CacheService from './CacheService';
import APIService from './APIService';
import config from '../config';

export const ttl = config.CACHE_TTL; //cache for 1 minute
const cache = new CacheService(ttl);
export const apiService = new APIService(config.MARVEL_BASE_URL) 


const MarvelAPIService = {
  getCharactersTotalCount(timestamp) {
    const endpoint = config.MARVEL_GET_CHARACTERS;

    const options = {
      body: {},
      queries: {
        ts: timestamp,
        apikey: config.MARVEL_PUBLIC_KEY,
        hash: md5(timestamp + config.MARVEL_PRIVATE_KEY + config.MARVEL_PUBLIC_KEY),
        limit: 1
      }
    }

    return apiService.get(endpoint, options);
  },

  async getCharacterById(timestamp, id) {
    const cacheCharacter = cache.getById(id);
    if (!cacheCharacter) {
      const endpoint = (config.MARVEL_GET_CHARACTER).replace(/:id/gi, id);
      const options = {
        queries: {
          ts: timestamp,
          apikey: config.MARVEL_PUBLIC_KEY,
          hash: md5(timestamp + config.MARVEL_PRIVATE_KEY + config.MARVEL_PUBLIC_KEY),
        }
      }
      try {
        const { results=[] } = await apiService.get(endpoint, options);
        const character = results[0];
        const obj = {
          id: character.id,
          name: character.name,
          description: character.description,
        };

        cache.set(character.id, obj);
        return obj;

      } catch(error) {
        console.error("MarvelAPIService.getCharacterById: ", error);
        throw error;
      }
    }

    return cacheCharacter;
  },

  // getCharacters(timestamp, totalCount) {
  async getCharacters(timestamp) {
    const cacheIds = cache.getIds();

    const endpoint = config.MARVEL_GET_CHARACTERS;

    const options = {
      queries: {
        ts: timestamp,
        apikey: config.MARVEL_PUBLIC_KEY,
        hash: md5(timestamp + config.MARVEL_PRIVATE_KEY + config.MARVEL_PUBLIC_KEY),
        limit: config.MARVEL_MAX_LIMIT
      }
    }

    try {
      const { total } = await this.getCharactersTotalCount(timestamp);

      if (cacheIds.length !== parseInt(total)) {
        const characters = await apiService.getAll(parseInt(total), endpoint, options)
      
        const newCharacters = characters.map(character => {
          return {
            key: character.id,
            val: {
            id: character.id,
            name: character.name,
            description: character.description,
            }
          };
        });

        cache.setArrays(newCharacters);

        return cache.getIds();
      } 
      return cacheIds;

    } catch(error) {
      console.error("MarvelAPIService.getCharacters: ", error);
      throw error;
    }

  }
}

export default MarvelAPIService;