import {NotFound} from '@feathersjs/errors'

type Message = {
  id: number,
  text: string
}
export default class Messages {
  messages: Message[] = [];
  currentId = 0;

  async find(params?: any) {
    // Return the list of all messages
    return this.messages;
  }

  async get(id: string, params?: any) {
    // Find the message by id
    const message = this.messages.find(message => message.id === parseInt(id, 10));

    // Throw an error if it wasn't found
    if (!message) {
      throw new NotFound(`Message with id ${id} not found`);
    }

    // Otherwise return the message
    return message;
  }

  async create(data: {text: string}, params?: any) {
    // Create a new object with the original data and an id
    // taken from the incrementing `currentId` counter
    const message = Object.assign({
      id: ++this.currentId
    }, data);

    this.messages.push(message);

    return message;
  }

  async patch(id: string, data: {text: string}, params?: any) {
    // Get the existing message. Will throw an error if not found
    const message = await this.get(id);

    // Merge the existing message with the new data
    // and return the result
    return Object.assign(message, data);
  }

  async remove(id: string, params?: any) {
    // Get the message by id (will throw an error if not found)
    const message = await this.get(id);
    // Find the index of the message in our message array
    const index = this.messages.indexOf(message);

    // Remove the found message from our array
    this.messages.splice(index, 1);

    // Return the removed message
    return message;
  }
}
