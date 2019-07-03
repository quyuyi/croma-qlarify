import { Mongo } from 'meteor/mongo';

export default Instances = new Mongo.Collection('instances');

/*
Instances.schema = new SimpleSchema({
    text:{
        type: String,
        label: "text",
    },
    label:{
        type: String,
        label: "Pos or Neg",
    },
    createdAt:{
        type:Date,
        label:"Created At",
    }
});
*/