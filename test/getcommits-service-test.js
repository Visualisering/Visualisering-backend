"use strict";
const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = require('chai').expect,
    getcommitsService = require('../src/services/getcommits-service'),
    settings = require('../settings');


chai.use(chaiAsPromised);

describe('getcommits-service', () =>{
    it('latestCommits() should return an array response with correct properties', (done) =>{
        getcommitsService.latestCommits(settings.testOwner, settings.testRepo)
        .then((response) =>{
             try {
                expect(response).to.be.an('array');
                response.map((commit) =>{
                    expect(commit).to.have.property('committer');
                    expect(commit).to.have.deep.property('sha');
                    expect(commit).to.have.deep.property('committer.login', snode apettings.testOwner);
                });
                done();
             } catch(x){
                done(x);
             }
        });
    });
    
    it('getCommitInfo() should return object with info for one specific commit', (done) =>{
        getcommitsService.latestCommits(settings.testOwner, settings.testRepo)
        .then((commitInfo) =>{
            getcommitsService.getCommitInfo(settings.testOwner, settings.testRepo, commitInfo[0].sha)
            .then((specificCommit) =>{
                try {
                        expect(specificCommit).to.be.an('object');
                        expect(specificCommit).to.have.property('files');
                        done();
                 } catch(x){
                        done(x);
                 }
            });
        });
    });
    
    
});
