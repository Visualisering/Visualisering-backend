const studentFile = require("../../datasets/students.json");
const fs = require('fs');

module.exports = {
  
  find_by_username(username) {
    //console.log("inne i studentservice" +username); denna fungerar
    return new Promise((resolve, reject) => {
      studentFile.forEach((student)=>{
        if(student.services.github === username){
          resolve(student);
        }else{
          //default värde om studenten inte finns
        }
      });
    });
  }
};
