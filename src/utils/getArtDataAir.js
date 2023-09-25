class NetworkError extends Error {
	constructor(message) {
		super(message);
		this.name = "NetworkError";
	}
}

const regexPrice = /(\d+(\.\d+)?) грн\./;
const regexAvailability = /Наявність: (.+)/;

function extractPriceFromString(valueString) {
	const match = valueString.match(regexPrice);
	return match ? parseFloat(match[1]).toFixed(2) : null;
}

function extractAvailabilityFromString(valueString) {
	const match = valueString.match(regexAvailability);
	if (match) {
		const availabilityText = match[1].trim();
		return availabilityText === 'Є в наявності' || availabilityText === 'Немає в наявності';
	}
	return false;
}


export async function getArtDataAir(airLink) {
	const urlCA = 'https://corsproxy.io/?';
	const url = `${urlCA}${airLink}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new NetworkError('Network response was not ok');
		}

		const responseString = await response.text();

		const priceStartIndex = responseString.indexOf("Ціна за ед.:");
		const availabilityStartIndex = responseString.indexOf("Наявність:");

		if (priceStartIndex === -1 || availabilityStartIndex === -1) {
			throw new Error("Price or availability information not found");
		}

		const priceText = responseString.slice(priceStartIndex, availabilityStartIndex);
		const availabilityText = responseString.slice(availabilityStartIndex);

		const price = extractPriceFromString(priceText);
		const isAvailable = extractAvailabilityFromString(availabilityText);

		return { price, isAvailable };
	} catch (error) {
		if (error instanceof NetworkError) {
			console.error("Network error:", error.message);
		} else {
			console.error("Unknown error:", error);
		}
		throw error;
	}
}
