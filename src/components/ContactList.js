import React from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

/**
 * mendapatkan props dari App.js berupa :
 * - contacts props     | variable useState berisi semua value list contact.
 * - getContactId props | memanggil removeContactHandler function.
 * 
 * @param {*} props 
 * @returns 
 */
const ContactList = (props) => {
  console.log(props);

  /**
   * buat fucntion deleteContactHandler yang memiliki parameter id.
   * 
   * @param {*} id 
   */
  const deleteConactHandler = (id) => {
    props.getContactId(id);
  };

  /**
   * render all contact list function.
   * Render ContactCard Class and make new props :
   * - contact      : contact
   * - clickHandler : deleteContactHandler
   * - key          : contact.id
   */
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHander={deleteConactHandler}
        key={contact.id}
      />
    );
  });

  /**
   * rendering all jsx.
   * make a router link to /add to button Add Contact
   * makae a div table render all contactList by calling renderContactList function.
   */
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;
