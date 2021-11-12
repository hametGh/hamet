import { ModifyType, AlertType, ActionType } from "../enums";
import { Methods } from "../types/Methods";

type Modify = {
  type: ModifyType;
  property: string;
  value: string;
};
type Alert = {
  type: AlertType;
  url: string;
  method: Methods;
  data: any;
};
export type Action = {
  type: ActionType;
  enabled: boolean;
  modify: Modify[] | [];
  alert: Alert[] | [];
};
