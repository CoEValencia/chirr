
import fs from 'fs';
import assert from 'assert';
import {Status} from '../lib/status';
import {MockUsers} from '../lib/users';

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

      assert.deepEqual(success, {status: 200, result: {id:100, str:"Success"}});
      assert.deepEqual(error, {status: 400, error: "Error generated"});
    });
  });

  describe('User class', () =>  {

    it('should be correcly registering & authenticating', () => {

      let users = new MockUsers();

      let res = users.login('angelina', 'moped');
      assert.ok(res);

      res = users.login('angelina', '_NOTmoped');
      assert.ifError(res);

      res = users.login('felix', 'car');      
      assert.ifError(!!res);

      let res2 = users.register('felix' /*, undefined*/);
      assert.deepEqual(res2, [false, 'User and/or password can´t be empty']);

      res2 = users.register('angelina', 'car');
      assert.deepEqual(res2, [false, 'User exists']);

      res2 = users.register('felix', 'car');
      assert.deepEqual(res2, [true, 'OK']);

      res2 = users.login('felix', 'car');
      assert.ok(res2);

    });
  });

});
