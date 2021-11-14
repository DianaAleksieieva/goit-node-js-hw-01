const fs = require("fs/promises")
const contactPath = require("./db/filePath");

const getListContacts = async () => {
        const data = await fs.readFile(contactPath);
        const contacts = JSON.parse(data);
        return contacts;
}

module.exports = getListContacts;