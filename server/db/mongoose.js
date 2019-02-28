let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })
.then(() => { 
    return console.log('connected to mongodb');
})
.catch(err => { 
    console.error('App starting error:', err.stack);
    process.exit(1);
});
module.exports = {mongoose};