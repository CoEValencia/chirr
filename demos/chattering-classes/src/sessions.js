
import {getId} from "./utils";

export class MockSessions {

    constructor() {
        this.sessions = {};
    }

    createSession(username){
      let token = getId();
      this.sessions[token] = username;
      return token;
    }

    getSession(token){
        
        return this.sessions[token];
    }


  }
