import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = (props) => {
  const [startDate, setStartDate] = useState(new Date(props.currentDate));
  return (
    <DatePicker selected={startDate} onChange={(date) => { setStartDate(date); props.getDate(date); }} />
  );
};

export default DateSelector;