// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

const { json } = require("express");

const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
method: 'GET',
headers: {
'Accept': 'application/json'
}
}

/* GET travel view */
const travel = async function(res, req, next) {

    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            let message = null;
            if(!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else {
                if(!json.length){
                    message = 'No trips exist in our database!';
                }
            } 
            res.render('travel', {title: 'Travlr Gateways', trips: json, message});
        })
        .catch(err => res.status(500).send(e.message));
};

module.exports = {
    travel
};