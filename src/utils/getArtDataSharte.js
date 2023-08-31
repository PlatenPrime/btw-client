export async function getArtDataSharte(link) {
	try {
		const searchValuePrice = "title";
		const searchValueAvailability = "наявності";
		const urlProxy = 'https://corsproxy.io/?';
		const superLink = `${urlProxy}${link}`;

		const response = await fetch(superLink);
		const responseString = await response.text();

		const indexPrice = responseString.indexOf(searchValuePrice);
		const indexPrice2 = responseString.indexOf(searchValuePrice, indexPrice + searchValuePrice.length);
		const title = responseString.slice(indexPrice, indexPrice2 + searchValuePrice.length);

		const regex = /(\d+\.\d{2})\sгрн/;
		const match = title.match(regex);
		let price, isAvailable;

		if (match && match[1]) {
			price = match[1];
			console.log("Нашли цену");
		} else {
			price = "Цена не определена"
			console.log("Цена не найдена");
		}

		const toolsLocations = responseString.indexOf("smallElementTools");
		const searchValueBeLocation = responseString.indexOf(searchValueAvailability, toolsLocations);
		const letter = responseString.slice(searchValueBeLocation - 2, searchValueBeLocation - 1);


		const isUpperCase = letter === letter.toUpperCase();

		if (isUpperCase) {
			isAvailable = 1;
			console.log("Товар в наличии");
		} else {
			isAvailable = 0;
			console.log("Товара нет в наличии");
		}

		return { price, isAvailable };
	} catch (error) {
		console.error(error);
	}
}
