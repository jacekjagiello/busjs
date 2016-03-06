import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import EnableRecordingDomainEvents from 'src/Middlewares/EnableRecordingDomainEvents'

chai.should()
chai.use(sinonChai)

describe('EnableRecordingDomainEvents middleware', () => {

    let self = {}
    let domainEvents = { enableRecording: () => {}, disableRecording: () => {} }

    it("enables domain events recording", () => {
        let enableRecording = sinon.spy(domainEvents, 'enableRecording')

        let sut = new EnableRecordingDomainEvents(domainEvents)

        sut.handle({name: 'CreateUser'}, () => {})

        enableRecording.restore()
        enableRecording.should.have.been.calledOn(sut.domainEvents)
    })

    it("calls next middleware", () => {
        let command = {name: 'CreateUser'}
        let nextMiddleware = sinon.spy()

        let sut = new EnableRecordingDomainEvents(domainEvents)

        sut.handle(command, nextMiddleware)

        nextMiddleware.should.have.been.calledWith(command)
    })

    it("disable recording domain events when error occured", () => {
         let disableRecording = sinon.spy(domainEvents, 'disableRecording')

         let sut = new EnableRecordingDomainEvents(domainEvents)

         expect(sut.handle.bind(sut, {name: 'CreateUser'}, () => { throw new Error() })).to.throw(Error)

         disableRecording.restore()
         disableRecording.should.have.been.calledOn(sut.domainEvents)
     })

     it("it disable recording domain events when all middlewares was called", () => {
         let message = {name: 'CreateUser'}
         let disableRecording = sinon.spy(domainEvents, 'disableRecording')
         let nextMiddleware = sinon.spy()

         let sut = new EnableRecordingDomainEvents(domainEvents)

         sut.handle(message, nextMiddleware)

         disableRecording.restore()
         nextMiddleware.should.have.been.calledWith(message)
     })
})
