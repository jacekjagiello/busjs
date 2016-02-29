import Message from './Message'

interface Middleware {
    handle(message: Message, nextMiddleware: Function),
}

export default Middleware;
