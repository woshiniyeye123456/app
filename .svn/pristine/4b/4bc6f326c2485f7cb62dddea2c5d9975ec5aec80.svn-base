import loggerfacaed from '../common/logger/loggerfacaed';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';

// let registerInfo:RegisterInfo;
let _webSocketAddress: string;
let subject: WebSocketSubject<any>;
let messageObservable: Observable<any>;

export function connectServerSocket(ipPort: string, registerInfo: any) {
        // _webSocketAddress = 'ws://' + ipPort + '/notify.do';
        // subject = Observable.webSocket(_webSocketAddress);
        // messageObservable = subject.retry(99999999999999999999999);
        // appendInitInfo();
    }
function appendInitInfo() {
        messageObservable.subscribe(
            (msg) => console.log('message received:' + JSON.stringify(msg)),
            (error) => console.log('socket error' + error),
            () => console.log('socket complete')
        );
    }

