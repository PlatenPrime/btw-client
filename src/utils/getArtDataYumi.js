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

function extractProductPriceFromString(valueString, pack = 1) {
	const searchPriceValue = '₴';
	const index = valueString.indexOf(searchPriceValue);
	if (index === -1) {
		return null; // Цена не найдена
	}

	const substring = valueString.slice(index - 50, index);
	const match = substring.match(/(\d+,\d+)/);

	if (match) {
		const priceWithComma = match[0];
		const priceFloat = parseFloat(priceWithComma.replace(',', '.'));
		const adjustedPrice = priceFloat / pack; // Делим цену на значение из переменной pack
		return adjustedPrice.toFixed(2);
	} else {
		return null;
	}
}

function extractQuantityInPackFromString(valueString) {
	const regex = /(\d+)шт/;
	const match = valueString.match(regex);

	if (match && match[1]) {
		return parseInt(match[1], 10);
	} else {
		return null; // Если не найдено числового значения
	}
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
		let price = extractPriceFromString(responseString);

		console.log(price);

		if (!price) {
			let pack = extractQuantityInPackFromString(responseString)
			pack ? pack = pack : pack = 1
			console.log(pack)


			price = extractProductPriceFromString(responseString, pack)

		}

		console.log(price)




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
