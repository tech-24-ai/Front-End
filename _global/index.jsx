import moment from "moment";

export const wrappReadMinute = (minute, label = " minute read") => {
  return `${minute} ${label}`;
};

export const calculateDateTime = (
  apiDate,
  { format = "LLL", isDateTime = false } = {}
) => {

  // const formatDate = (date) => {
  //   const userLocale = navigator.language; // Get user's locale setting
  //   console.log("userLocale", userLocale);
  //   return new Intl.DateTimeFormat(userLocale, {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //     // second: "numeric",
  //   }).format(date.toDate());
  // };


  const parsedDate = moment(new Date(apiDate));
  const utcDateTime = parsedDate.utc(true).format();

  const currentDate = moment();
  // Calculate the difference in days
  const diffDays = currentDate.diff(utcDateTime, "days");
  // console.log("ConvertedDATE", moment(utcDateTime).format(format));
  if (isDateTime || diffDays > 10) {
    // const formatedDate = formatDate(parsedDate);
    // console.log("formatedDate", formatedDate);
    // return formatedDate;
    return moment(utcDateTime).format(format);
  } else {
    return moment(utcDateTime).fromNow();
  }
};
