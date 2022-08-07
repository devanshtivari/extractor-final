const express = require('express')
const {commonData , searchdata , login} = require('../controller/datacontroller');
const router = express.Router();
console.log("you are in rout")

router.get('/' , commonData);
router.get('/search' , searchdata);
router.post('/login' , login);

module.exports = router;