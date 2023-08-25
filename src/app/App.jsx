import { useEffect, useState } from 'react';
import ContactForm from '../components/contactForm/ContactForm';
import { ContactList } from '../components/contactList/ContactList';
import Filter from '../components/filter/Filter';
import css from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsLocalStorage = JSON.parse(localStorage.getItem('contacts'));

    if (contactsLocalStorage) {
      return setContacts(contactsLocalStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = newContacts => {
    const newName = newContacts.name;
    const prevNames = contacts.map(({ name }) => name);
    if (prevNames.includes(newName)) {
      alert(`${newName} is already in contacts`);
      return;
    }
    setContacts(prevContacts => [...prevContacts, newContacts]);
  };

  const handleChangeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const filterContacts = () => {
    const normilizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normilizedFilter)
    );
  };

  const deleteContact = key => {
    setContacts(prevContacts => prevContacts.filter(({ id }) => id !== key));
  };

  const filteredContacts = filterContacts();

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContacts} />
      <h2 className={css.subTitle}>Contacts</h2>
      <Filter filter={filter} onChange={handleChangeFilter} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
