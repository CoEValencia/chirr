import express from 'express';
import bodyparser from 'body-parser';

import {Status} from '../lib/status';
import {MockUsers} from '../lib/users';
import {MockSessions} from '../lib/sessions';
import {MockStreams} from '../lib/streams';

let app = express();
app.use(bodyparser.json());

let users = new MockUsers();
let sessions = new MockSessions();
let streams = new MockStreams();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/', (req, res) => {
    let json = req.body;
    console.log(typeof json);
    res.send({
        id: 100,
        text: 'Hello World',
        data: json
    });
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

let with_session = (req, res, handler) => {

  let username = sessions.getSession(req.headers['auth-token']);
  if (username) {

      let result = handler(username);
      res.status = result.Status;
      res.send(result);

  } else {
      Status.sendError(res, 403, 'Not authenticated or not authorized');
  }
};

app.get('/streams', (req, res) => {
  return with_session(req, res, (username)=>{

    let result = streams.getStreams(username);
    return Status.OK(result);

  });
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}
