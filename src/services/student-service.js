const studentFile = require("../../datasets/students.json");
const fs = require('fs'),
config = JSON.parse(fs.readFileSync('./config.json'));

module.exports = {
  
  find_by_username(username) {
    return new Promise((resolve, reject) => {
      studentFile.forEach((student)=>{
        if(student.services.github === username){
          resolve(student);
        }else{
          //if student can't be found set default city from config
          resolve({city:config.defaultCity});
        }
      });
    });
  }
};
