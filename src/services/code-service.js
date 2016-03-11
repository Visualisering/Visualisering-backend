'use strict';
module.exports = {
    
    getCode(commitFiles){
        let testArray = [];
        return new Promise((resolve, reject) =>{
            commitFiles.map((item) => {
            testArray.push({
                    filename: item.filename, 
                    code: item.patch
                    
                });
            });
            resolve(testArray);
        }).then(() =>{
            
        });
    },
    
    pushCode(codeObject){

    }
};

/*.then((positions) => {
                        //here we ship all positions when promise.all 
                        //on line 21 i fullfilled
                        resolve(positions);
                        });
                    });
                });
        })).then((positionArrays) => {
        store.dispatch(actions.addLatestPositions(positionArrays));

        });*/