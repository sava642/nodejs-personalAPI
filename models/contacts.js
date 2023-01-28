
const { Schema, model } = require('mongoose');
// mongoose.set('strictQuery', false);

const contactsSchema = Schema(
   {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
     
  },
      { versionKey: false,  timestamps: true}
   )
    const Contacts = model("contacts", contactsSchema);

module.exports = {
    Contacts,
 }







 


