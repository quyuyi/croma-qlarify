import { Mongo } from 'meteor/mongo';

export default Examples = new Mongo.Collection('examples');

// MONGO_URL= mongodb://user1:user111@ds351987.mlab.com:51987/heroku_vbl2phnb;
// in terminal
// SET MONGO_URL=mongodb://localhost:27017/databasename
// meteor run