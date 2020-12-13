import { Component } from 'react';
import s from '../ContactForm/ContactForm.module.css';
import shortid from 'shortid';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    //   обновить стейт по вычисляемому значению name у инпутов name="..." ->(event.target.name)
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handelSubmit = event => {
    const { name, number } = this.state;
    // чтоб не перезагружалась страница по умолчанию
    event.preventDefault();

    // валидация формы при сабмите
    const isValidateForm = this.validateForm();
    // если форма не валидна, выход
    if (!isValidateForm) {
      return;
    }
    // если форма валидна,
    // прокидываем данные введённые с формы(name,number) выше в App
    this.props.onSubmitData({ id: shortid.generate(), name, number });

    this.resetForm();
  };

  // Валидация формы (проверка на то, заполнены ли поля формы)
  validateForm = () => {
    const { name, number } = this.state;
    const { onCheckUnique } = this.props;

    // если не имя или не номер телефона
    if (!name || !number) {
      alert('Some field is empty!');
      // не прошла валидацию
      // зачем false???????
      return false;
    }
    return onCheckUnique(name);
  };

  // очистка формы
  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={s.form} onSubmit={this.handelSubmit}>
        <label className={s.label}>
          Name{' '}
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label className={s.label}>
          Number{' '}
          <input
            type="tel"
            name="number"
            placeholder="Enter phone number"
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className={s.submit_button}>
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
