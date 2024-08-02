import * as  XLSX from 'xlsx';
import { formatDateToUkrainianShort } from './formatDate';




export function exportToExcel(data) {
	const ws = XLSX.utils.json_to_sheet(data);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
	XLSX.writeFile(wb, 'exported_data.xlsx');
}



export function exportToExcelComps({comps,
	compVariants}) {
	// Преобразование данных для экспорта
	const transformedDataComps = comps?.map(item => ({
		artikul: item?.artikul,
		nameukr: item?.nameukr,
		prod: item?.prod,
		category: item?.category,
		subcategory: item?.subcategory,
		size: item?.size,
		abc: item?.abc,
		"sharteLink": item?.competitorsLinks?.sharteLink,
		"airLink": item?.competitorsLinks?.airLink,
		"yumiLink": item?.competitorsLinks?.yumiLink,
		"bestLink": item?.competitorsLinks?.bestLink,
		"btrade": item?.avail?.btrade,
		"sharte": item?.avail?.sharte,
		"yumi": item?.avail?.yumi,
		"air": item?.avail?.air,
		"best": item?.avail?.best,
		"$btrade": item?.price?.btrade,
		"$sharte": item?.price?.sharte,
		"$yumi": item?.price?.yumi,
		"$air": item?.price?.air,
		"$best": item?.price?.best,
	}));


	const transformedDataCompVariants = compVariants?.map(item => ({
		artikul: item?.artikul,
		title: item?.title,
		prod: item?.prod,
		size: item?.size,
		"sharteLink": item?.competitorsLinks?.sharteLink,
		"airLink": item?.competitorsLinks?.airLink,
		"yumiLink": item?.competitorsLinks?.yumiLink,
		"bestLink": item?.competitorsLinks?.bestLink,
		"sharte": item?.avail?.sharte,
		"yumi": item?.avail?.yumi,
		"air": item?.avail?.air,
		"best": item?.avail?.best,
		"$sharte": item?.price?.sharte,
		"$yumi": item?.price?.yumi,
		"$air": item?.price?.air,
		"$best": item?.price?.best,
	}));





	const wsc = XLSX.utils.json_to_sheet(transformedDataComps);
	const wscv = XLSX.utils.json_to_sheet(transformedDataCompVariants);

	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, wsc, 'Артикули');
	XLSX.utils.book_append_sheet(wb, wscv, 'Варіанти');



	// Получаем текущую дату в формате ГГГГ-ММ-ДД
	const currentDate = new Date().toISOString().slice(0, 10);

	// Создаем название файла, объединяя "konkurenty" и текущую дату
	const fileName = `Конкуренти_${currentDate}.xlsx`;
	// Записываем файл с новым названием
	XLSX.writeFile(wb, fileName);
}





export async function exportToExcelPosesTotal(allPoses, artsDB) {



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






export async function exportToExcelPoses(allPoses, artsDB) {



	// Преобразование данных для экспорта
	const transformedData = allPoses

		.filter(el => el.quant !== 0)
		.filter(el => artsDB?.find(art => art?.artikul === el?.artikul))
		.sort((a, b) => {
			const aArtikulArray = a.artikul?.split("-")
			const bArtikulArray = b.artikul?.split("-")

			if (aArtikulArray[0] - bArtikulArray[0] > 0) return 1
			if (aArtikulArray[0] - bArtikulArray[0] < 0) return -1
			if (aArtikulArray[1] - bArtikulArray[1] > 0) return 1
			if (aArtikulArray[1] - bArtikulArray[1] < 0) return -1
			return 0
		})
		.map(item => ({
			"Артикул": item?.artikul,
			"Повна назва": artsDB?.find(art => art?.artikul === item?.artikul)?.nameukr,
			"Склад": item?.sklad === "pogrebi" ? "Погреби склад" : item?.sklad === "merezhi" ? "Мережі" : null,
			"Кількість": item?.quant,
			"Коробки": item?.boxes,
			"Дата": item?.date,
			"Ряд": item?.rowTitle,
			"Палета": item?.palletTitle,

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





export async function exportCompStampToExcel(data) {
	// Извлекаем artikul из данных
	const artikul = data.artikul;

	// Заголовки столбцов
	const headers = ['Дата', 'BTrade', 'Yumi', 'Sharte',  'Air', 'Best', 'BTrade $', 'Yumi $',  'Sharte $', 'Air $', 'Best $'];

	// Формируем данные для экспорта
	const exportData = data.dates.map(dateEntry => {
		const date = new Date(dateEntry.date);
		return {
			'Дата': formatDateToUkrainianShort(date),
			'BTrade': dateEntry.avail.btrade,
			'Yumi': dateEntry.avail.yumi,
			'Sharte': dateEntry.avail.sharte,
			'Air': dateEntry.avail.air,
			'Best': dateEntry.avail.best,
			'BTrade $': dateEntry.price.btrade,
			'Yumi $': dateEntry.price.yumi,
			'Sharte $': dateEntry.price.sharte,		
			'Air $': dateEntry.price.air,
			'Best $': dateEntry.price.best
		};
	});

	// Создаем рабочий лист
	const ws = XLSX.utils.json_to_sheet(exportData, { header: headers });

	// Создаем рабочую книгу
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

	// Формируем название файла
	const fileName = `${artikul}_хронологія.xlsx`;

	// Экспортируем данные в файл Excel
	XLSX.writeFile(wb, fileName);
}