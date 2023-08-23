const kue = require('kue');
// const queue = kue.createQueue();
const queue = kue.createQueue({

    redis: "redis://default:LAHr7z7L2yNFA1kFEe77Tvmft45y47br@redis-11359.c283.us-east-1-4.ec2.cloud.redislabs.com:11359"
});



module.exports = queue;

