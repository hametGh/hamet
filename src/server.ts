import express, { RequestHandler, Response } from "express";
import routes from "./routes.js";

import { Options } from "./lib/types/Options";
import { verifyToken } from "./lib/middlewares/auth.js";
import { validationErrorMiddleware } from "./lib/middlewares/validationError.js";

const app = express();

/**
 * The GUI end-point will be started
 * if the configuration is set to true
 * @param Options options
 */
export const init = (options: Options) => {
  const { gui } = options;
  if (!gui.enabled) return;

  const port = gui.port || 1010;

  // define auth middleware
  app.use(verifyToken(options));

  app.use(express.json());

  // Define routes
  app.use(routes);

  app.use(validationErrorMiddleware);

  app.listen(port);

  console.log("hamet GUI is running on ", port);
  console.log("http://localhost:%s?t=%d", port, Math.random());
};
export default app;
