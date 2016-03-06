import MessageBus from './MessageBus'
import DomainEvents from './DomainEvents'

import DelegateToCommandHandlers from './Middlewares/DelegateToCommandHandlers'
import DelegateToEventSubscribers from './Middlewares/DelegateToEventSubscribers'
import RelaseRecordedDomainEvents from './Middlewares/RelaseRecordedDomainEvents'
import EnableRecordingDomainEvents from './Middlewares/EnableRecordingDomainEvents'

class Bus extends MessageBus
{
    constructor() {
        super()

        this.commandHandlers = new DelegateToCommandHandlers
        this.eventSubscribers = new DelegateToEventSubscribers

        super.appendMiddleware(this.commandHandlers)
        super.appendMiddleware(new RelaseRecordedDomainEvents(this.eventSubscribers, DomainEvents))
        super.prependMiddleware(new EnableRecordingDomainEvents(DomainEvents))
    }

    handle(messageName, data) {
        super.handle({
            name: messageName,
            data
        })
    }

    addCommandHandler(commandHandlerName, commandHandler) {
        let handler = commandHandler;

        if(typeof commandHandler === 'object') {
            if (commandHandler.handle === undefined) {
                throw Error("Command handler must have 'handle' method!")
            }

            handler = commandHandler.handle;
        }

        this.commandHandlers.add({
            name: commandHandlerName,
            handle: handler
        });
    }

    getCommandHandlers() {
        return this.commandHandlers.commandHandlers;
    }

    addEventSubscriber(eventSubscriberName, eventSubscriber) {
        let notify = eventSubscriber;

        if(typeof eventSubscriber === 'object') {
            if (eventSubscriber.notify === undefined) {
                throw Error("EventSubscriber must have 'notify' method!")
            }

            notify = eventSubscriber.handle;
        }

        this.eventSubscribers.add({
            name: eventSubscriberName,
            notify
        });
    }

    getEventSubscribers() {
        return this.eventSubscribers.eventSubscribers;
    }
}

export default Bus;
