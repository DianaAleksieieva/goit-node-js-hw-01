const contactsOperations = require("./contacts.js");
const getContactList = require("./getListContacts.js");

const argv = require('yargs').argv;

const invokeAction = async({ action, id, name, email, phone })=> {
    switch (action) {
        case 'list':
            const contacts = await getContactList()
            console.log(contacts);
            break;
    
        case 'get':
            const contact = await contactsOperations.getContactById(id);
            if(!contact){
                throw new Error(`Product with id=${id} not found`);
            }
            console.log(contact);
            break;
        case 'add':
           const newContacts = await contactsOperations.addContact(name, email, phone);
            console.log(newContacts);
            break;
        case 'remove':
            const removeContact = await contactsOperations.removeContact(id);
            console.log(removeContact);
            break;
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);