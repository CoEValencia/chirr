// Type 1: In‐memory only datastore (no need to load the database)
import Datastore from 'nedb';

export default class Data {

  constructor(dir){

    if (dir){
      /*
        NOT IMPLEMENTED

        don´t forget loadDatabase
      */
    } else {
      /* MOCK */
      this.streams = new Datastore();
      this.streams.ensureIndex({fieldName : 'owner'});
      this.streams.ensureIndex({fieldName : 'users'});

      this.users = new Datastore();
      this.msgs = new Datastore();

      this.users.addUser('angelina', 'Angelina Triste','moped');
      this.users.addUser('juanito', 'juanito Paquito', 'bici');


      /*this.streams = [{id: getId(), name: 'CoE Java Valencia', users: ['angelina', 'juanito'],
                      flows: [{id:getId(), name: null}, {id:getId(), name: "Hackathon Chirr"}, {id:getId(), name: "Jornada intensiva"}]},
                      {id: getId(), name: 'Recetas para vagos', users: ['angelina', 'juanito'],
                      flows: [{id:getId(), name:null}]}];
                      */

      //this.streams.addStream('angelina', 'CoE Java Valencia'

    }
  }

  getUser(username, callback){

      this.users.findOne({ username }, callback);
  }

  addUser(username, fullname, password, callback){
    this.users.insert({
      username,
      fullname,
      password
    }, callback);
  }

  updateUser(user, callback){

    this.streams.update({username: user.username}, user, {}, (err, num) => {
      if (err)
        callback(err);
      else
        callback(null, !!num);
    });
  }

  deleteUser(username, callback){
    this.users.remove({username}, false, (err, num) => {
      if (err)
        callback(err);
      else
        callback(null, !!num);
    });
  }

  getStreamsByUser(user, callback){

      this.streams.find({ 'users': {$elemMatch: user}}, (err, items) => {

          if (err)
            callback(err);
          else
            callback(null, items);
      });
  }

  getStream(streamid, callback){

      this.streams.findOne({ _id: streamid }, callback);
  }

  addStream(userid, name, callback){

    this.streams.insert({
        name,
        owner: userid,
        users: [userid],
        flows: [{
            name: null
        }]
    }, callback);
  }

  updateStream(stream, callback){
    this.streams.update({_id: stream._id}, stream, {}, (err, num) => {
      if (err)
        callback(err);
      else
        callback(null, !!num);
    });
  }

  deleteStream(stream, callback){
    this.streams.remove({_id: stream._id}, false, (err, num) => {
      if (err)
        callback(err);
      else
        callback(null, !!num);
    });
  }


}
