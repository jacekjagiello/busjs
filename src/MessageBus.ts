import Middleware from './Model/Middleware'

class MessageBus
{
    middlewares:Middleware[];

    constructor(middlewares: Middleware[] = [])
    {
        this.middlewares = middlewares;
    }

    appendMiddleware(middleware: Middleware)
    {
        this.middlewares.push(middleware);
    }

    prependMiddleware(middleware: Middleware)
    {
        this.middlewares.unshift(middleware);
    }


    handle(name: String, data: Object)
    {
        this._callNextMiddleware(0)({name, data});
    }

    _callNextMiddleware(index)
    {
        let middleware = this.middlewares[index];

        if(!middleware) {
            return () => {};
        }

        let self = this;

        return (message) => {
            middleware.handle(message, self._callNextMiddleware(index+1));
        };
    }
}

export default MessageBus;
