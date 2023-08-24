import { Component } from "react";
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

class ContactForm extends Component {
    state = {
        name: '',
        number: ''
    }

    handleChange = (evt) => {
        const { name, value } = evt.currentTarget
        this.setState({[name]: value})
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        const id = nanoid()
        this.props.onSubmit({ ...this.state, id })
        this.setState({name: '', number: ''})
    }

    render() {
        return (
            <form className={css.contactForm} onSubmit={this.handleSubmit}>
                <label className={css.contactLabel}> Name
                    <input className={css.contactInput} onChange={this.handleChange}
                      value={this.state.name}
                      type="text"
                      name="name"
                      pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                      required/>
                </label>
                <label className={css.contactLabel}>
                    Number
                    <input className={css.contactInput}
                      onChange={this.handleChange}
                      value={this.state.number}
                      type="tel"
                      name="number"
                      pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                      title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                      required/>
                </label>
                <button className={css.contactButton} type="submit">Add contact</button>
            </form>
        )
    }
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default ContactForm