"use strict";
const cities = require("../../datasets/cities.json"),
      fs = require('fs'),
      config = JSON.parse(fs.readFileSync('./config.json')),
      request = require('request');


   
function checkCityExist(city){
    return new Promise((resolve, reject) => {
        resolve(cities.find(c => c.city === city));
    });
}

function saveCity(cityObj){
    return new Promise((resolve,reject) =>{
        let newCityArray = cities;
        newCityArray.push(cityObj);

        fs.writeFile("./datasets/cities.json", JSON.stringify(newCityArray, null, 4), (err) => {
            if(err) {
                reject(err);
            }
        }); 
        resolve();
    });
}

function getGeoLocationFromApi(city){         
        return new Promise(function(resolve,reject){
            request.get(config.geoentry + encodeURI(city), function (err, res) {
                if(err){
                    reject(err.statusCode);
                }
                let content = JSON.parse(res.body);
                content.forEach((searchResult) =>{
                    if(searchResult.type === 'city'){
                        saveCity({city:city, lat:searchResult.lat, lng:searchResult.lon})
                            .then(() =>{
                             resolve({
                                    lat:searchResult.lat, 
                                    lng:searchResult.lon
                                });
                        });
                    }
                });
                //if city not found resolve
                //default values from config file
                resolve({
                    lat:config.defaultLatitude, 
                    lng:config.defaultLongitude
                });
            });
        });
    }

module.exports = {
    getPosition(city){
        return new Promise(function (resolve, reject) {
            checkCityExist(city).then((cityObject) =>{
                if(cityObject === undefined){
                    resolve(getGeoLocationFromApi(city));
                }else{
                    resolve(cityObject);
                }
               
            });
        });
    },
 

};


  
        

        
