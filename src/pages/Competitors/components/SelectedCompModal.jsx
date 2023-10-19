import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ImageArt, ImageBlock, Spinner, TextBlock } from '../../../components'
import { Link } from 'react-router-dom'
import axios from "../../../utils/axios"
import { toast } from 'react-toastify'

export default function SelectedCompModal({ selectedComp: comp }) {

	const [isDeleting, setIsDeleting] = useState(false)

	const handleDelete = async () => {
		try {

			setIsDeleting(true)
			const res = await axios.delete(`comps/${comp._id}`);
			console.log(res);
			toast.info("Артикул удален")


		} catch (error) {
			console.log(error);
		} finally {
			setIsDeleting(false)
		}
	}



	return (
		<CardBlock
		className = "space-y-2"
		>

			<CardBlock
				className="flex space-x-6 bg-gray-700/10 p-2"
			>


				<ImageArt
					artikul={comp.artikul}
					size={100}
					className="rounded"
				/>

				<TextBlock
					className="text-xl text-slate-100"
				>{comp.nameukr}</TextBlock>

			</CardBlock>


			<table>
				<thead>
					<th
						className="text-lg text-center w-full"
						colSpan={2}
					>
						Характеристики
					</th>
				</thead>
				<tbody

				>
					<tr
						className="border border-slate-500 "
					>
						<td
							className='text-left'
						>
							Категорія:
						</td>
						<td>
							{comp.category}
						</td>
					</tr>
					<tr
						className="border border-slate-500 "
					>
						<td
							className='text-left'
						>
							Підкатегорія:
						</td>
						<td>
							{comp.subcategory}
						</td>
					</tr>
					<tr
						className="border border-slate-500 "
					>
						<td
							className='text-left'
						>
							Розмір:
						</td>
						<td>
							{comp.size}
						</td>
					</tr>
				</tbody>

			</table>



			<table>

				<thead>

					<th
						className="text-lg text-center w-full"
						colSpan={2}
					>
						Посилання

					</th>
				</thead>


				<tbody>

					<tr
						className="border border-slate-500 "
					>
						<td
							className='text-left'
						> Sharte:</td>
						<td
							className='text-left'
						>
							<a href={comp.competitorsLinks.sharteLink} target='blanked'>
								{comp.competitorsLinks.sharteLink.slice(0, 50)}...
							</a>
						</td>
					</tr>

					<tr
						className="border border-slate-500 "
					>
						<td
							className='text-left'
						> Yumi:</td>
						<td
							className='text-left'
						>
							<a href={comp.competitorsLinks.yumiLink} target='blanked'>
								{comp.competitorsLinks.yumiLink ? comp.competitorsLinks.yumiLink.slice(0, 50) + "..." : "-"}
							</a>
						</td>
					</tr>

					<tr
						className="border border-slate-500 "
					>
						<td
							className='text-left'
						> Air:</td>
						<td
							className='text-left'
						>
							<a href={comp.competitorsLinks.airLink} target='blanked'>
								{comp.competitorsLinks.airLink ? comp.competitorsLinks.airLink.slice(0, 50) + "..." : "-"}
							</a>
						</td>
					</tr>


					<tr
						className = "border border-slate-500 "
					>
						<td
							className='text-left'
						> Best:</td>
						<td
							className='text-left'
						>
							<a href={comp.competitorsLinks.bestLink} target='blanked'>
								{comp.competitorsLinks.bestLink ? comp.competitorsLinks.bestLink.slice(0, 50) + "..." : "-"}
							</a>
						</td>
					</tr>
				</tbody>

			</table>


			<ButtonBlock
				className="delete-c flex items-center space-x-2 mx-auto"
				onClick={handleDelete}
			>
				<TextBlock>Видалити артикул з бази</TextBlock>
				{isDeleting && <Spinner color="red" />}
			</ButtonBlock>




		</CardBlock>
	)
}
