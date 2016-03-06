import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import MessageBus from 'src/MessageBus'

describe('MessageBus', () => {

    let messageBus = new MessageBus
    let middlewareCallingNextMiddleware = {handle: (message, nextMiddleware) => nextMiddleware(message)}

    it("pass message to all registered middlewares", () => {
        let nextMiddleware = {handle: () => {}}

        let middlewareSpy = sinon.spy(middlewareCallingNextMiddleware, "handle")
        let nextMidllewareSpy = sinon.spy(nextMiddleware, "handle")

        messageBus.appendMiddleware(middlewareCallingNextMiddleware)
        messageBus.appendMiddleware(nextMiddleware)

        messageBus.handle({name: 'CreateUser'})

        middlewareSpy.should.have.been.calledWith()
        nextMidllewareSpy.should.have.been.calledWith()
    })

    it("throws error if message does not have 'name' property", () => {
        expect(messageBus.handle.bind(messageBus, 'CreateUser')).to.throw(Error)
    })

    it("can append middleware", () => {
        let middleware = () => {};

        messageBus.appendMiddleware(middleware)

        expect(messageBus.middlewares).to.contain(middleware)
    })

    it("can prepend middleware", () => {
        let firstMiddleware = () => {};
        let SecondMiddleware = () => {};

        messageBus.appendMiddleware(firstMiddleware)

        messageBus.prependMiddleware(SecondMiddleware)

        expect(messageBus.middlewares[0]).to.equal(SecondMiddleware)
    })
})
