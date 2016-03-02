"use strict";
const fs = require('fs');

class User {

    constructor(usernames, city, lat, lng) {
        this._usernames = usernames;
        this._city = city === null ? 'Kalmar' : city;
        this._lat = lat === null ? '56.665954': lat;
        this._lng = lng === null ? '16.356824' : lng;       
    }
    
    set usernames(value) {
        if (!value) {
          throw Error('There must be at least one username');
        }
        this._usernames = value;
    }
    
    set city(value) {
        if (!value) {
          throw new Error('City must have a value');
        }
        this._city = value;
    }
    
     set lat(value) {
        if (!value || typeof value !== 'number') {
          throw new Error('Latitude must have a numeric value');
        }
        this._lat = value;
    }
    
     set lng(value) {
        if (!value || typeof value !== 'number') {
          throw new Error('Longitude must have a numeric value');
        }
        this._lng = value;
    }
    
    static saveUsers(students){
        console.log("går in i denna");    
        let path = __dirname+'/../../datasets/students.json';
        
        //added som arguments to prettify JSON (null, 4)
        fs.writeFile(path, JSON.stringify(students, null, 4), (error)=>{
             if (error) {
               console.error("write error:  " + error.message);
             } else {
               console.log("Successful Write to " + path);
             }
        });
        
    }
}

module.exports = User;