const studentApi = require("../../datasets/students-api.json");
const fs = require('fs');


//add errorhandling
module.exports = {
    getStudents() {
        return new Promise((resolve, reject) => {
          resolve(studentApi);
        });
    }
}
