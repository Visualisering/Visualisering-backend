"use strict";
const geoLocationApiAddress = 'http://nominatim.openstreetmap.org/search?format=json&city=';
const request = require('request');

module.exports={
    getLatLong(city){
        return new Promise(function (resolve, reject) {
          
          let position = {
              lat: undefined,
              lng: undefined
          }
            request.get(geoLocationApiAddress+encodeURI(city), function (err, res) {
                if(err){
                    reject(err.statusCode);
                }
                let content = JSON.parse(res.body);
                content.forEach((searchResult)=>{
                    if(searchResult.type === 'city'){
                        position.lat = searchResult.lat;
                        position.lng = searchResult.lon;
                        resolve(position);
                    }
                });
                resolve(null);
            });
        });
    }}
