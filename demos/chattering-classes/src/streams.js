
import {getId} from "./utils";

export class MockStreams {

    constructor() {
      this.streams = [{id: getId(), name: 'CoE Java Valencia', users: ['angelina', 'juanito']},
                      {id: getId(), name: 'Recetas para vagos', users: ['angelina', 'juanito']}];
    }

    getStreams(username){

        return this.streams.filter(s => {
          return s.users.filter(u => u === username).length > 0;
        });
    }
  }
