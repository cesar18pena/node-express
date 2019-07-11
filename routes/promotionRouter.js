const express = require('express');

const promotionRouter = express.Router();

promotionRouter.use(express.json());

promotionRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotions to you!');
})
.post((req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});

promotionRouter.route('/:id')
.all((req, res, next) => {
  res.writeHead(200, {
    'ContentType': 'text/plain'
  });
  next();
})

.get((req, res, next) => {
  res.end('Get promotion: ' + req.params.id);
})

.put((req, res, next) => {
  res.write('Updating promotion ' + req.params.id);
  res.end('Updated promotion ' + req.body.name + ' with detail ' + req.body.description);
})

.delete((req, res, next) => {
  res.end('Deleting promotion: ' + req.params.id);
});

module.exports = promotionRouter;
