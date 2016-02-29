import Bus from './Bus'
import Middleware from './Model/Middleware'
import Message from './Model/Message'

import DelegateToCommandHandlers from './Middlewares/DelegateToCommandHandlers'
import CommandHandler from './Model/CommandHandler'

let bus = new Bus();

let createUserHandler = {
    name: 'CreateUserHandler',
    handle: (command) => {
        console.log('create user handler', command.data);
    }
};

bus.addCommandHandler(createUserHandler)
bus.addCommandHandler(new CreateUserHandler())

bus.handle('CreateUser', {email: 'jacekjagiello47@gmail.com'})
