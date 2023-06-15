
const ContactDetails = ({ contact, onEdit, onDelete }) => {
    const { name, email, phone } = contact;
  
    return (
      <div className="contact-details">
        <h2>{name}</h2>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    );
  };
  
  export default ContactDetails;
  