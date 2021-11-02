/**
 * Define a JSON schema.
 */
export const createTransaction = {
  type: "object",
  required: ["path", "type", "method", "trigger", "action"],
  properties: {
    path: {
      type: "string",
    },
    type: {
      type: "numbr",
      enum: [0, 1],
    },
    enabled: {
      type: "boolean",
      default: false,
    },
    method: {
      type: "string",
      enum: ["GET", "POST", "PUT", "DELETE"],
    },
    createdAt: {
      type: "string",
      format: "date-time",

      // TODO set the default value
      default: new Date(),
    },
    trigger: {
      type: "array",
      items: {
        type: "object",
        properties: {
          by: {
            type: "number",
            minimum: 0,
            maximum: 4,
          },
          condition: {
            type: "array",
            items: {
              type: "object",
              properties: {
                property: {
                  type: "string",
                },
                operator: {
                  type: "string",
                  enum: [
                    "===",
                    "!==",
                    "startWith",
                    "endWith",
                    "include",
                    "notInclude",
                  ],
                },
                value: {
                  type: ["number", "string", "boolean"],
                },
              },
            },
          },
        },
      },
    },
    triggerWhen: {
      type: "string",
      enum: ["AND", "OR"],
    },
    action: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: {
            type: "number",
            enum: [0, 1],
          },
          modify: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "number", minimum: 0, maximum: 5 },
                property: { type: "string" },
                value: { type: "string" },
              },
            },
          },

          alert: {
            type: "array",
            items: {
              type: "object",
              properties: {
                alertType: { type: "string", enum: ["webhook", "slack"] },
                // TODO Define unevaluated properties
                // data: { type: "object" },
              },
            },
          },
        },
      },
    },

    actionWhen: {
      type: "string",
      enum: ["AND", "OR"],
    },
  },
};
