import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import DelegateToCommandHandlers from 'src/Middlewares/DelegateToCommandHandlers'

chai.should()
chai.use(sinonChai)

describe('DelegateToCommandHandlers middleware', () => {

    let self = {};

    beforeEach(() => {
        self.sut = new DelegateToCommandHandlers
    })

    it("delegates command to CommandHandler", () => {
        let command = {name: 'CreateUser'}
        let commandHandler = sinon.spy()

        self.sut.add({
            name: 'CreateUserHandler',
            handle: commandHandler
        });

        self.sut.handle(command, () => {})

        commandHandler.should.have.been.calledWith(command)
    })

    it("calls next middleware", () => {
        let command = {name: 'CreateUser'}
        let nextMiddleware = sinon.spy()

        self.sut.add({
            name: 'CreateUserHandler',
            handle: () => {}
        });

        self.sut.handle(command, nextMiddleware)

        nextMiddleware.should.have.been.calledWith(command)
    })

    it("throws an Error if can not find CommandHandler for given command", () => {
        let incorrectCommand = {name: 'RegisterUser'};

        self.sut.add({
            name: 'CreateUserHandler',
            handle: () => {}
        })

        expect(self.sut.handle.bind(self.sut, incorrectCommand, () => {})).to.throw(Error)
    })

    it("throws an Error if CommandHandler does not exist", () => {
        expect(self.sut.handle.bind(self.sut, {name: 'CreateUser'}, () => {})).to.throw(Error)
    })
})
