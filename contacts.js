const fs = require("fs/promises")
const contactPath = require("./db/filePath");
const { v4 } = require("uuid");
const getContactList = require("./getListContacts.js");

const getContactById = async (id) => {
    const contacts = await getContactList()
    const findedContact = contacts.find(contact => contact.id === id);
        if (!findedContact) {
            return null;
        }
    return findedContact;
}    

const removeContact = async (id) => {
    const contacts = await getContactList()
    const idx = contacts.findIndex(item => item.id === id);
        if (idx === -1) {
            return null;
        }
    const newContacts = contacts.filter((_, index) => index !== idx);
        await updateContacts(newContacts)
    return contacts[idx];
}

const updateContacts = (data) => {
    fs.writeFile(contactPath, JSON.stringify(data));
}

const addContact = async (name, email, phone) => {
    const contacts = await getContactList()
    const newContact = { name, email, phone, id: v4() };
    contacts.push(newContact);
    await updateContacts(contacts);

    return newContact;
}

module.exports = {getContactById,removeContact, addContact};