import React from 'react';
import '../../App.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import cleanData from '../../helper/dataHelper';
import data from '../../config/data';
import DataPicker from '../../components/datePicker';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../slices';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'p14-modal-opc';

export default function EmployeeForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const optionsStates = data.states;
  const optionsDepartments = cleanData(data.departments);
  const [showModal, setShowModal] = useState(false);
  const emptyForm = {
    id: 1,
    firstName: '',
    lastName: '',
    startDate: null,
    department: '',
    dateOfBirth: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  };
  const [form, setForm] = useState(emptyForm);
  console.log('FORM STATE: ', form);
  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the department field is filled in
    const formFields = Object.values(form);

    const isFormValid = formFields.every((field) => field !== '');
    if (isFormValid) {
      console.log('Form is valid');
      // form.dateOfBirth = formFields.dateOfBirth
      //   .toLocaleString()
      //   .split(' ')
      //   .shift();
      // form.startDate = form.startDate
      //   .toLocaleString()
      //   .split(' ')
      //   .shift();
      dispatch(addEmployee(form));
      setForm(emptyForm);
      setShowModal(true);

      console.log(form);
    } else console.log('Form is not valid');
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   dispatch(createEmployee({ email, password }));
  // };

  return (
    <div>
      <div className="title">
        <h1>HRnet</h1>
        <Modal
          isOpen={showModal}
          message={'Employee created!'}
          closeModal={() => setShowModal(false)}
        />
      </div>
      <div className="container">
        <form action="#" id="create-employee" onSubmit={handleSubmit}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <label htmlFor="date-of-birth">Date of Birth</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={form.dateOfBirth}
            id="dateOfBirth"
            onChange={(date) => {
              setForm((prevForm) => ({
                ...prevForm,
                dateOfBirth: date,
              }));
            }}
            required
          />
          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={form.startDate}
            id="startDate"
            onChange={(date) => {
              setForm((prevForm) => ({
                ...prevForm,
                startDate: date,
              }));
            }}
            required
          />
          <fieldset className="address">
            <legend>Address</legend>
            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              value={form.street}
              onChange={handleChange}
              required
            />
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              required
            />
            <label htmlFor="state">State</label>
            <Dropdown
              id="state"
              options={optionsStates.map((state) => ({
                value: state.abbreviation,
                label: state.name,
              }))}
              onChange={(selectedOption) =>
                setForm((prevForm) => ({
                  ...prevForm,
                  state: selectedOption.label,
                  stateAbbr: selectedOption.value,
                }))
              }
              value={optionsStates.find(
                (option) => option.state === form.state
              )}
              placeholder="Select an option"
              required
            />
            <label htmlFor="zip-code">Zip Code</label>
            <input
              required
              id="zipCode"
              type="number"
              value={form.zipCode}
              onChange={handleChange}
            />
          </fieldset>
          <label htmlFor="department">Department</label>
          <Dropdown
            required
            id="department"
            options={optionsDepartments}
            onChange={(selectedOption) =>
              setForm((prevForm) => ({
                ...prevForm,
                department: selectedOption.value,
              }))
            }
            // value={optionsDepartments.find(
            //   (option) => option.value === form.department
            // )}
            value={form.department}
            placeholder="Select an option"
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
