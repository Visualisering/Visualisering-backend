const studentFile = require("../../datasets/students.json");
const fs = require('fs');

module.exports = {
  find_by_username(username) {
    return new Promise((resolve, reject) => {
      studentFile.forEach((student)=>{
        if(student.services.github === username){
          resolve(student);
        }
      });
    });
  }
};
