const path = require('path');
const express = require('express');
const users = require('./routes/users');
const app = express();
const consolidate = require('consolidate');

app.engine('html', consolidate.mustache);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use('/', express.static(path.join(__dirname, 'public'), {index: 'login.html'}));
app.use('/users', users);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.text());

app.listen(3000, function (){
   console.log('Server listening on port 3000!');
});