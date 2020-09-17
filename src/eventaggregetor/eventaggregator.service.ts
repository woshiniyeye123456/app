import { Subject } from 'rxjs/Subject';
import { EventObject } from '../models/EventObject';

const eventObjects: EventObject[] = [];

const EventAggregator = {

    subscribe(event: string, key: string, func: (param: any) => void) {
        // 因为页面跳转和刷新都会重新触发构造器和ngInit方法,重新构造代表着整个页面的实例都被重置了,
        // 现在的订阅一般都是在构造器里，所以传递给订阅模式的func属性都必须是基于最新实例的，否则会
        // 出现页面绑定的变量在页面来回跳转后虽然能正常的触发publish，但却无法通知界面的现象，以下
        // 代码通过删除并重新进入队列的方式，保证了订阅发布是最新的
        const index = eventObjects.findIndex((o) => o.event === event && o.key === key);
        const delLength = index === -1 ? -1 : 1;
        eventObjects.splice(index, delLength);
        // 再找一次(做保护，防止没删掉)
        const eos = eventObjects.filter((eo) => {
            if (eo.event === event && eo.key === key) {
                return eo;
            }
        });

        if (eos.length === 0) {
            const subject = new Subject();
            subject.subscribe(
                {
                    next: (v) => {
                        func(v);
                    }
                }
            );
            const eventObject = new EventObject();
            eventObject.event = event;
            eventObject.key = key;
            eventObject.subject = subject;
            eventObjects.push(eventObject);
        } else {
            // 递归删除.必须保证每次订阅时,上下文环境是最新的
            this.subscribe(event, key, func);
        }
    },

    publish(event: string, param: any) {
        const eos = eventObjects.filter((eo) => {
            if (eo.event === event) {
                return eo;
            }
        });
        if (eos != null) {
            eos.forEach((element) => {
                const subject: any = element.subject;
                subject.next(param);
            });
        }
    }

};
export default EventAggregator;



