import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import Bus from 'src/Bus'
import DomainEvents from 'src/DomainEvents'

chai.should()
chai.use(sinonChai)

describe('Bus', () => {

    let sut = new Bus
    let commandHandler

    beforeEach(() => {
        commandHandler = {handle: () => {}}
    })

    it("Delegates all commands to CommandHandlers", () => {
        let commandHandlerSpy = sinon.spy(commandHandler, "handle")

        sut.addCommandHandler("CreateUserHandler", commandHandler)

        sut.handle("CreateUser", { email: 'test@example.com' })

        commandHandlerSpy.should.have.been.calledWith({
            name: "CreateUser",
            data: { email: "test@example.com" }
        })
    })

    it("Delegates all domain events to EventSubscriber", () => {
        let commandHandler = (command) => DomainEvents.recordThat("UserWasCreated", command.data)
        let eventSubscriber = sinon.spy()

        sut.addCommandHandler("CreateUserHandler", commandHandler)
        sut.addEventSubscriber("SendNotificationWhenUserWasCreatedSubscriber", eventSubscriber)

        sut.handle("CreateUser", { email: 'test@example.com' })

        eventSubscriber.should.have.been.calledWith()
    })

    it("throws Error if can not find CommandHandler for command", () => {
        expect(sut.handle.bind(sut, "SendNotification", {email: 'test@example.com'})).to.throw(Error)
    })
})
