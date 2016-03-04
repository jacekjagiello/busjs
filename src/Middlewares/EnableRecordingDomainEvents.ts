import DomainEvents from './../DomainEvents'

class EnableRecordingDomainEvents {

    domainEvents() {
        return this.domainEvents;
    }

    handle(message, nextMiddleware) {
        DomainEvents.enableRecording();


        try {
            nextMiddleware(message);
        } catch (e) {
            DomainEvents.disableRecording();

            throw e;
        }

        DomainEvents.disableRecording();
    }
}

export default EnableRecordingDomainEvents;
