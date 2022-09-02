var cron = require('node-cron');

// cron.schedule('1,2,4,5 * * * *', () => {
cron.schedule('0 * *    * * *', () => {
//   console.log('running every minute ');
});

// https://www.atatus.com/tools/cron
cron.schedule('* 0 * *  * *', () => { // every 2 hours
    console.log('running every 1 hour');
});

  
cron.schedule('* 0 */2 *  * *', () => { // every 2 hours
    console.log('running every 2 hours');
});
module.exports = cron