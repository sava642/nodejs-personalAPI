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

const getContactById = async (id) => {
  try {
    const data = await listContacts();
    const contact = data.find((contact) => contact.id === id);
    return contact;
    
  } catch(error) {
    console.error(error.message);
  }
  
}

const addContact = async (name, email, phone) => {
   
  try {
   
    const newContact = { id: Number(newId()), name, email, phone, };
    const data = await listContacts();
    const contacts = [...data, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts; 
   
  } catch (error) {
    console.error(error.message);
  }

};


const removeContact = async (id) => {
  try {
    
    const data = await listContacts();
    
    const removContacts = data.filter((contact) => contact.id != id);
    await fs.writeFile(contactsPath, JSON.stringify(removContacts));
    
    return removContacts;
     
  } catch (error) {
    console.error(error.message);
  }
}



const updateContact = async (id, body) => {
  const data = await listContacts();
  const idx = data.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  data[idx] = { ...body, id };
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return  data[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
