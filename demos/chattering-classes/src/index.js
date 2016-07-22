import express from 'express';
import bodyparser from 'body-parser';

import {Status} from '../lib/status';
import {MockUsers} from '../lib/users';
import {MockSessions} from '../lib/sessions';
import {MockStreams} from '../lib/streams';

let app = express();
app.use(bodyparser.json());

app.use(express.static('public'));

//let users = new MockUsers();
//let sessions = new MockSessions();
//let streams = new MockStreams();

app.get('/version', (req, res) => {

  //res.send('{"version":"1.4.0", "url":"http://localhost:3000/download/dijkstra.jpg"}');
  res.send('{"version":"0.9.9", "url":"http://localhost:3000/download/devcon.jar"}');
});


app.post('/login', (req, res) => {
    let data = req.body;
    if (users.login(data.username, data.password)) {

      let token = sessions.createSession(data.username);
      Status.sendOK(res, {token: token});

    } else {
        Status.sendError(res, 410, "Invalid user or password");
    }
});

app.post('/register', (req, res) => {
    let data = req.body;
    let [status, msg] = users.register(data.username, data.password, data.name);

    if (status) {
        Status.sendOK(res);
    } else {
        Status.sendError(res, 422, `Unprocessable entity because: ${msg}`);
    }
});

let session_aware_method = (app, method) => {

    return (url, handler) => {
      method.call(app, url, (req, res) => {

        let username = sessions.getSession(req.headers['auth-token']);
        if (username) {
            handler(req, res, username, (err, status)=>{
              if(err){
                  Status.sendError(res, 500, err);
              } else if (status){
                  res.status = status.status;
                  res.send(status);
              }
            });
        } else {
            Status.sendError(res, 403, 'Not authenticated or not authorized');
        }
      });
    };
};

let on_get = session_aware_method(app, app.get);
let on_post = session_aware_method(app, app.post);

on_get('/streams', (req, res, username) => {

  let result = streams.getStreamsByUsers(username, (err, streams, done) => {
      done(Status.OK(streams));
  });
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}
