

export class MockUsers {


  constructor(){

      this.accounts = {
        'angelina': 'moped',
        'juanito':'bici'
      };
  }

  //login(userid, password) -> Either (Error, token)`
  login(userid, password){
      let pwd = this.accounts[userid];
      return (pwd && (pwd === password));
  }

  //register(username, registerData) -> Either (Error, OK)`
  register(username, password, name){

      if(!username || !password ){
        return [false, 'Username, Full name and/or password can´t be empty'];
      }

      if(this.accounts.hasOwnProperty(username)){
        return [false, 'User exists'];
      }

      this.accounts[username] = password;

      return [true, "OK"];
  }

}
