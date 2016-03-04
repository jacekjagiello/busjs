"use strict";
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
var chai = require('chai');
var expect = chai.expect;
describe('Unit Tests:', function () {
    describe('2 + 4', function () {
        it('should be 6', function (done) {
            expect(2 + 4).to.equals(6);
            done();
        });
    });
});
