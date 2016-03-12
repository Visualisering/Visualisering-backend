const settings = require('../../settings'),
      studentFile = require('../../datasets/students.json');

/*==============================================================================
This module check to see if committers username is defined in 
datasets/student.json. If it is defined it resolves that students city.
If not defined it resolves default values defined i settings file.
==============================================================================*/
module.exports = {
  find_by_username(username) {
    return new Promise((resolve, reject) => {
      studentFile.forEach((student) => {
        if (student.services.github === username) {
            resolve(student);
        }
      });
      //if student can't be found set default city from config
      resolve({
        city: settings.defaultCity
      });
    });
  }
};
