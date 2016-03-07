class MessageBus
{

    constructor(middlewares = []) {
        this.middlewares = middlewares
    }

    appendMiddleware(middleware) {
        this.middlewares.push(middleware)
    }

    prependMiddleware(middleware) {
        this.middlewares.unshift(middleware)
    }


    handle(message) {
        if(!message.name) {
            throw new Error("Message must be an object and contain 'name' property")
        }
        this._callNextMiddleware(0)(message)
    }

    _callNextMiddleware(index) {
        let middleware = this.middlewares[index]

        if(!middleware) {
            return () => {}
        }

        return (message) => {
            middleware.handle(message, this._callNextMiddleware(index+1))
        }
    }
}

export default MessageBus
