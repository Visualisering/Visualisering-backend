const students = require("../../datasets/students");

module.exports = {
  students() {
    return new Promise((resolve, reject) => {
      resolve(students);
    });
  },
  find_by_username(username) {
    return new Promise((resolve, reject) => {
      resolve(students.find(o => o.username === username));
    });
  }
};
