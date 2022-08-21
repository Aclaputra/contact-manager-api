import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { uuid } from "uuidv4";
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  /**
   * get all contacts
   * @returns 
   */
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  /**
   * add contact
   * @param {*} contact 
   */
  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  /**
   * update contact
   * @param {*} contact 
   */
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  /**
   * delete contact
   * @param {*} id 
   */
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  /**
   * all functions useEffect to make it run and work perfectly on react.js.
   */
  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);

    /**
     * 
     */
    const getAllCOntacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllCOntacts();
  }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  /**
   * frontend jsx files
   */
  return (
    <div className="ui container">
      <Router>
        <Header />

        {/* 
          switching between routes ;
          - /           | get all contacts.
          - /add        | add new contact.
          - /edit       | edit a conctact.
          - /contact/id | get a contact.
        */}
        <Switch>

          {/* 
            Path : /
            rendering ContactList with props
            get all the props from ContactList and shows it all.
            get contacts from useState variable.
            add getContactId props with value of removeContactHandler function to delete a contact.

          */}
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            )}
          />

          {/* 
            Path : /add
            rendering AddContact with props
            get all the props from AddContact and shows it all.
            add addContactHandler props with value of addContactHandler function.
          */}
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />

          {/* 
            Path : /edit
            rendering EditContact with props
            get all the props from EditContact and shows it all.
            add updateContactHandler props with value of updateContactHandler function.
          */}
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />

          {/* 
            Path : /contact/id
            return ContactDetail component.
          */}
          <Route path="/contact/:id" component={ContactDetail} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
