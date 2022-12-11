const contacts = require("./contacts");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --contactId <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, contactId, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactList = await contacts.listContacts();
      console.table(contactList);
      break;

    case "get":
      const oneContact = await contacts.getContactById(contactId);
      console.table(oneContact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.table(newContact);
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(contactId);
      console.table(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({ action: "list" });
// invokeAction({ action: "get", contactId: "2" });
// invokeAction({
//   action: "add",
//   name: "Valentina Lie",
//   email: "valent@gmail.com",
//   phone: "(098) 222-0869",
// });
// invokeAction({ action: "remove", contactId: "123" });
// invokeAction({ action: "get", contactId: "9" });

// invokeAction(argv);
// const actionIndex = precess.argv.indexOf("--action");
// if (actionIndex !== -1) {
//   const action = process.argv[actionIndex + 1];
//   invokeAction({ action });
// }

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
invokeAction(argv);
