const formatToDate = (dateString) => {
  // Parse the input date string into a Date object
  const date = new Date(dateString);

  // Month names array
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract year, month, and day
  const year = date.getFullYear();
  const month = date.getMonth(); // Month index (0-based)
  const day = date.getDate();

  // Format the date string
  const formattedDate = `${day} ${monthNames[month]}, ${year}`;

  return formattedDate;
};

export default formatToDate;
