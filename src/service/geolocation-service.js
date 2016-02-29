"use strict";
const geoLocationApiAddress = 'http://nominatim.openstreetmap.org/search?format=json&city=';
const request = require('request');

module.exports={
    getLatLong(city){
        return new Promise(function (resolve, reject) {
          
            request.get(geoLocationApiAddress+encodeURI(city), function (err, res) {
                if(err){
                    reject(err.statusCode);
                }
                let content = JSON.parse(res.body);
                console.log(content);
                    
                resolve(content);
            });
        });
    }}
