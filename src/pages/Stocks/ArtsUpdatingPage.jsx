import React from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, HeaderBlock, PageBTW, TextBlock } from '../../components'
import { Link } from 'react-router-dom'

export default function ArtsUpdatingPage() {
	return (
		<PageBTW
			className="space-y-4"
		>

			<HeaderBlock
				className="border border-emerald-500 shadow-md shadow-emerald-500 "
			>
				<TextBlock className="">
					Оновлення артикулів
				</TextBlock>
			</HeaderBlock>


			<CardBlock
				className="p-1 space-y-2 min-h-screen"
			>

				<ButtonGroup>
					<ButtonBlock
						className="sky-b "
					>
						<Link
							to="/arts"
						>
							Артикули
						</Link>
					</ButtonBlock>
				</ButtonGroup>


			</CardBlock>
		</PageBTW>
	)
}
