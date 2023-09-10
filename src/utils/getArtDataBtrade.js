class NetworkError extends Error {
	constructor(message) {
		super(message);
		this.name = "NetworkError";
	}
}


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

export async function getArtDataBtrade(art) {
	const searchQuantValue = "У наявності";
	const searchPriceValue = 'грн';
	const urlCA = 'https://corsproxy.io/?';
	const baseUrl = "https://sharik.ua/ua";
	const apiRequest = `/search/?q=${art}`;
	const corsUrl = `${urlCA}${baseUrl}${apiRequest}`;

	try {
		const response = await fetch(corsUrl);
		if (!response.ok) {
			throw new NetworkError('Network response was not ok');
		}
		const responseString = await response.text();

		const quant = extractValueFromString(responseString, searchQuantValue);


		const extractedPrice = extractValueFromString(responseString, searchPriceValue, true, true);

		console.log(extractedPrice)

		const formattedPrice = extractedPrice ? parseFloat(extractedPrice).toFixed(2) : null;

		console.log(extractedPrice)



		return { price: formattedPrice, quant };
	} catch (error) {
		if (error instanceof NetworkError) {
			console.error("Network error:", error.message);
		} else {
			console.error("Unknown error:", error);
		}
		throw error;
	}
}
