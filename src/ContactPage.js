import React, { useState } from 'react';
import ContactDetails from './ContactDetails';


const ContactPage = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Sanjay', email: 'johndoe@example.com', phone: '1234567890' },
    { id: 2, name: 'Devesh', email: 'janesmith@example.com', phone: '1234567890' },
    { id: 2, name: 'Abhishek', email: 'janesmith@example.com', phone: '1234567890' },
  ]);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
  };

  const handleDelete = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const handleSave = (editedContact) => {
    if (editedContact.id) {
      setContacts(
        contacts.map((contact) =>
          contact.id === editedContact.id ? editedContact : contact
        )
      );
    } else {
      const newContact = {
        ...editedContact,
        id: Math.max(...contacts.map((contact) => contact.id)) + 1,
      };
      setContacts([...contacts, newContact]);
    }
    setSelectedContact(null);
  };

  return (
      <center>
    <div className="contact-page">
      {selectedContact ? (
        <ContactDetails
          contact={selectedContact}
          onEdit={handleEdit.bind(null, selectedContact)}
          onDelete={handleDelete.bind(null, selectedContact.id)}
        />
      ) : (
        <div>
          <h2>Contact List</h2>
          {contacts.map((contact) => (
            <div key={contact.id}>
              <p>{contact.name}</p>
              <button onClick={handleEdit.bind(null, contact)}>Edit</button>
              <button onClick={handleDelete.bind(null, contact.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      <h2>Add/Edit Contact</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const { id, name, email, phone } = e.target.elements;
          handleSave({
            id: id.value ? parseInt(id.value, 10) : null,
            name: name.value,
            email: email.value,
            phone: phone.value,
          });
        }}
      >
        <input type="hidden" name="id" value={selectedContact?.id || ''} /><br/>
        <input type="text" name="name" placeholder="Name" required /><br/><br/>
        <input type="email" name="email" placeholder="Email" required /><br/><br/>
        <input type="text" name="phone" placeholder="Phone" required /><br/><br/>
        <button type="submit">Save</button>
      </form>
    </div>
    </center>
  );
};

export default ContactPage;