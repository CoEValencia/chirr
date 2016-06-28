
export class Status {

  constructor(status, result){

      this.status = status;
      if (status == 200){
        this.result = result;
      }else {
        this.error = result;
      }
  }

  static OK(result){
    return new Status(200, result);
  }

  static Error(status, description){
    return new Status(status, description);
  }

  get Status () {
    return this.status;
  }

  get Description() {
    return this.description;
  }

  get Ok(){
      return this.status == 200;
  }
}
