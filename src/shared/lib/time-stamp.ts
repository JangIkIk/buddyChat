const timeStamp = (date: Date, form?: FormType) => {
  const years = date.getFullYear();
  const months = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  switch (form) {
    case "YY-MM":
      return `${years}-${months}`;
    case "YY-MM-DD":
      return `${years}-${months}-${day}`;
    case "HH-mm":
      return `${hours}:${minutes}`;
    default:
      return `${years}-${months}-${day} ${hours}:${minutes}`;
  }
};

export { timeStamp };

type FormType = "YY-MM" | "YY-MM-DD" | "HH-mm";
