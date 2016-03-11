"use strict";
const chai = require('chai'),
    chaiAsPromised = require("chai-as-promised"),
    expect = require('chai').expect,
    geoLocationService = require('../src/services/geolocation-service'),
    settings = require('../settings');


chai.use(chaiAsPromised);

describe('geolocation-service', (done) =>{
    it('should return object with latitude and longitude', (done) =>{
        geoLocationService.getPosition('uppsala').then((position) =>{
            expect(position).to.be.an('object');
            expect(position).to.have.property('lat');
            expect(position).to.have.property('lng');
            expect(position.lat).not.to.equal(undefined);
            expect(position.lng).not.to.equal(undefined);
            done();
        },(err) =>{
            console.log(err);
            done();
        });
    });
    
    it('should return object default values from settings file', (done) =>{
        geoLocationService.getPosition('')
        .then((position) =>{
            expect(position).to.be.an('object');
            expect(position).to.have.property('lat');
            expect(position).to.have.property('lng');
            expect(position.lat).not.to.equal(undefined);
            expect(position.lng).not.to.equal(undefined);
            expect(position.lat).to.equal(settings.defaultLatitude);
            expect(position.lng).to.equal(settings.defaultLongitude);
            done();
        },(err) =>{
            console.log(err);
            done();
        });
       
    });
});
