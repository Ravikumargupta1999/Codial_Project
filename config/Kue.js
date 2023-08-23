const kue = require('kue');
// const queue = kue.createQueue();


var queue = kue.createQueue({
    redis: 'redis://red-cjj1dnocfp5c73ch4pm0:6379'
  });
module.exports = queue;

