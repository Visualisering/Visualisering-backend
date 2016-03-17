 "use strict";
 const fs = require('fs'),
       path = './src/cache/commits.json';

 module.exports = {
  
/*==============================================================================
checks when cache was updated last time. Result is used in:
See /services/getcommits-service
==============================================================================*/ 
     getLatestModified() {
      return new Promise((resolve, reject) => {
          fs.stat(path, (error, stats) => {
              if (error) {
                  reject(error);
              }else {
                  resolve(stats.mtime);
              }
          });
     });
   }
 };