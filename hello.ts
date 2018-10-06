import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import Messages from './Messages';

const app = express(feathers());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.configure(express.rest());

app.use(express.errorHandler());

const messages = new Messages();

app.use('messages', messages);

app.listen(3000, async () => {
  await messages.create({text: 'Hello'});
  await messages.create({text: 'World'});
  console.log('listen on http://localhost:3000')
});

