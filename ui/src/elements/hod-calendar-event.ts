import { html, LitElement, property } from 'lit-element';
import {
  connectDeps,
  DepsElement,
  BaseElement,
} from '@holochain-open-dev/common';
import { sharedStyles } from '../sharedStyles';
import { AppWebsocket, CellId } from '@holochain/conductor-api';
import { CalendarDeps } from '../types';

// TODO: create your own elements
export abstract class HodCalendarEvent
  extends BaseElement
  implements DepsElement<CalendarDeps> {
  /** Public attributes */

  /**
   * This is a description of a property with an attribute with exactly the same name: "color".
   */
  @property({ type: String }) title = 'Hey there';

  /** Private properties */

  @property({ type: Number }) _counter = 5;

  static get styles() {
    return sharedStyles;
  }

  abstract get _deps(): CalendarDeps;

  async firstUpdated() {
    const result = await this._deps.appWebsocket.callZome({
      cap: null as any,
      cell_id: this._deps.cellId,
      zome_name: 'todo_rename_zome',
      fn_name: 'get_all_calendar_events',
      payload: null,
      provenance: this._deps.cellId[1],
    });
    console.log('result', result);
  }

  render() {
    return html`
      <h2>${this.title} Nr. ${this._counter}!</h2>
      <button>increment</button>
    `;
  }
}
