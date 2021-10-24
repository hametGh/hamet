import { TriggerBy } from "../enums";
import { Condition } from "./Condition";

export type Trigger = {
  by: TriggerBy;
  condition: Condition[];
};
