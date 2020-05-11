const {TOKEN} = require('./../config');

//const apiKey = "2abbf7c3-245b-404f-9473-ade729ed4653";

const authValidation = (req, res, next) => {
let token = req.headers.authorization;
if(!token){
    return res.status(401).end();
}

if(token !==`Bearer ${TOKEN}`){
    return res.status(401).end();
}
next();

 /*   if (!req.headers.authorization) {
        if (!req.query.apiKey) {
            if (!req.headers["book-api-key"]) {
                res.statusMessage = "Unauthorized, no API key sent";
                res.status(401).end();
            } 
        } else if (req.query.apiKey === TOKEN) {
            next();
        } else {
            res.statusMessage = "Invalid authorization key";
            return res.status(401).end();
        }
    } else if (req.headers.authorization === `Bearer ${TOKEN}`) {
        next();
    } else {
        res.statusMessage = "Invalid authorization key";
        return res.status(401).end();
    }*/
}

module.exports = authValidation;