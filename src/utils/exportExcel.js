import * as  XLSX from 'xlsx';




export function exportToExcel(data) {
	const ws = XLSX.utils.json_to_sheet(data);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
	XLSX.writeFile(wb, 'exported_data.xlsx');
}



export function exportToExcelComps(data) {
	// Преобразование данных для экспорта
	const transformedData = data.map(item => ({
		artikul: item?.artikul,
		nameukr: item?.nameukr,
		prod: item?.prod,
		category: item?.category,
		subcategory: item?.subcategory,
		size: item?.size,
		abc: item?.abc,
		"competitorsLinks.sharteLink": item?.competitorsLinks?.sharteLink,
		"competitorsLinks.airLink": item?.competitorsLinks?.airLink,
		"competitorsLinks.yumiLink": item?.competitorsLinks?.yumiLink,
		"competitorsLinks.bestLink": item?.competitorsLinks?.bestLink,
		"avail.btrade": item?.avail?.btrade,
		"avail.sharte": item?.avail?.sharte,
		"avail.yumi": item?.avail?.yumi,
		"avail.air": item?.avail?.air,
		"avail.best": item?.avail?.best,
		"price.btrade": item?.price?.btrade,
		"price.sharte": item?.price?.sharte,
		"price.yumi": item?.price?.yumi,
		"price.air": item?.price?.air,
		"price.best": item?.price?.best,
	}));




	const ws = XLSX.utils.json_to_sheet(transformedData);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');



	// Получаем текущую дату в формате ГГГГ-ММ-ДД
	const currentDate = new Date().toISOString().slice(0, 10);

	// Создаем название файла, объединяя "konkurenty" и текущую дату
	const fileName = `konkurenty_${currentDate}.xlsx`;
	// Записываем файл с новым названием
	XLSX.writeFile(wb, fileName);
}





export async function exportToExcelPoses(allPoses, artsDB) {



	const data = allPoses.reduce((result, currentObj) => {
		const existingObj = result.find((obj) => obj.artikul === currentObj.artikul && obj.sklad === currentObj.sklad);

		if (existingObj) {
			// Если объект с таким artikul и sklad уже есть, обновляем quant
			existingObj.quant += currentObj.quant;
		} else {
			// Если нет, добавляем новый объект
			result.push({ artikul: currentObj.artikul, sklad: currentObj.sklad, quant: currentObj.quant });
		}
		return result;
	}, []);




	// Преобразование данных для экспорта
	const transformedData = data.map(item => ({
		"Артикул": item?.artikul,
		"Повна назва": artsDB?.find(art => art?.artikul === item?.artikul)?.nameukr,
		"Склад": item?.sklad === "pogrebi" ? "Погреби склад" : item?.sklad === "merezhi" ? "Мережі" : null,
		"Кількість": item?.quant,
	}));



	const ws = XLSX.utils.json_to_sheet(transformedData);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');



	// Получаем текущую дату в формате ГГГГ-ММ-ДД
	const currentDate = new Date().toISOString().slice(0, 10);

	// Создаем название файла
	const fileName = `stocks_${currentDate}.xlsx`;
	// Записываем файл с новым названием
	XLSX.writeFile(wb, fileName);
}

