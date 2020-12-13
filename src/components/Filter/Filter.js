import React from 'react';
import s from '../Filter/Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <>
      <h2 className={s.filter_title}>Find contacts by name</h2>
      <input
        type="text"
        placeholder="Enter contact name"
        className={s.filter_input}
        value={value}
        onChange={onChange}
      ></input>
    </>
  );
};

export default Filter;
