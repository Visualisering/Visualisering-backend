"use strict";
const   cities = require("../../datasets/cities.json"),
        getCommitsService = require("./getcommits-service"),
        fs = require('fs'),
        settings = require('../../settings'),
        request = require('request');



/*==============================================================================
Helper function that checks if city is defined in datasets/cities.json
==============================================================================*/
function checkCityExist(city){
    return new Promise((resolve, reject) => {
        resolve(cities.find(c => c.city === city));
    });
}

/*==============================================================================
Helper function that saves city to datasets/cities.json 
if it's not already defined
==============================================================================*/
function saveCity(cityObj){
    return new Promise((resolve,reject) =>{
        let newCityArray = cities;
        newCityArray.push(cityObj);

        fs.writeFile("./datasets/cities.json", JSON.stringify(newCityArray, null, 4), (error) => {
            if(error) {
                reject(error);
            }
        }); 
        resolve();
    });
}

/*==============================================================================
Helper function that sends request with city to open street map api and 
hopefully gets latitude and longitude back. If it doesn't return a position
it will resolve a cityobject with default values defined in settings file.
==============================================================================*/
function getGeoLocationFromApi(city){         
    return new Promise((resolve,reject) =>{
        request.get(settings.geoentry + encodeURI(city), (err, res) =>{
            if(err){
                resolve({
                    lat:settings.defaultLatitude, 
                    lng:settings.defaultLongitude
                });
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
            //default values from settings file
            resolve({
                lat:settings.defaultLatitude, 
                lng:settings.defaultLongitude
            });
        });
    });
}

module.exports = {

/*==============================================================================
getPosition() takes a city as parameter and resolves a 
committers position (latitude and longitude). 
Defaults to values defined in settings file if position can't be found.
==============================================================================*/
    
    getPosition(city){
        return new Promise((resolve, reject) =>{
            //checks if city already is defined in datasets/cities.json
            checkCityExist(city)
            .then((cityObject) =>{
                if(cityObject !== undefined){
                    resolve(cityObject);
                }
                //if city doesn't exist get lat and long
                //from open street map
                resolve(getGeoLocationFromApi(city));
            });
        });
    },
};


  
        

        
