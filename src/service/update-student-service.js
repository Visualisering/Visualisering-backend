const studentApiPath = "../../datasets/students-api.json";
const studentApi = require("../../datasets/students-api.json");
const students = require("../../datasets/students.json");
const fs = require('fs');

module.exports = {
getStudents() {
//if student-api is available, exchange code below to api-request instead.
        console.log(students);
    fs.statSync(studentApiPath, function(err, stat) {
       return new Promise((resolve, reject) => {
            if (err) {
                if ('ENOENT' === err.code) {
                    reject('file does not exist');
                }
            }
            if (stat.size === 0) {
                reject('file is empty');
            }
            else {
                resolve(studentApi);
            }
        });
    });
}



}
