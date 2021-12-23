module.exports = app => {
  const messageRouter = require('./message/message.route');
  const authRouter = require('./authentification/authentification.route');
  const groupeRouter = require('./groupe/groupe.route');
  const apiPrefix = '/api/v1';
  app.use(apiPrefix, messageRouter);
  app.use(apiPrefix, authRouter);
  app.use(apiPrefix, groupeRouter);
};
