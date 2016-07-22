
import {getId} from "./utils";

export class Streams {

    constructor(data) {

          this.streams = data;

    }

    getStreams(username, callback){


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
