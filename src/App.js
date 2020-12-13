import { Component } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

const stylesForWrapper = {
  width: '500px',
  margin: '0 auto',
  paddingTop: '30px',
};

const stylesForTitles = {
  textAlign: 'center',
  color: '#6B5EAC',
};

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  // изменить стостояние от предыдущего
  handelDeleteContact = contactId => {
    this.setState(prevState => ({
      // беру все предыдущие контакты.Для каждого из них проверяю
      // по id(сравниваю с id контакта, который нужно удалить)
      // отфильтровывыю только те, id которых не равен id, контакта который нужно удалить
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  // Получение данных state.name и state.number c ContactForm
  // добавление нового контакта
  contactFormSubmithandler = newContact => {
    this.setState(prevContact => ({
      contacts: [...prevContact.contacts, newContact],
    }));
  };

  handelCheckUniqueContact = name => {
    const { contacts } = this.state;
    // по контанктам проходим и на каждой итераци сравниваем имена существующие
    // в списке контактов с тем , которое приходит с формы
    // двойное НЕ используют для преобразования значений к логическому типу
    const isExistContact = !!contacts.find(contact => contact.name === name);

    //  alert сработает, если в левой части (isExistContact) будет  равен true(если
    // найдёться уже существующий контакт в списке)
    isExistContact && alert('Contact is already exist!');

    // функция возвращает ответ "уникальный ли контакт или нет?" Если пришло isExistContact=true(существует контакт),
    // функция возвращает: "контакт НЕ уникальный"
    return !isExistContact;
  };

  // Filter
  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    // возвращаем те контакты, свойсто имени которых включает значение из this.state.filter
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const { filter } = this.state;
    // переменная для отрисовки отфильтрованных контактов
    const filteredContacts = this.getFilteredContacts();
    return (
      <div style={{ ...stylesForWrapper }}>
        <h1 style={{ ...stylesForTitles }}>Phonebook</h1>

        <ContactForm
          onSubmitData={this.contactFormSubmithandler}
          onCheckUnique={this.handelCheckUniqueContact}
        />

        <h2 style={{ ...stylesForTitles }}>Contacts</h2>

        <Filter value={filter} onChange={this.changeFilter} />

        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handelDeleteContact}
        />
      </div>
    );
  }
}

export default App;
