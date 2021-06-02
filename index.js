const express = require('express');
const app = express();
const PORT = 5000;
const jwt = require('jsonwebtoken')
const secret =  "hAPPysumER";

app.use(express.json());

// create token and send back to client
app.post('/sign-token', (req, res) => {
    //payload
    //secret
    //expiry time
    if (!req.body.firstName || !req.body.lastName || !req.body.id ) {
        return res.status(500).json({message: "First name, last name, and id are required"})
    }
    const payload = {
        username: req.body.username,
        id: req.body.id,
    };
    const expiry = 36000;
    jwt.sign(payload, secret, {expiresIn: expiry}, (err, token) => {
        if (err) {
            return res.status(500).json({err})
        } else
            return res.status(200).json({token})
    })
})


// receive token from client and decode
app.get('/decode-token', (req, res) => {
    console.log(req.headers)
    // pick authorization header
    if (!req.headers.authorization ) {
        return res.status(403).json({message: "authentication token is required"})
    }
    // extract token
    const splitStr = authHeader.split(" ");
    const token = splitStr[1];
    // decode token
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            return res.status(500).json({err})
        } else {
            return res.status(200).json({user: decodedToken})
        }
    
    })
})

app.listen(PORT, () => console.log("app started"))