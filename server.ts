import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';

const memory = require('feathers-memory');

const app = express(feathers());

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.configure(express.rest());

app.configure(socketio());
app.on('connection', conn => app.channel('everybody').join(conn));
app.publish(() => app.channel('everybody'));

// Notice: this must be under the configuration of socketio
app.use('messages', memory({
  paginate: {
    default: 10,
    max: 25
  }
}));

// Notice: order is important, should place at last
app.use(express.errorHandler());

app.listen(3000, async () => {
  console.log('listen on http://localhost:3000')
});

