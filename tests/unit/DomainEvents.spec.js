import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import DomainEvents from 'src/DomainEvents'

describe('DomainEvents', () => {
    it("does not records domain events by default", () => {
        DomainEvents.recordThat("UserWasCreated")
        
        expect(DomainEvents.recordedEvents()).to.be.empty
    })

    it("records domain events if recording is enabled", () => {
        DomainEvents.enableRecording()

        DomainEvents.recordThat("UserWasCreated")

        expect(DomainEvents.recordedEvents()).to.not.be.empty
    })

    it("erses recorded events", () => {
        DomainEvents.enableRecording()

        DomainEvents.recordThat("UserWasCreated")
        DomainEvents.recordThat("NotificationWasSent")

        DomainEvents.erseEvents()

        expect(DomainEvents.recordedEvents()).to.be.empty
    })
})
