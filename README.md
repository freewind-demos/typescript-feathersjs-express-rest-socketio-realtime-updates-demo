TypeScript Feathersjs Express Rest Demo
=======================================

```
npm install
npm run demo
```

Then visit http://localhost:3000/messages and all kinds of rest requests of it

```
brew install httpie
http http://localhost:3000/messages
http POST http://localhost:3000/messages text=hello
http PUT http://localhost:3000/messages/0 text=hello000
http DELETE http://localhost:3000/messages/0
```
