import { useState, useEffect } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { nanoid } from "nanoid";

const initialContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

export const App = () => {
  const savedContacts = localStorage.getItem("contacts");

  const [contacts, setContacts] = useState(
    savedContacts !== null ? JSON.parse(savedContacts) : initialContacts,
  );
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const newContact = { id: nanoid(), name, number };
    setContacts((prevState) => [...prevState, newContact]);
  };

  const filterContact = () => {
    const filterLowerCase = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterLowerCase),
    );
  };

  const deleteContact = (id) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== id),
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} addContact={addContact}></ContactForm>
      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={setFilter}></Filter>
      <ContactList
        filterContact={filterContact}
        deleteContact={deleteContact}></ContactList>
    </>
  );
};
