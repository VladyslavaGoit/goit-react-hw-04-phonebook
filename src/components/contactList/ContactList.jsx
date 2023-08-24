import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, deleteContact }) => {
    return (
        <ul className={css.contactList}>{contacts.map(contact =>
            <li className={css.contactItem} key={contact.id}>
                <p className={css.contactText}>{contact.name}: {contact.number}</p>
                <button className={css.contactButton} onClick={() => deleteContact(contact.id)}>Delete</button>
            </li>)}
        </ul>
    )
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    })
    ).isRequired,
    deleteContact: PropTypes.func.isRequired
}