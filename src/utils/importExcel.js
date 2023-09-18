import * as xlsx from "xlsx";

export const excelToJSONArts = (e) => {
	e.preventDefault();
	let json
	if (e.target.files) {
		const reader = new FileReader();
		reader.onload = (e) => {
			const data = e.target.result;
			const workbook = xlsx.read(data, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			json = xlsx.utils.sheet_to_json(worksheet);
			console.log(json);
		};
		reader.readAsArrayBuffer(e.target.files[0]);
		return json;
	}
}



export const importFromExcelComps = async (e) => {
	e.preventDefault();

	if (e.target.files) {
		const file = e.target.files[0];

		if (!file) {
			return []; // Если файл не выбран, возвращаем пустой массив или другое значение по умолчанию
		}

		const reader = new FileReader();

		// Создаем обещание для асинхронной операции чтения файла
		const readPromise = new Promise((resolve, reject) => {
			reader.onload = (event) => {
				resolve(event.target.result);
			};

			reader.onerror = (event) => {
				reject(event.error);
			};
		});

		reader.readAsArrayBuffer(file);

		try {
			// Ожидаем завершения чтения файла
			const fileData = await readPromise;

			const data = new Uint8Array(fileData);
			const workbook = xlsx.read(data, { type: 'array' });
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			const jsonData = xlsx.utils.sheet_to_json(worksheet);

			// Обратное преобразование данных для восстановления вложенных объектов
			const restoredData = jsonData.map(item => ({
				artikul: item.artikul,
				nameukr: item.nameukr,
				prod: item.prod,
				category: item["category"],
				subcategory: item["subcategory"],
				size: item["size"],
				competitorsLinks: {
					sharteLink: item["competitorsLinks.sharteLink"],
					airLink: item["competitorsLinks.airLink"],
					yumiArtikul: item["competitorsLinks.yumiArtikul"],
				},
				avail: {
					btrade: item["avail.btrade"],
					sharte: item["avail.sharte"],
					air: item["avail.air"],
					yumi: item["avail.yumi"],
				},
				price: {
					btrade: item["price.btrade"],
					sharte: item["price.sharte"],
					air: item["price.air"],
					yumi: item["price.yumi"],
				}
			}));

			console.log(restoredData);

			// Возвращаем восстановленные данные
			return restoredData;
		} catch (error) {
			// Обработка ошибок, если такие возникнут при чтении файла или обработке данных
			console.error(error);
			throw error; // Пробрасываем ошибку дальше, если нужно
		}
	} else {
		return []; // Если файлы отсутствуют, возвращаем пустой массив или другое значение по умолчанию
	}
};





