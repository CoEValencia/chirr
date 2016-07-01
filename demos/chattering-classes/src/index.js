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
            let result = handler(req, res, username);
            res.status = result.Status;
            res.send(result);
        } else {
            Status.sendError(res, 403, 'Not authenticated or not authorized');
        }
      });
    };
};

let on_get = session_aware_method(app, app.get);
let on_post = session_aware_method(app, app.post);

on_get('/streams', (req, res, username) => {

  let result = streams.getStreams(username);
  return Status.OK(result);
});




/* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}
