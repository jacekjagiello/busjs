class DelegateToEventSubscribers {

    constructor(eventSubscribers = []) {
        this.eventSubscribers = eventSubscribers
    }

    handle(event, nextMiddleware) {
        let eventName = event.name

        let eventSubscriber = this._findEventSubscriberByEvent(eventName)

        if (eventSubscriber == undefined) {
            throw new Error(`Event subscriber for event "${eventName}" does not exist`)
        }

        eventSubscriber.notify(event)

        nextMiddleware(event)
    }

    add(eventSubscriber) {
        this.eventSubscribers.push(eventSubscriber)
    }

    _findEventSubscriberByEvent(eventName) {
        let eventSubscriber

        this.eventSubscribers.forEach(subscriber => {
            if(subscriber.subscribersTo.indexOf(eventName) > -1) {
                eventSubscriber = subscriber
            }
        })

        return eventSubscriber
    }

    _findEventSubscriberByNamingConvenction(eventName) {
        let eventSubscriber

        this.eventSubscribers.forEach(subscriber => {
            if(subscriber.name.indexOf(eventName + 'Subscriber') > -1) {
                eventSubscriber = subscriber
            }
        })

        return eventSubscriber
    }
}

export default DelegateToEventSubscribers
