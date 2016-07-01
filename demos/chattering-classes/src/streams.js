
import {getId} from "./utils";

export class MockStreams {

    constructor() {
      this.streams = [{id: getId(), name: 'CoE Java Valencia', users: ['angelina', 'juanito'],
                      flows: [{id:getId(), name: null}, {id:getId(), name: "Hackathon Chirr"}, {id:getId(), name: "Jornada intensiva"}]},
                      {id: getId(), name: 'Recetas para vagos', users: ['angelina', 'juanito'],
                      flows: [{id:getId(), name:null}]}];
    }

    getStreams(username){

        return this.streams.filter(s => {
          return s.users.filter(u => u === username).length > 0;
        });
    }

    getFlows(streamId){
      // streams.getFlows(str[0].id);
      let res = this.streams.find(e => e.id == streamId);

      if (res){
        return res.flows;
      } else {
        return false;
      }
    }
  }
