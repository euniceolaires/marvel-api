import { Router } from 'express';
import { url } from 'inspector';

const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('View characters');
});

/* GET home page. */
router.get('/:id', function(req, res, next) {
  res.send('view character');
});


export default router;
