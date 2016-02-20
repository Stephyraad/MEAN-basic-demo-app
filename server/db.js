var moongoose = require('moongoose');
require('../models/Posts');
require('../models/Comments');

moongoose.connect('mongodb://localhost/local');
