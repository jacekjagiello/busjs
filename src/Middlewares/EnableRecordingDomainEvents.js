import DomainEvents from './../DomainEvents'

class EnableRecordingDomainEvents {

    constructor(domainEvents) {
        this.domainEvents = domainEvents
    }

    handle(message, nextMiddleware) {
        this.domainEvents.enableRecording()

        try {
            nextMiddleware(message)
        } catch (e) {
            this.domainEvents.disableRecording()

            throw e
        }

        this.domainEvents.disableRecording()
    }
}

export default EnableRecordingDomainEvents
