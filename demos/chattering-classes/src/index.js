import express from 'express';
import {Status} from '../lib/status';
import {MockUsers} from '../lib/users';
import bodyparser from 'body-parser';

let app = express();
app.use(bodyparser.json());

let users = new MockUsers();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/', (req, res) => {
  let json = req.body;
  console.log(typeof json);
  res.send({id:100,text:'Hello World', data: json});
});

app.post('/login', (req, res) => {
  let data = req.body;
  if (users.login(data.username, data.password)){
    Status.sendOK(res);
  } else {
    Status.sendError(res, 410, "Invalid user or password");
  }
});

app.post('/register', (req, res) => {
  let data = req.body;
  let [status, msg] = users.register(data.username, data.password, data.name);

  if (status){
    Status.sendOK(res);
  } else {
    Status.sendError(res, 422, `Unprocessable entity because: ${msg}`);
  }
});


/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
