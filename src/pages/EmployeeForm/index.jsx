import '../../App.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import cleanData from '../../helper/dataHelper';
import data from '../../config/data';
import DataPicker from '../../components/datePicker';

export default function EmployeeForm() {
  console.log(data);
  const optionsStates = cleanData(data.states);
  console.log(optionsStates);
  const optionsDepartments = cleanData(data.departments);
  // const defaultOption = options[0];
  const _onSelect = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <form action="#" id="create-employee">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" />
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" />
          <label htmlFor="date-of-birth">Date of Birth</label>
          <DataPicker id="date-of-birth" />
          <label htmlFor="start-date">Start Date</label>
          <DataPicker id="start-date" />
          <fieldset className="address">
            <legend>Address</legend>
            <label htmlFor="street">Street</label>
            <input id="street" type="text" />
            <label htmlFor="city">City</label>
            <input id="city" type="text" />
            <label htmlFor="state">State</label>
            <Dropdown
              options={optionsStates}
              onChange={_onSelect}
              value={optionsStates[0]}
              placeholder="Select an option"
            />
            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" />
          </fieldset>
          <label htmlFor="department">Department</label>
          <Dropdown
            options={optionsDepartments}
            onChange={_onSelect}
            value={optionsDepartments[0]}
            placeholder="Select an option"
          />
        </form>
        <button>Save</button>
        <div id="confirmation" className="modal">
          Employee Created!
        </div>
      </div>
    </div>
  );
}
