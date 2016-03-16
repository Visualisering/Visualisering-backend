"use strict";
const studentFile = require('../../datasets/students.json'),
      getCommitsService = require("../services/getcommits-service");


/*==============================================================================
This module checks to see if committers username is defined in 
datasets/student.json. If it is defined it resolves that students city.
If not it checks if user has specified location in github account.
==============================================================================*/

module.exports = {
  find_by_username(username) {
    return new Promise((resolve, reject) => {
      studentFile.forEach((student) => {
        if (student.services.github === username) {
            resolve(student);
        }
      });
      //if user can't be found among students, get location from github-profile
      resolve(getCommitsService.getUserLocation(username));
    });
  },

};