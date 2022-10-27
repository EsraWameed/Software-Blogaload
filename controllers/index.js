//require router for pathing
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
//gives access to homeRoute and everything inside api route
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;

