const socket = io('http://localhost:3000');

const app = feathers();

app.configure(feathers.socketio(socket));

app.service('messages').on('created', message => {
  console.log('Someone created a message', message);
});

async function createAndList() {
  await app.service('messages').create({
    text: 'Hello from Feathers browser client'
  });

  const messages = await app.service('messages').find();

  console.log('Messages', messages);
}

createAndList();
