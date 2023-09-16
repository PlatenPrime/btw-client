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
		artikul: item.artikul,
		nameukr: item.nameukr,
		prod: item.prod,
		"competitorsLinks.sharteLink": item.competitorsLinks.sharteLink,
		"avail.btrade": item.avail.btrade,
		"avail.sharte": item.avail.sharte,
		"price.btrade": item.price.btrade,
		"price.sharte": item.price.sharte,
	}));

	const ws = XLSX.utils.json_to_sheet(transformedData);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
	XLSX.writeFile(wb, 'exported_data.xlsx');
}

