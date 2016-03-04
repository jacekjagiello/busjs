import Middleware from './../Model/Middleware'
import EventSubscriber from './../Model/EventSubscriber'

class DelegateToEventSubscribers implements Middleware
{
    eventSubscribers: Array<EventSubscriber>;

    constructor(eventSubscribers = [])
    {
        this.eventSubscribers = eventSubscribers;
    }

    handle(event, nextMiddleware)
    {
        let eventName = event.name;

        let eventSubscriber = this._findEventSubscriberByEvent(eventName);

        if (eventSubscriber == undefined) {
            throw new Error(`Event subscriber for event "${eventName}" does not exist`);
        }

        eventSubscriber.notify(event);
        nextMiddleware(event);
    }

    add(eventSubscriber: EventSubscriber)
    {
        this.eventSubscribers.push(eventSubscriber);
    }

    _findEventSubscriberByEvent(eventName) {
        let eventSubscriber;

        this.eventSubscribers.forEach(subscriber => {
            if(subscriber.name == eventName+'Subscriber') {
                eventSubscriber = subscriber;
            }
        });

        return eventSubscriber;
    }
}

export default DelegateToEventSubscribers;
