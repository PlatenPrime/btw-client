import React from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, HeaderBlock, PageBTW } from '../../components'
import { Link } from 'react-router-dom'

export default function SettingsPage() {
	return (
		<PageBTW
			className="space-y-4"
		>
			<HeaderBlock
				className="border border-slate-500 shadow-md shadow-slate-500"
			>
				Налаштування
			</HeaderBlock>



			<CardBlock>
				<ButtonGroup>

					<ButtonGroup.Actions>

					</ButtonGroup.Actions>
					<ButtonGroup.Navigation>
						<ButtonBlock
							className="emerald-b "
						>
							<Link
								to="/createuser"
							>
								Створити користувача
							</Link>
						</ButtonBlock>
					</ButtonGroup.Navigation>




				</ButtonGroup>

			</CardBlock>


		</PageBTW >
	)

}
