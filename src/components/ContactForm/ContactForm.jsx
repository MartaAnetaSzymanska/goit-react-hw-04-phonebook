import { useState } from "react";
import { nanoid } from "nanoid";
import styles from "./ContactForm.module.scss";
import PropTypes from "prop-types";

export const ContactForm = ({ contacts, addContact }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };

  const handleNumberChange = (ev) => {
    setNumber(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const isContactExist = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (isContactExist) {
      alert(`Contact with the name: ${name} already exists.`);
    } else {
      addContact(name, number);
      setName("");
      setNumber("");
    }
  };

  const nameId = nanoid();
  const numId = nanoid();
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor={nameId} className={styles.label}>
        Name
        <input
          id={nameId}
          type="text"
          name="name"
          pattern="^[a-zA-Z]+(([' \-][a-zA-Z ])?[a-zA-Z]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleNameChange}></input>
      </label>
      <label htmlFor={numId} className={styles.label}>
        Number
        <input
          id={numId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleNumberChange}></input>
      </label>
      <button type="submit" className={styles.formButton}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};
