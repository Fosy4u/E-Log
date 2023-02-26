const adjustDate = (data) => {
  if (data < 10) {
    return `0${data}`;
  }
  return data;
};

const displayDate = (date) => {
  const parsedDate = new Date(date);
  const month = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(parsedDate);
  const parsedDateValue = adjustDate(parsedDate.getFullYear());
  const parsedDateDay = adjustDate(parsedDate.getDate());
  const parsedDateHours = adjustDate(parsedDate.getHours());
  const parsedDateMinutes = adjustDate(parsedDate.getMinutes());
  const parsedDateSeconds = adjustDate(parsedDate.getSeconds());

  return `${parsedDateDay} ${month} ${parsedDateValue} ${parsedDateHours}:${parsedDateMinutes}:${parsedDateSeconds}`;
};

export default displayDate;
