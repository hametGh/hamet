/**
 * Define a JSON schema for create transaction
 */
export const createTransaction = {
  type: "object",
  required: [
    "path",
    "type",
    "method",
    "trigger",
    "action",
    "triggerWhen",
    "actionWhen",
  ],
  properties: {
    path: {
      type: "string",
    },
    type: {
      type: "number",
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
    },
    trigger: {
      type: "array",
      items: {
        type: "object",
        required: ["by", "condition"],
        properties: {
          by: {
            type: "number",
            minimum: 0,
            maximum: 5,
          },
          condition: {
            type: "array",
            items: {
              type: "object",
              required: ["property", "operator", "value"],
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
        required: ["type"],
        properties: {
          type: {
            type: "number",
            /**
             * TODO conditional validation should be implemented
             * if type === 0 then `modify` should be required
             * if type === 1 then `alert`  should be required
             */
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

/**
 * Define a JSON schema for update transaction
 */
export const updateTransaction = {
  type: "object",

  properties: {
    path: {
      type: "string",
    },
    type: {
      type: "number",
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
    },
    trigger: {
      type: "array",
      items: {
        type: "object",

        properties: {
          by: {
            type: "number",
            minimum: 0,
            maximum: 5,
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
            /**
             * TODO conditional validation should be implemented
             * if type === 0 then `modify` should be required
             * if type === 1 then `alert`  should be required
             */
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
