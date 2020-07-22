var db = require('../config.js');
var Photos = require('../models/photos.js');

var Photos = new db.Collection();

Photos.model = Photos;

module.exports = Photos;