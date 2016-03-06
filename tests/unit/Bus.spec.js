import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import Bus from 'src/Bus'

describe('Bus', () => {

    let sut = new Bus

    it("adds CommandHandler in the form of the function", () => {
        sut.addCommandHandler("CreateUserHandler", () => {})

        expect(sut.getCommandHandlers()).to.not.be.empty
    })

    it("adds CommandHandler in the form of the object", () => {
        sut.addCommandHandler("CreateUserHandler", { handle: () => {} })

        expect(sut.getCommandHandlers()).to.not.be.empty
    })

    it("adds EventSubscriber in the form of the function", () => {
        sut.addEventSubscriber("DoSometinhWhenUserWasCreated", () => {})

        expect(sut.getEventSubscribers()).to.not.be.empty
    })

    it("adds EventSubscriber in the form of the object", () => {
        sut.addEventSubscriber("DoSometinhWhenUserWasCreated", { notify: () => {} })

        expect(sut.getEventSubscribers()).to.not.be.empty
    })

    it("throws Error if CommandHandler object does not have 'handle' method", () => {
        expect(sut.addCommandHandler.bind(sut, "CreateUserHandler", {})).to.throw(Error)
    })

    it("throws Error if EventSubscriber object does not have 'notify' method", () => {
        expect(sut.addEventSubscriber.bind(sut, "DoSometinhWhenUserWasCreated", {})).to.throw(Error)
    })
})
