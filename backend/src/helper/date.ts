export const getDateComponents = (date: Date) => {
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");
	const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
	const timezoneOffset = -date.getTimezoneOffset() / 60;
	const timezoneSign = timezoneOffset >= 0 ? "+" : "-";
	const timezone = `UTC ${timezoneSign} ${Math.abs(timezoneOffset)}`;
	return { day, month, year, hours, minutes, seconds, milliseconds, timezone };
};
