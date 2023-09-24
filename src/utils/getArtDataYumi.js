class NetworkError extends Error {
	constructor(message) {
		super(message);
		this.name = "NetworkError";
	}
}

const regex = /(\d+(\.\d+)?)/;

function extractValueFromString(valueString, searchValue, back = false) {
	const index = valueString.indexOf(searchValue);
	if (index === -1) {
		return null; // Не найдено значение
	}

	const substring = back ? valueString.slice(index - 50, index) : valueString.slice(index, index + 50);
	const match = substring.match(regex);
	return match ? match[0] : null;
}

function extractQuantFromString(valueString) {
	const searchQuantValue = "наявності";
	const notAvailableString = "Немає в наявності";

	// Проверяем, содержит ли valueString фразу "Немає в наявності"
	if (valueString.includes(notAvailableString)) {
		return 0;
	}

	// В противном случае ищем значение как обычно
	const quant = extractValueFromString(valueString, searchQuantValue);

	return quant;
}

function extractPriceFromString(valueString) {
	const searchPriceValue = '₴/шт';
	const extractedPrice = extractValueFromString(valueString, searchPriceValue, true);
	return extractedPrice ? parseFloat(extractedPrice).toFixed(2) : null;
}

export async function getArtDataYumi(yumiLink) {
	const urlCA = 'https://corsproxy.io/?';
	const corsUrl = `${urlCA}${yumiLink}`;

	try {
		const response = await fetch(corsUrl);
		if (!response.ok) {
			throw new NetworkError('Network response was not ok');
		}
		const responseString = await response.text();
		

		const quant = extractQuantFromString(responseString);
		const price = extractPriceFromString(responseString);

		console.log(price);

		return { price, quant };

	} catch (error) {
		if (error instanceof NetworkError) {
			console.error("Network error:", error.message);
		} else {
			console.error("Unknown error:", error);
		}
		throw error;
	}
}
