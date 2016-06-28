
import fs from 'fs';
import assert from 'assert';
import {Status} from '../lib/status'

describe('Utility classes:', () => {
  describe('Result', () =>  {
    it('should be XXX', () => {

      //ssert.equal("beep", streams.beep);
    });
  });
});


describe('Chattering classes:', () => {
  describe('Status class', () =>  {
    it('should be OK or not OK', () => {

      let success = Status.OK({id:100, str:"Success"});
      let error = Status.Error(400, "Error generated");

      console.log(success);
      console.log(error);

      assert.deepEqual(success, {status: 200, result: {id:100, str:"Success"}});
      assert.deepEqual(error, {status: 400, error: "Error generated"});
    });
  });
});
