import { Router } from 'express';
import MarvelAPIService from '../service/MarvelAPIService';

const router = Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const timestamp = Date.now();

  try {
    const characters = await MarvelAPIService.getCharacters(timestamp);
    res.send(characters);
  } catch(error) {
    res.status(500).send('Internal Server Error');
  }
});

/* GET home page. */
router.get('/:id', async function(req, res, next) {
  const timestamp = Date.now();
  try {
    const character = await MarvelAPIService.getCharacterById(timestamp, req.params.id);
    res.send(character);
  } catch(error) {
    if (error.message == "404") {
      return res.status(404).send('Not Found');
    }
    res.status(500).send('Internal Server Error');
  }
});

export default router;
