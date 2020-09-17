import { Subject } from 'rxjs/Subject';

export class EventObject {
    event?: string;
    key?: string;
    subject?: Subject<any>;
}
