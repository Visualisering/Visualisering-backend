"use strict";
let chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    request = require('superagent'),
    local = supertest('http://localhost:8080'),
    osm = supertest('http://nominatim.openstreetmap.org'),
    myApp = require('../app/app.js'),
    latlong = require('../app/latlong'),
    students = require('../app/students'),
    user = require('../app/models/User');


chai.use(chaiAsPromised);


describe('Testing routes', function () {
    let baseUrl = '/';
        it('should return a 200 response', function (done) {
            local.get(baseUrl)
            .set('Accept', 'application/json')
            .expect(200,done);
        });
});

