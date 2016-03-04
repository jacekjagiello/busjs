import DomainEvents from './../DomainEvents'

class RelaseRecordedDomainEvents {
    eventBus;

    constructor(eventBus) {
        this.eventBus = eventBus;
    }

    handle(message, nextMiddleware) {

        try {
            nextMiddleware(message);
        } catch (e) {
            DomainEvents.erseEvents();

            throw e;
        }

        let recordedEvents = DomainEvents.recordedEvents();

        DomainEvents.erseEvents();

        for (var i = 0; i < recordedEvents.length; i++) {
            this.eventBus.handle(recordedEvents[i], nextMiddleware)
        }
    }
}

export default RelaseRecordedDomainEvents;
