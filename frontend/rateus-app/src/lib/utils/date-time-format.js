const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export function formatDateTime(input) {
  if (!input) return "";

  const date = new Date(input);
  if (isNaN(date.getTime())) return "";

  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const h = String(date.getHours()).padStart(2, "0");
  const m = String(date.getMinutes()).padStart(2, "0");
  const timeStr = `${h}:${m}`;

  if (isToday) {
    return `Сегодня, ${timeStr}`;
  }

  const dayStr = date.getDate();
  const monthStr = months[date.getMonth()];

  if (date.getFullYear() === now.getFullYear()) {
    return `${dayStr} ${monthStr}, ${timeStr}`;
  } else {
    return `${dayStr} ${monthStr} ${date.getFullYear()}`;
  }
}

export function formatDateTimeStrict(input) {
  if (!input) return "";
  const date = new Date(input);
  if (isNaN(date)) return "";
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}
