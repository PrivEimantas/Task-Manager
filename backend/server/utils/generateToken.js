const jwt = require('jsonwebtoken');
 //replace "eimnantas" with an actual token from .env file, for some reason it cant read it right now
const generateToken = (id) => {
    return jwt.sign({id},"eimantas",{
        expiresIn:'1d',
    });
};

module.exports = generateToken;