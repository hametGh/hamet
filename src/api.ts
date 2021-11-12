import fetch from "node-fetch";

// import types
import { Methods } from "./lib/types/Methods";

/**
 * send request
 * @param url string
 * @param method Methods
 * @param body Json object
 */
export const request = (url: string, method: Methods, body: object) => {
  return fetch(url, { method, body: JSON.stringify(body) });
};
