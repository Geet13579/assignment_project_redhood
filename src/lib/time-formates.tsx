// timeUtils.ts

export function formatTime(time: string) {
  // // console.log('time', time);

  // Extract hours and minutes from the input time string
  let [hours, minutes] = time.split(' ')[1].split(':').slice(0, 2).map(Number);

  const period = hours >= 12 ? 'PM' : 'AM';
  const startHours = hours % 12 || 12; // Convert to 12-hour format

  // Start time
  const startTime = `${String(startHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;

  // Calculate end time (add 30 minutes)
  minutes += 30;
  if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
  }
  const endPeriod = hours >= 12 ? 'PM' : 'AM';
  const endHours = hours % 12 || 12; // Convert to 12-hour format

  const endTime = `${String(endHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${endPeriod}`;

  return `${startTime} To ${endTime}`;
}

export function dataFormate (dateValue: any) {
  // Ensure the input is in a format that Date can parse
  const standardizedDateValue = dateValue.replace(" ", "T");

  const date = new Date(standardizedDateValue);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new RangeError("Invalid time value");
  }

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

  return formattedDate.replace(",", ""); // Remove any unwanted comma
};

export function formatDate(dateValue: string | Date): string {
  const date = new Date(dateValue);
  
  return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
  }).format(date);
}


export function formatDateTime(datetime: string): string {
  // Parse the input datetime
  const [datePart, timePart] = datetime.includes(' ')
    ? datetime.split(' ')
    : [datetime.split('T')[0], datetime.split('T')[1]];
  
  // Format the date part
  const formattedDate = formatDate1(datePart);
  
  // Format the time part
  const formattedTime = formatTime1(timePart);
  
  return `${formattedDate}T${formattedTime}`;
}

function formatDate1(date: string): string {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
}

function formatTime1(time: string): string {
  const [hours, minutes] = time.split(':');
  let hour = parseInt(hours, 10);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }
  
  return `${hour}:${minutes} ${suffix}`;
}
export default {
  formatTime,
  formatDate,
  formatDateTime,
  dataFormate
};