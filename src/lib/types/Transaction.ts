// import types
import { Methods } from "./Methods";
import { Check } from "./Check";
import { Trigger } from "./Trigger";
import { Action } from "./Action";

// import enums
import { Hook } from "./Hook";

export type Transaction = {
  id: string;
  path: string;
  type: Hook;
  enabled: boolean;
  method: Methods;
  createdAt: Date;
  trigger: Trigger[];
  triggerWhen: Check;
  action: Action[];
};
