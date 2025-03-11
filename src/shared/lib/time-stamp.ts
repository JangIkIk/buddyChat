const timeStamp = (date: string, form?: FormType) => {
  const dateWrap = new Date(date);
  const years = dateWrap.getFullYear();
  const months = (dateWrap.getMonth() + 1).toString().padStart(2, "0");
  const day = dateWrap.getDate().toString().padStart(2, "0");
  const minutes = dateWrap.getMinutes().toString().padStart(2, "0");

  let hours = dateWrap.getHours();
  hours = hours % 12 || 12;
  const period = hours < 12 ? "오후" : "오전";
  const changeHours = hours.toString().padStart(2, "0");

  switch (form) {
    case "YYYY-MM":
      return `${years}-${months}`;
    case "YYYY-MM-DD":
      return `${years}-${months}-${day}`;
    case "HH:mm":
      return `${period} ${changeHours}:${minutes}`;
    default:
      return `${years}-${months}-${day} ${period} ${changeHours}:${minutes}`;
  }
};

export { timeStamp };

type FormType = "YYYY-MM" | "YYYY-MM-DD" | "HH:mm";
