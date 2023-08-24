import { Component } from "react";
import ContactForm from "../components/contactForm/ContactForm";
import { ContactList } from "../components/contactList/ContactList";
import Filter from "../components/filter/Filter";
import css from './App.module.css'

class App extends Component {
  state = {
    contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: ''
  }
  
  formSubmitHandler = (contacts) => {
    const newName = contacts.name
    const prevNames = this.state.contacts.map(({ name }) => name)
    if (prevNames.includes(newName))
    {
      alert(`${newName} is already in contacts`)
      return
    }
    this.setState(prevState => ({ contacts: [...prevState.contacts, contacts] }))
    
  }

  handleChangeFilter = (evt) => {
    this.setState({ filter: evt.currentTarget.value })
  }

  filterContacts = () => {
    const { contacts, filter } = this.state
    const normilizedFilter = filter.toLowerCase()
    return contacts.filter(contact => contact.name.toLowerCase().includes(normilizedFilter))
  }

  deleteContact = (key) => {
    this.setState(prevState => ({ contacts: prevState.contacts.filter(({ id }) => id !== key) }))
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  } 

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'))
    if (contacts) {
      this.setState({contacts})
    }

  }
     
  render() {
    const filteredContacts = this.filterContacts()
    
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2 className={css.subTitle}>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.handleChangeFilter} />
        <ContactList contacts={filteredContacts} deleteContact={this.deleteContact} />
      </div>
    )
  }
}

export default App
