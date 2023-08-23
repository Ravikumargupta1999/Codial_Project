const kue = require('kue');
// const queue = kue.createQueue();
const queue = kue.createQueue({

    redis: "redis://default:099NSvjA3rjrKfiyRzs6dMQmNEU7q83j@redis-15202.c52.us-east-1-4.ec2.cloud.redislabs.com:15202"
});



module.exports = queue;

