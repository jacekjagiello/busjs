import MessageBus from './MessageBus'
import CommandHandler from './Model/CommandHandler';
import Middleware from './Model/Middleware'
import DomainEvents from './DomainEvents'
import DelegateToCommandHandlers from './Middlewares/DelegateToCommandHandlers';
import DelegateToEventSubscribers from './Middlewares/DelegateToEventSubscribers';
import RelaseRecordedDomainEvents from './Middlewares/RelaseRecordedDomainEvents';
import EnableRecordingDomainEvents from './Middlewares/EnableRecordingDomainEvents';

class Bus extends MessageBus
{
    commandHandlers: DelegateToCommandHandlers;
    eventSubscribers: DelegateToEventSubscribers;

    constructor()
    {
        super();

        this.commandHandlers = new DelegateToCommandHandlers;
        this.eventSubscribers = new DelegateToEventSubscribers;

        super.appendMiddleware(this.commandHandlers);
        super.appendMiddleware(new RelaseRecordedDomainEvents(this.eventSubscribers));
        super.prependMiddleware(new EnableRecordingDomainEvents);
    }

    addCommandHandler(commandHandlerName: string, commandHandler)
    {
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

    addEventSubscriber(eventSubscriberName: string, eventSubscriber)
    {
        let notify = eventSubscriber;

        if(typeof eventSubscriber === 'object') {
            if (eventSubscriber.handle === undefined) {
                throw Error("Command handler must have 'handle' method!")
            }

            notify = eventSubscriber.handle;
        }

        this.eventSubscribers.add({
            name: eventSubscriberName,
            notify
        });
    }
}

export default Bus;
