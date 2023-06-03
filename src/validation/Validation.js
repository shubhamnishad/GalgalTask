const ValidateBirthday = birthday => {
  if (birthday.length < 10) return false;

  if (!/^\d{2}-\d{2}-\d{4}$/.test(birthday)) {
    return true;
  }

  let parts = birthday.split('-');
  let now = new Date();
  let year = parseInt(parts[2], 10);
  let currentYear = now.getFullYear();
  let month =
    parts[1][0] === '0' ? parseInt(parts[1][1], 10) : parseInt(parts[1], 10);
  let day =
    parts[0][0] === '0' ? parseInt(parts[0][1], 10) : parseInt(parts[0], 10);

  if (year >= currentYear) {
    return false;
  }
  if (month < 1 || month > 12) {
    return false;
  }
  if (day < 1 || day > 31) {
    return false;
  }

  return true;
};

export {ValidateBirthday};
