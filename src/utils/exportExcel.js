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
		category: item.category,
		subcategory: item.subcategory,
		"competitorsLinks.sharteLink": item.competitorsLinks.sharteLink,
		"competitorsLinks.airLink": item.competitorsLinks.airLink,
		"competitorsLinks.yumiArtikul": item.competitorsLinks.yumiArtikul,
		"avail.btrade": item.avail.btrade,
		"avail.sharte": item.avail.sharte,
		"avail.yumi": item.avail.yumi,
		"avail.air": item.avail.air,
		"price.btrade": item.price.btrade,
		"price.sharte": item.price.sharte,
		"price.yumi": item.price.yumi,
		"price.air": item.price.air,
	}));

	const ws = XLSX.utils.json_to_sheet(transformedData);
	const wb = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
	XLSX.writeFile(wb, 'exported_data.xlsx');
}

