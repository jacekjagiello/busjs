import Message from './Message'

interface EventSubscriber {
    name: String,
    notify(message: Message)
}

export default EventSubscriber;
