import {getId} from "./utils";

export class Users {


    constructor(data) {
      this.data = data;
    }

    //login(userid, password) -> Either (Error, token)`
    login(userid, password) {
        let user= this.accounts[userid];
        return (user && (user.password === password));
    }

    //register(username, registerData) -> Either (Error, OK)`
    register(username, fullname, password) {

        if (!username || !password || !fullname) {
            return [false, 'Username, Full name and/or password can´t be empty'];
        }

        if (this.accounts.hasOwnProperty(username)) {
            return [false, 'User exists'];
        }

        this.accounts[username] = {
                     username: username,
                     fullname: fullname,
                     password: password
                   };

        return [true, "OK"];
    }

}
