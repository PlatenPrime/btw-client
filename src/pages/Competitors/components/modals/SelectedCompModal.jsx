import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ImageArt, ImageBlock, ModalWrapper, Spinner, TextBlock } from '../../../../components'

import { toast } from 'react-toastify'

export default function SelectedCompModal({ comp, isShowModalComp, setIsShowModalComp }) {



	if (!isShowModalComp || !comp) return null


	return (


		<ModalWrapper
			onCancel={() => { setIsShowModalComp(false) }}
			title="Дані по артикулу"

		>
			<CardBlock
				className=""
			>

				<CardBlock
					className="flex gap-2 bg-gray-700/10 "
				>


					<ImageArt
						artikul={comp?.artikul}
						size={100}
						className="rounded-xl"
					/>

					<TextBlock
						className="text-xl w-full text-slate-100 bg-gradient-to-b from-fuchsia-500/50 to-fuchsia-500/50 p-2 rounded-xl cursor-pointer"
						onClick={() => { window.open(`/comps/${comp?._id}`, "_blank");}}
					>
						{comp?.nameukr}
					</TextBlock>

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
							<td 
							className="text-right"
							>
								{comp?.category}
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
							<td
							className="text-right"
							>
								{comp?.subcategory}
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
							<td
							className="text-right"
							>
								{comp?.size}
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
								<a

									href={comp?.competitorsLinks.sharteLink} target='blanked'
									className='hover:text-blue-600'

								>
									{comp?.competitorsLinks.sharteLink.slice(0, 50)}
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
								<a href={comp?.competitorsLinks.yumiLink} target='blanked'
									className='hover:text-blue-600'
								>
									{comp?.competitorsLinks.yumiLink ? comp.competitorsLinks.yumiLink.slice(0, 50) : "-"}
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
								<a href={comp?.competitorsLinks.airLink} target='blanked'
									className='hover:text-blue-600'
								>
									{comp?.competitorsLinks.airLink ? comp?.competitorsLinks.airLink.slice(0, 50) : "-"}
								</a>
							</td>
						</tr>


						<tr
							className="border border-slate-500 "
						>
							<td
								className='text-left'
							> Best:</td>
							<td
								className='text-left'
							>
								<a href={comp?.competitorsLinks.bestLink} target='blanked'
									className='hover:text-blue-600'
								>
									{comp?.competitorsLinks.bestLink ? comp?.competitorsLinks.bestLink.slice(0, 50) : "-"}
								</a>
							</td>
						</tr>
					</tbody>

				</table>


			</CardBlock>
		</ModalWrapper>


	)
}
