"use strict";
const geoLocationApiAddress = 'http://nominatim.openstreetmap.org/search?format=json&city=';
const cities = require("../../datasets/cities.json");
const fs = require('fs');
const configFile = './config.json';
const config = JSON.parse(fs.readFileSync(configFile));
const request = require('request');

//kolla först om staden finns i filen annars hämta från
//openstreetmap och spara till fil
//returnera position
module.exports={
    getPosition(city){
        console.log(city);
        return new Promise(function (resolve, reject) {
            let position = {
              lat: undefined,
              lng: undefined
            };
            
            checkCityExist(city).then(function(cityObject){
                if(!cityObject){
                console.log(cityObject)
                }
            });
         
        });
    }
};

  function getCities() {
            return new Promise((resolve, reject) => {
              resolve(cities);
            });
         }
        
function checkCityExist(city){
            return new Promise((resolve, reject) => {
                resolve(cities.find(c => c.city === city));
            });
        }
        
function getGeoLocationFromApi(city){         
      
        return new Promise(function(resolve,reject){
            request.get(geoLocationApiAddress+encodeURI(city), function (err, res) {
                console.log(config.geoentry);
                if(err){
                    reject(err.statusCode);
                }
            let content = JSON.parse(res.body);
            content.forEach((searchResult)=>{
            if(searchResult.type === 'city'){
                resolve({lat:searchResult.lat, lng:searchResult.lon});
                    }
                });
                resolve(null);
            });
        });
        }