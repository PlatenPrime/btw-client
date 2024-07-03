import React from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, HeaderBlock, PageBTW } from '../../components'
import { Link } from 'react-router-dom'

export default function SettingsPage() {
	return (
		<PageBTW
			className=""
		>
			<HeaderBlock
				className=" bg-slate-700 shadow-lg shadow-slate-700"
			>
				Налаштування
			</HeaderBlock>



			<CardBlock>
				<ButtonGroup>


					<ButtonGroup.Navigation>
						<ButtonBlock
							className="emerald-b-n "
						>
							<Link
								to="/createuser"
							>
								Створити користувача
							</Link>
						</ButtonBlock>
					</ButtonGroup.Navigation>

					<ButtonGroup.Actions>

					</ButtonGroup.Actions>


				</ButtonGroup>

			</CardBlock>


		</PageBTW >
	)

}
