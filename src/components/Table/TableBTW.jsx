import { useState } from 'react';

function TableBTW() {
	const [isEditing, setIsEditing] = useState(false);
	const [firstName, setFirstName] = useState('1102-0260');
	const [lastName, setLastName] = useState('10000');

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		setIsEditing(false);
	};

	const handleFirstNameChange = (event) => {
		setFirstName(event.target.value);
	};

	const handleLastNameChange = (event) => {
		setLastName(event.target.value);
	};

	return (
		<div className="flex flex-col w-full">
			<div className="-my-2 overflow-x-auto ">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										First Name
									</th>
									<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Last Name
									</th>
									<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								<tr>
									{isEditing ? (
										<>
											<td className="px-6 py-4 whitespace-nowrap">
												<input type="text" className="border border-gray-300 rounded-md px-3 py-2 text-black w-full" value={firstName} onChange={handleFirstNameChange} />
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<input type="text" className="border border-gray-300 rounded-md px-3 py-2 text-black w-full" value={lastName} onChange={handleLastNameChange} />
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSaveClick}>
													Save
												</button>
											</td>
										</>
									) : (
										<>
											<td className="px-6 text-black py-4 whitespace-nowrap">
												{firstName}
											</td>
											<td className="px-6 text-black py-4 whitespace-nowrap">
												{lastName}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleEditClick}>
													Edit
												</button>
											</td>
										</>
									)}
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TableBTW;
