const studentFile = require("../../datasets/students.json");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));

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
