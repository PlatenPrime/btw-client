import axios from "./axios"


const TIMEOUT_DURATION = 5000;



const fetchWithTimeout = (url, timeout = TIMEOUT_DURATION) => {
	return Promise.race([
		axios.get(url),
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Request timed out')), timeout)
		)
	]);
};



const regex = /(\d+(\.\d+)?)/;

function extractValueFromString(valueString, searchValue, back = false) {
	try {
		const index = valueString.indexOf(searchValue);
		const substring = back ? valueString.slice(index - 50, index) : valueString.slice(index, index + 50);
		const match = substring.match(regex);
		return match ? match[0] : null;
	} catch (error) {
		console.error(error);
		return null;
	}
}

function extractQuantFromString(valueString) {
	const searchQuantPrefix = "У наявності: ";

	// Ищем индекс начала "У наявності"
	const startIndex = valueString.indexOf(searchQuantPrefix);

	// Если "У наявності" не найдено, возвращаем 0
	if (startIndex === -1) {
		return 0;
	}

	// Находим подстроку после "У наявності"
	const quantString = valueString.slice(startIndex + searchQuantPrefix.length);

	// Парсим строку в число и возвращаем
	const quant = parseInt(quantString, 10);

	// Если не удалось распарсить число, возвращаем 0
	if (isNaN(quant)) {
		return 0;
	}

	return quant;
}


function extractPriceFromString(valueString) {
	const searchPriceValue = 'грн';
	const extractedPrice = extractValueFromString(valueString, searchPriceValue, true, true);
	return extractedPrice ? parseFloat(extractedPrice).toFixed(2) : null;
}




	export async function getArtDataBtrade(art) {
		try {
			console.log("До запроса");

			const link = `https://sharik.ua/ua/search/?q=${art}`;
			console.log(encodeURIComponent(link));

			const response = await fetchWithTimeout(`comps/linkpage/${encodeURIComponent(link)}`);

			const responseString = response?.data?.html;
			console.log("После запроса");

			const quant = extractQuantFromString(responseString);
			const price = extractPriceFromString(responseString);

			console.log("Цена Btrade", price);
			console.log("Наличие Btrade", quant);

			return { price, quant };
		} catch (error) {
			if (error.message === 'Request timed out') {
				console.error("Запрос превысил время ожидания");
			} else {
				console.error("Ошибка запроса:", error.message);
			}
			// Возвращаем дефолтные значения в случае ошибки
			return { price: null, quant: 0 };
		}
	}