import Middleware from './../Model/Middleware'
import CommandHandler from './../Model/CommandHandler'

class DelegateToCommandHandlers implements Middleware
{
    commandHandlers: Array<CommandHandler>;

    constructor(commandHandlers = [])
    {
        this.commandHandlers = commandHandlers;
    }

    handle(message, nextMiddleware)
    {
        let commandName = message.name;

        let commandHandler = this._findCommandHandlerByHandledCommand(commandName);
        
        if (commandHandler == undefined) {
            throw new Error(`Command handler for command "${commandName}" does not exist`);
        }

        commandHandler.handle(message);

        nextMiddleware(message);
    }

    add(commandHandler: CommandHandler)
    {
        this.commandHandlers.push(commandHandler);
    }

    _findCommandHandlerByHandledCommand(commandName) {
        let commandHandler;

        this.commandHandlers.forEach(handler => {
            if(handler.name == commandName+'Handler') {
                commandHandler = handler;
            }
        });

        return commandHandler;
    }
}

export default DelegateToCommandHandlers;
