export function checkExpireDateTime(date, time) {
  const expireDate = new Date(date);
  const [hours, minutes] = time.split(":").map((num) => parseInt(num, 10));
  expireDate.setHours(hours, minutes, 0, 0);
  const currentDate = new Date();
  if (currentDate > expireDate) {
    return true;
  } else {
    return false;
  }
}
