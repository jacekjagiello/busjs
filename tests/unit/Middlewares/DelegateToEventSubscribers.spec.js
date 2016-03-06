import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import Bus from 'src/Bus'
import DelegateToEventSubscribers from 'src/Middlewares/DelegateToEventSubscribers'

chai.should()
chai.use(sinonChai)

describe('DelegateToEventSubscribers middleware', () => {

    let self = {};

    beforeEach(() => {
        self.sut = new DelegateToEventSubscribers
    })

    it("delegates command to EventSubscriber", () => {
        let event = {name: 'UserWasCreated'}
        let eventSubscriber = sinon.spy()

        self.sut.add({
            name: 'DoSomethingWhenUserWasCreatedSubscriber',
            notify: eventSubscriber
        });

        self.sut.handle(event, () => {})

        eventSubscriber.should.have.been.calledWith(event)
    })

    it("calls next middleware", () => {
        let event = {name: 'UserWasCreated'}
        let nextMiddleware = sinon.spy()

        self.sut.add({
            name: 'DoSomethingWhenUserWasCreatedSubscriber',
            notify: () => {}
        });

        self.sut.handle(event, nextMiddleware)

        nextMiddleware.should.have.been.calledWith(event)
    })

    it("throws an Error if can not find EventSubscriber for given command", () => {
        let event = {name: 'RegisterUser'};

        self.sut.add({
            name: 'DoSomethingWhenUserWasCreatedSubscriber',
            notify: () => {}
        })

        expect(self.sut.handle.bind(self.sut, event, () => {})).to.throw(Error)
    })

    it("throws an Error if EventSubscriber does not exist", () => {
        expect(self.sut.handle.bind(self.sut, {name: 'CreateUser'}, () => {})).to.throw(Error)
    })
})
