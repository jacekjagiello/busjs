import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import Bus, { recordThat } from 'src/Bus'

chai.should()
chai.use(sinonChai)

describe('BusJs', () => {

    let bus = new Bus

    it("Delegates all commands to CommandHandlers", () => {
        let commandHandler = (command) => {
            expect(command.email).to.equal('john@doe.com')
        }

        bus.addCommandHandler("CreateUserHandler", commandHandler)

        bus.handle("CreateUser", {email: 'john@doe.com'})
    })

    it("Delegates all domain events to EventSubscriber", () => {
        let commandHandler =  (command) => {
            recordThat("UserWasCreated", {email: command.email})
        }

        let eventSubscriber = (event) => {
            expect(event.email).to.equal('john@doe.com')
        }

        bus.addCommandHandler("CreateUserHandler", commandHandler)
        bus.addEventSubscriber("DoSomethingWhenUserWasCreated", eventSubscriber, ["UserWasCreated"])

        bus.handle("CreateUser", {email: 'john@doe.com'})
    })

    it("throws Error if can not find CommandHandler for command", () => {
        expect(bus.handle.bind(bus, "SendNotification", {email: 'john@doe.com'})).to.throw(Error)
    })
})
