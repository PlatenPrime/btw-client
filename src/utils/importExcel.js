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



export const importFromExcelComps = (e) => {
	e.preventDefault();
	let restoredData
	if (e.target.files) {
		const reader = new FileReader();

		reader.onload = (e) => {
			const data = new Uint8Array(e.target.result);
			const workbook = xlsx.read(data, { type: 'array' });
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			const jsonData = xlsx.utils.sheet_to_json(worksheet);

			// Обратное преобразование данных для восстановления вложенных объектов
			restoredData = jsonData.map(item => ({
				artikul: item.artikul,
				nameukr: item.nameukr,
				prod: item.prod,
				competitorsLinks: {
					sharteLink: item["competitorsLinks.sharteLink"]
				},
				avail: {
					btrade: item["avail.btrade"],
					sharte: item["avail.sharte"]
				},
				price: {
					btrade: item["price.btrade"],
					sharte: item["price.sharte"]
				}
			}));

			console.log(restoredData);

			// Вызывайте здесь любые дополнительные функции или обработку данных
		};

		reader.readAsArrayBuffer(e.target.files[0]);
	}
	return restoredData;


};





