const express = require('express');
const path = require('path');
const config = require('../config');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Express' });
  res.sendFile(path.join(config.project_dir+'/views/index.html'));
});

module.exports = router;
