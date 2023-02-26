const adjustDate = (data) => {
    if (data < 10) {
      return `0${data}`;
    }
    return data;
  };
  
  const displayDay= (date) => {
    const parsedDate = new Date(date);
    const month = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    }).format(parsedDate);
    const parsedDateValue = adjustDate(parsedDate.getFullYear());
    const parsedDateDay = adjustDate(parsedDate.getDate());
   
  
    return `${parsedDateDay} ${month} ${parsedDateValue}`;
  };
  
  export default displayDay;
  