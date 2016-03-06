class MessageBus
{

    constructor(middlewares = []) {
        this.middlewares = middlewares;
    }

    appendMiddleware(middleware) {
        this.middlewares.push(middleware);
    }

    prependMiddleware(middleware) {
        this.middlewares.unshift(middleware);
    }


    handle(name, data) {
        this._callNextMiddleware(0)({name, data});
    }

    _callNextMiddleware(index) {
        let middleware = this.middlewares[index];

        if(!middleware) {
            return () => {};
        }

        return (message) => {
            middleware.handle(message, this._callNextMiddleware(index+1));
        }
    }
}

export default MessageBus;
