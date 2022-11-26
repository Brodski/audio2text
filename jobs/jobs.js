var cron = require('node-cron');

// https://www.atatus.com/tools/cron
cron.schedule('0 0 * *  * *', () => { // every hour (at sec=0, min=0)
    console.log('running every 1 hour');
});

module.exports = cron