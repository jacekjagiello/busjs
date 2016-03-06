import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import RelaseRecordedDomainEvents from 'src/Middlewares/RelaseRecordedDomainEvents'

chai.should()
chai.use(sinonChai)

describe('RelaseRecordedDomainEvents middleware', () => {

    let eventBus, domainEvents;

    beforeEach(() => {
        eventBus = { handle: () => {} }
        domainEvents = { recordedEvents: () => {}, erseEvents: () => {} }
    })

    let message = {name: 'CreateUser'}

    it("relases recorded domain event", () => {
        let handle = sinon.spy(eventBus, 'handle')
        let domainEventsMock = sinon.mock(domainEvents)

        let recordedEvents = [
            {name: 'UserWasCreated'},
            {name: 'EmailNotificationWasSent'}
        ]

        domainEventsMock.expects("recordedEvents").once().returns(recordedEvents)

        let sut = new RelaseRecordedDomainEvents(eventBus, domainEvents)

        sut.handle(message, () => {})

        domainEventsMock.verify()
        handle.should.have.been.calledWith(recordedEvents[0])
        handle.should.have.been.calledWith(recordedEvents[1])
    })

    it("calls next middleware", () => {
        let command = {name: 'CreateUser'}
        
        let nextMiddleware = sinon.spy()
        let domainEventsMock = sinon.mock(domainEvents)

        domainEventsMock.expects("recordedEvents").once().returns([])

        let sut = new RelaseRecordedDomainEvents(eventBus, domainEvents)

        sut.handle(command, nextMiddleware)

        nextMiddleware.should.have.been.calledWith(command)
    })

    it("does not relases domain event if any domain event was recorded", () => {
        let handle = sinon.spy(eventBus, 'handle')
        let domainEventsMock = sinon.mock(domainEvents)

        let recordedEvents = []

        domainEventsMock.expects("recordedEvents").once().returns(recordedEvents)

        let sut = new RelaseRecordedDomainEvents(eventBus, domainEvents)

        sut.handle(message, () => {})

        domainEventsMock.verify()
        handle.should.not.have.been.calledWith(recordedEvents[0])
    })

    it("erses all recorded domain events", () => {
        let erseEvents = sinon.spy(domainEvents, "erseEvents")
        let domainEventsMock = sinon.mock(domainEvents)

        let recordedEvents = [{name: 'UserWasCreated'}];

        domainEventsMock.expects("recordedEvents").once().returns(recordedEvents)

        let sut = new RelaseRecordedDomainEvents(eventBus, domainEvents)

        sut.handle(message, () => {})

        erseEvents.should.have.been.calledWith()
    })
})
