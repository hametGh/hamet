import { ModifyType, AlertType, ActionType } from "../enums";

type Modify = {
  type: ModifyType;
  property: string;
  value: string;
};
type Alert = {
  type: AlertType;
  data: any;
};
export type Action = {
  type: ActionType;
  modify: Modify[] | [];
  alert: Alert[] | [];
};
