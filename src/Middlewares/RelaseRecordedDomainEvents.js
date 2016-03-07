class RelaseRecordedDomainEvents {

    constructor(eventBus, domainEvents) {
        this.eventBus = eventBus
        this.domainEvents = domainEvents
    }

    handle(message, nextMiddleware) {

        try {
            nextMiddleware(message)
        } catch (e) {
            this.domainEvents.erseEvents()

            throw e
        }

        let recordedEvents = this.domainEvents.recordedEvents()

        this.domainEvents.erseEvents()

        for (var i = 0; i < recordedEvents.length; i++) {
            this.eventBus.handle(recordedEvents[i], nextMiddleware)
        }
    }
}

export default RelaseRecordedDomainEvents
