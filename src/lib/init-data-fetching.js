const updateStudentService = require('../service/update-student-service.js');
const schedule = require('node-schedule');

module.exports = {
    init(){
        console.log('init');
      schedule.scheduleJob('/4 * * * * *',()=>{
          console.log('scheduling...');
                updateStudentService.getStudents().then(function(data){
                    console.log(data);
                });
      });
    }
}
var j = schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, function(){
  console.log('Time for tea!');
});