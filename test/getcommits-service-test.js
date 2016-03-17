"use strict";
const chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = require('chai').expect,
    getcommitsService = require('../src/services/getcommits-service'),
    settings = require('../settings');

//These tests should only be run when you have oauth token installed 
//or sent with you request otherwise you'll quickly run out of
//allowed requests per hour to github
//since travis runs tests automatically at pull request to gihub 
//this is inactivated
/*chai.use(chaiAsPromised);
    let oneDayAgo = undefined;
    beforeEach((done) =>{
        //make sure there are new commits within this timeframe
        //otherwise tests will fail
        oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        done();
    });


    describe('getcommits-service', () =>{
      it('latestCommits() should return an array response with correct properties', (done) =>{
            getcommitsService.latestCommits(settings.testOwner, settings.testRepo, oneDayAgo)
             .then((response) =>{
                  try {
                     expect(response).to.be.an('array');
                     response.map((commit) =>{
                         expect(commit).to.have.property('committer');
                         expect(commit).to.have.deep.property('sha');
                         expect(commit).to.have.deep.property('committer.login');
                    });
                    done();
                  } catch(x){
                     done(x);
                 }
            });
        });
    
    it('getCommitInfo() should return object with info for one specific commit', (done) =>{
        getcommitsService.latestCommits(settings.testOwner, settings.testRepo, oneDayAgo)
        .then((commitInfo) =>{
            getcommitsService.getCommitInfo(settings.testOwner, settings.testRepo, commitInfo[0].sha)
            .then((specificCommit) =>{
                try {
                    expect(specificCommit).to.be.an('object');
                    expect(specificCommit).to.have.property('files');
                    done();
                }catch(x){
                    done(x);
                }
           });
        });
    });
});*/
