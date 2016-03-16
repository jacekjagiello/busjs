# BusJS
BusJS simple command bus for Javascript apps. It allows you to implement CQRS architecture in your app.

## Installation

`npm install busjs --save`

## Basic Usage

### Handling commands with Command Handlers
Every Command must have `name`, so it can be identified. Command is always handled by exacly one command handler. Command handler can be function which recives command object, or it can object with `handle(command)` method.

Let's take a look at exmaples:
```javascript
import Bus from 'busjs'

let bus = new Bus;

bus.addCommandHandler('RegisterUserHandler', (command) => {
    console.log('Handling RegisterUser command')
})

bus.handle('RegisterUser', { email: 'john@doe.com', password: 'secret123' })
```
Command handler can be also an object:
```javascript
...
let commandHandler = {
    handle: (command) => {
        console.log('Handling RegisterUser command')
    }
}

bus.addCommandHandler('RegisterUserHandler', commandHandler)

bus.handle('RegisterUser', { email: 'john@doe.com', password: 'secret123' })
```
**REMEMBER**

Command hanlder's are resolved based on naming convenction.
If your command is callled "RegisterUser", than command handler name must be "RegisterUser**Handler**". If command is "SendNotification" than handler is "SendNotification**Handler**" and so on...

## Dipatching and handling events
Through lifcecyle of your application you may want to dipatch events, when something happened. For example we may want to dispatch `UserWasRegistered` event. We can disptach our events in command handler's or in your domain objects. We stick with command handlers in this example.
```javascript
import { recordThat }, Bus from 'busjs'

let bus = new Bus;

bus.addCommandHandler('RegisterUserHandler', (command) => {
    recordThat('UserWasRegistered', {email: command.email})
})

let eventSubscriber = {
    notify: (event) => {
        console.log('Event subscriber was trigged')
    }
}

bus.addEventSubscriber('SendNotification', eventSubscriber, ['UserWasRegistered'])

bus.handle('RegisterUser', { email: 'john@doe.com', password: 'secret123' })
```
In this example when we handling command, we record a new event called `UserWasRegistered`. Then we are adding event subscriber which will handle this event. Event subscriber can be a function or object with `notify(event)` method. Unlike Command handlers, one event can be handled by many event subscribers.

Because of that we need to spcify which events eventSubscriber should handle. To do this we pass an array of event's names as a third argument for addEventSubscriber method.
## Middlewares
comming soon
