import { Mongo } from 'meteor/mongo';

export default Heuristics = new Mongo.Collection('heuristics');

/*
Instances.schema = new SimpleSchema({
    heuristic:{
        type: String,
        name:"Keyword",
    },
    label:{
        type: String,
        name: "Pos or Neg",
    },
});
*/
