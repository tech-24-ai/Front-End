import moment from "moment";

export const wrappReadMinute = (minute, label = " minute read") => {
  return `${minute} ${label}`;
};

export const calculateDateTime = (
  apiDate,
  { format = "LLL", isDateTime = false } = {}
) => {
  // const calculateTimeAgo = (createdAt) => {
  //   const currentDateTime = moment();
  //   const blogPostDateTime = moment
  //     .utc(new Date(createdAt))
  //     .local()
  //     .format("MM-DD-YYYY hh:mm A");

  //   const diffMilliseconds = currentDateTime.diff(blogPostDateTime);
  //   const duration = moment.duration(diffMilliseconds);

  //   let humanReadableDiff;
  //   if (duration.asMinutes() < 60) {
  //     humanReadableDiff = duration.minutes() + " minutes ago";
  //   } else {
  //     humanReadableDiff = duration.humanize(true);
  //   }
  //   console.log("humanReadableDiff", humanReadableDiff);
  //   return humanReadableDiff;
  // };

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
