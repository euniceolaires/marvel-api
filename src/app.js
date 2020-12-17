import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

import characterRouter from './routes/character';
import config from './config';

var app = express();

app.use(logger('combined'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/characters', characterRouter);

export default app;
