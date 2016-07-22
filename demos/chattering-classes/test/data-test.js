import fs from 'fs';
import assert from 'assert';
import Data from '../lib/data';

let data = new Data(); /* withouth parameters means in-memory */

describe('Data classes:', () => {
    describe('Result', () => {
        it('should add and retrieve new streams', (done) => {

          data.addStream('angelina', 'FIRST', (err, stream) => {
            assert.ifError(err);

            assert.ok(stream._id);
            assert.equal(stream.owner, 'angelina');
            assert.equal(stream.name, 'FIRST');

            data.getStream(stream._id, (err, stream2) => {
                assert.ifError(err);
                assert.deepEqual(JSON.stringify(stream), JSON.stringify(stream2));
                assert.ok(!stream.flows[0].name);

                stream2.name = "SECOND";
                data.updateStream(stream2, (err, updated) => {
                  assert.ok(updated);

                  data.getStreamsByUser('angelina', (err, streams) => {
                    assert.deepEqual(JSON.stringify(stream2), JSON.stringify(streams[0]));
                    done();
                  });
                });
            });
          });
          //assert.ok(true);
          //ssert.equal("beep", streams.beep);
        });
    });
});
