import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
// import dotenv from 'dotenv-safe';
// dotenv.config();

import characterRouter from './routes/character';


const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: "Marvel API",
      version: '1.0.0', // TODO: Move this to config
    },
  },
  apis: ['./routes*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

var app = express();

app.use(logger('combined'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/characters', characterRouter);

export default app;
