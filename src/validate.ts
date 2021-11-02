/**
 * Define a JSON schema.
 */
export const createTransaction = {
  type: "object",
  required: ["path", "type", "method", "trigger", "action", "action"],
  properties: {
    path: {
      type: "string",
    },
    type: {
      type: "numbr",
    },
    enabled: {
      type: "boolean",
    },
    method: {
      type: "string",
    },
    createdAt: {
      type: "date",
    },
    trigger: [
      {
        by: {
          type: "number",
        },
        condition: [
          {
            property: {
              type: "string",
            },
            operator: {
              type: "string",
            },
            value: {
              type: "mixedd",
            },
          },
        ],
      },
    ],
    triggerWhen: {
      type: "string",
    },
    action: [
      {
        type: {
          type: "number",
        },
        modify: [
          {
            type: { type: "number" },
            property: { type: "string" },
            value: { type: "string" },
          },
        ],
        alert: [
          {
            alertType: { type: "string" },
            data: { type: "mixed" },
          },
        ],
      },
    ],
    actionWhen: {
      type: "string",
    },
  },
};
