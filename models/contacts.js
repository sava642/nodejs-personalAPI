const fs = require('fs/promises')
const path = require("path");
const { customAlphabet } = require("nanoid");
const newId = customAlphabet("1234567890", 10);
const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const list = JSON.parse(data);
  return list;
}

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const contact = data.filter((contact) => contact.id === contactId);
    return contact;
    
  } catch(error) {
    console.error(error.message);
  }
  
}
const addContact = async (name, email, phone) => {

  const newContact = { id: Number(newId()), name, email, phone, };

  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(data);

    const contacts = [...parsedContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return contacts; 
   
  } catch (error) {
    console.error(error.message);
  }

};


const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const filteredContacts = contacts.filter((contact) => contact.id != contactId);
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    
    return filteredContacts;
    
  } catch (error) {
    console.error(error.message);
  }
}



const updateContact = async (contactId, body) => {
  const newContact = {...body};
  const data = await listContacts();
  data.forEach((element) => {
    if (element.id === contactId) {
      element = newContact;
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
