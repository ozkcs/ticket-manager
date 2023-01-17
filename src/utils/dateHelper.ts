import dayjs from "dayjs";

export const parseStringToDate = (date: any) => {
	const parsedDate = dayjs(date.toDate()).format("DD MMMM YYYY");
	return parsedDate;
};

export const parseStringToHour = (date: any) => {
	const parsedDate = dayjs(date.toDate()).format("hh:mm a");
	return parsedDate;
};
