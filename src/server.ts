import express from "express";
import routes from "./routes.js";

import { Options } from "./lib/types/Options";
import { verifyToken } from "./lib/middlewares/auth.js";

const app = express();

// define auth middleware
app.use(verifyToken);

// Define routes
app.use(routes);

/**
 * The GUI end-point will be started
 * if the configuration is set to true
 * @param server
 */
export const init = (server: Options) => {
  const { gui } = server;
  if (gui?.enabled) {
    console.log("hamet GUI is running on ", gui.port || 1010);
    console.log("http://localhost:%s?t=%d", gui.port || 1010, Math.random());
    app.listen(gui.port || 1010);
  }
};
export default app;
