import Message from './Message'

interface CommandHandler {
    name: String,
    handle(message: Message)
}

export default CommandHandler;
