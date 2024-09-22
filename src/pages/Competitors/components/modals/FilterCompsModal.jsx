import React from 'react'
import { ButtonBlock, CardBlock, ModalWrapper, TextBlock } from '../../../../components'
import { LuFilterX } from 'react-icons/lu';
import { exportCompStampByProdToExcel } from '../../../../utils/exportExcel';

export default function FilterCompsModal({

	isShowFilterModal,
	setIsShowFilterModal,
	filteredComps,
	comps,
	compStamps,
	setFilter,
	filter,
	resetFilter,
	prodOptions,
	categoryOptions,
	sizesOptions,
	setSelectedCategory,
	setSelectedSubcategory,
	subcategoriesList,
	selectedCategory

}) {







	if (!isShowFilterModal) return null


	return (
		<ModalWrapper
			title="Фільтр"
			onCancel={() => setIsShowFilterModal(false)}

		>
			<CardBlock
				className="flex flex-col items-center justify-between gap-2 p-2  bg-slate-700/50 rounded-xl"
			>


				<CardBlock
					className="flex items-center justify-between w-full px-3   space-x-1"
				>

					<TextBlock
						className="text-lg"
					>
						Вибрано артикулів:	{filteredComps?.length} із {comps?.length}
					</TextBlock>

					<ButtonBlock
						className="red-b flex items-center space-x-1"
						onClick={resetFilter}
					>
						<TextBlock
							className="text-xl"
						>
							<LuFilterX />
						</TextBlock>
					</ButtonBlock>

				</CardBlock>



				<CardBlock
					className="flex flex-col gap-2">

					<select
						className="InputBlock focus:bg-slate-900 text-base "
						value={filter?.abcLetter}
						onChange={(e) => setFilter({ ...filter, abcLetter: e.target.value })}
					>
						<option value="">ABC</option>
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
						<option value="D">D</option>
						<option value="E">E</option>
						<option value="F">F</option>

					</select>



					<select
						className="InputBlock focus:bg-slate-900 text-base "
						value={filter?.prod}
						onChange={(e) => setFilter({ ...filter, prod: e.target.value })}
					>
						<option
							value="">
							Виробник
						</option>
						{prodOptions?.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>

					<select
						className="InputBlock focus:bg-slate-900 text-base "
						value={filter?.category}
						onChange={(e) => {
							setSelectedCategory(e.target.value);
							setSelectedSubcategory(""); // Сбросить выбранную подкатегорию при изменении категории
							setFilter({ ...filter, category: e.target.value, subcategory: "" });
						}}
					>
						<option
							value="">
							Категорія
						</option>
						{categoryOptions?.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>

					<select
						className="InputBlock focus:bg-slate-900 text-base "
						value={filter?.subcategory}
						onChange={(e) => {
							setSelectedSubcategory(e.target.value);
							setFilter({ ...filter, subcategory: e.target.value });
						}}
					>
						<option
							value="">
							Підкатегорія
						</option>
						{subcategoriesList[selectedCategory]?.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>


					<select
						className="InputBlock focus:bg-slate-900 text-base"
						value={filter?.size}
						onChange={(e) => setFilter({ ...filter, size: e.target.value })}
					>
						<option
							className=''
							value="">
							Розмір
						</option>
						{sizesOptions?.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>

				</CardBlock>


				<CardBlock className="w-full">
					<ButtonBlock
						className="green-b w-full"
						onClick={() => setIsShowFilterModal(false)}
					>
						OK
					</ButtonBlock>
				</CardBlock>


				{/* <CardBlock className="w-full">
					<ButtonBlock
						className="blue-b w-full"
						onClick={() => exportCompStampByProdToExcel(filteredComps,  compStamps,  ) }
					>
						Console
					</ButtonBlock>
				</CardBlock> */}


			</CardBlock>
		</ModalWrapper>
	)
}
