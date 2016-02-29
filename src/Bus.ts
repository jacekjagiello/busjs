import MessageBus from './MessageBus'
import CommandHandler from './Model/CommandHandler';
import Middleware from './Model/Middleware'
import DelegateToCommandHandlers from './Middlewares/DelegateToCommandHandlers';

class Bus extends MessageBus
{
    commandHandlers: DelegateToCommandHandlers;

    constructor()
    {
        super();

        this.commandHandlers = new DelegateToCommandHandlers;

        super.appendMiddleware(this.commandHandlers);
    }

    addCommandHandler(commandHandler: CommandHandler)
    {
        this.commandHandlers.add(commandHandler);
    }
}

export default Bus;
