const app = require('./app')


app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})



const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const { HOST_URI } = process.env;

async function main() {
  try {
   
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful")

    } catch (error) {
    console.error("Error while connecting to mongodb", error.message);
    process.exit(1)
  }
  
}
main()


  
/* Add new contact*/
    // const savedContacts = await Contacts.create({
    // name: "new contact",
    // email: "1234@gmail.com"
    // })
    // console.log("create new contact", savedContacts)

    /* Read from db*/
    // const contact = await Contacts.find({})
    // console.log("contacts", contact)

   /*Read for using filter*/
    // const contact = await Contacts.find({ name:"new contact"})
    // console.log("contacts", contact)

    /*find one*/
    // const contact = await Contacts.findOne({ name:"new contact"})
    // console.log("contacts", contact)

    /* find by id*/
    // const contact = await Contacts.findById({ _id:"63bffebd0f4c853b80258708"})
    // console.log("contacts", contact)

    /*Update*/
    //  const contact = await Contacts.findOne({_id:"63bffebd0f4c853b80258708"})
    // contact.name = "update title";
    // await contact.save();
    // console.log("contacts", contact)
    /*Update-2*/
    // const contact = await Contacts.findByIdAndUpdate("63bffebd0f4c853b80258708", {
    //   name: "update title-3"
    // }, {new: true});
    // console.log("update contacts", contact);
    
    /*Remove*/
    // const contact = await Contacts.findByIdAndRemove("63bffc6f2320b9e58150fd52");
    // console.log("deleted contact", contact);
 



