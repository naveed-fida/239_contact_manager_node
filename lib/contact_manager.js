const fs = require('fs');
const path = require('path');
const stringify = require('json-beautify');
const _ = require('underscore');

const DATA_FILE = path.join(__dirname, '../data/contacts.json');

const contactManager = {
  getAll: function(cb) {
    let data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  },

  add: function(contact) {
    let data = fs.readFileSync(DATA_FILE, 'utf-8');
    let collection = JSON.parse(data);
    let newContact = this.createContact(contact);

    collection.push(newContact);
    this.write(collection);

    return newContact;
  },

  remove: function(contactId) {
    let data = fs.readFileSync(DATA_FILE, 'utf-8');
    let collection = JSON.parse(data);
    let newCollection;
    if (_.pluck(collection, 'id').includes(contactId)) {
      newCollection = collection.filter(contact => contact.id !== contactId);
      this.write(newCollection);
      return true;
    } else {
      return false;
    }
  },

  update: function(id, contact) {

  },

  generateId: function() {
    let data = fs.readFileSync(DATA_FILE, 'utf-8');
    let collection = JSON.parse(data);

    var maxId = collection.reduce(function(prevMax, contact) {
      return contact.id > prevMax ? contact.id : prevMax;
    }, 0);

    return maxId + 1;
  },

  write: function(collection) {
    fs.writeFileSync(DATA_FILE, stringify(collection, null, 2));
  },

  createContact: function(contact) {
    let newContact = Object.assign({}, {id: this.generateId()}, contact);
    return newContact;
  }
};

console.log(contactManager.remove(4));
console.log(contactManager.getAll());
module.exports = contactManager;
