export const extractVideoId = (url) => {
	if (!url) return null; // Проверка на наличие значения url
	const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
	const match = url.match(regExp);
	return match && match[1];
};
