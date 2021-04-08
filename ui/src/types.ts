// TODO: add globally available interfaces for your elements
import { AppWebsocket, CellId } from '@holochain/conductor-api';

export interface CalendarDeps {
  appWebsocket: AppWebsocket;
  cellId: CellId;
}
