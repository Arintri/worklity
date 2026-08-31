const DAY_MS = 86400000;

function createUTCDate(year, monthIndex, day) {
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, monthIndex, day);
  return date;
}

export function isValidDate(date) {
  return date instanceof Date && Number.isFinite(date.getTime());
}

export function parseDate(value) {
  if (!value) return null;

  const match = /^(\d{4,})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > daysInMonth(year, month)
  ) {
    return null;
  }

  const date = createUTCDate(year, month - 1, day);

  if (
    !isValidDate(date) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

export function daysInMonth(year, month) {
  return createUTCDate(year, month, 0).getUTCDate();
}

function isFebruary29(date) {
  return date.getUTCMonth() === 1 && date.getUTCDate() === 29;
}

function birthdayInYear(birth, year) {
  const month = birth.getUTCMonth();
  const day = isFebruary29(birth)
    ? Math.min(29, daysInMonth(year, 2))
    : birth.getUTCDate();

  return createUTCDate(year, month, day);
}

function addMonthsClamped(date, amount) {
  const firstOfTargetMonth = createUTCDate(
    date.getUTCFullYear(),
    date.getUTCMonth() + amount,
    1
  );
  const targetYear = firstOfTargetMonth.getUTCFullYear();
  const targetMonth = firstOfTargetMonth.getUTCMonth();
  const day = Math.min(
    date.getUTCDate(),
    daysInMonth(targetYear, targetMonth + 1)
  );

  return createUTCDate(targetYear, targetMonth, day);
}

export function differenceInDays(a, b) {
  if (!isValidDate(a) || !isValidDate(b)) return null;

  const difference = (b.getTime() - a.getTime()) / DAY_MS;
  return Number.isFinite(difference) ? Math.floor(difference) : null;
}

export function calculateAge(dob, target) {
  if (!isValidDate(dob) || !isValidDate(target) || dob > target) {
    return null;
  }

  let years = target.getUTCFullYear() - dob.getUTCFullYear();
  let anniversary = birthdayInYear(dob, dob.getUTCFullYear() + years);

  if (anniversary > target) {
    years--;
    anniversary = birthdayInYear(dob, dob.getUTCFullYear() + years);
  }

  let months = 0;
  let monthAnchor = anniversary;

  for (let candidate = 1; candidate <= 11; candidate++) {
    const candidateDate = addMonthsClamped(anniversary, candidate);
    if (candidateDate > target) break;

    months = candidate;
    monthAnchor = candidateDate;
  }

  const days = differenceInDays(monthAnchor, target);

  if (years < 0 || months < 0 || days === null || days < 0) {
    return null;
  }

  return { years, months, days };
}

export function calculateAgeDetails(dob, target) {
  const age = calculateAge(dob, target);
  const totalDays = differenceInDays(dob, target);

  if (!age || totalDays === null || totalDays < 0) return null;

  let nextBirthday = birthdayInYear(dob, target.getUTCFullYear());

  if (nextBirthday < target) {
    nextBirthday = birthdayInYear(dob, target.getUTCFullYear() + 1);
  }

  const birthdayDays = differenceInDays(target, nextBirthday);

  if (birthdayDays === null || birthdayDays < 0) return null;

  return {
    ...age,
    totalDays,
    nextBirthday,
    birthdayDays,
  };
}
