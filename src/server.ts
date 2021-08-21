import express, { Application } from "express";
const app: Application = express();

// Import interface
import { Options } from "./interfaces";

// Define routes
app.use(require("./routes"));

/**
 * The GUI end-point will be started
 * if the configuration is set to true
 * @param server
 */
const init = (server: Options) => {
  const { gui } = server;
  if (gui.enabled) app.listen(gui.port || 1010);
};
export = { init, app };
