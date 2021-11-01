/**
 * Define a JSON schema.
 */
export const createTransaction = {
  type: "object",
  required: ["path"],
  properties: {
    path: {
      type: "string",
    },
  },
};
