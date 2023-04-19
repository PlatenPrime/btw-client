
import React from 'react';
import { ControlContext } from '../../../Layout';
import CardBlock from '../../../blocks/CardBlock';


const ControlBTW = ({ children }) => {

	const display = React.useContext(ControlContext);

	return (

		<>

			<CardBlock className=" hidden min-h-fit h-full max-h-screen w-1/4 
			md:flex flex-col items-center justify-start
			bg-opacity-0 m-0
			
			">
				<div className="w-full md:flex flex-col items-center justify-start p-2 " >

					{children}

				</div>

			</CardBlock>







			{display &&


				<div className=" md:hidden w-full p-3  fixed bottom-0 left-0 min-h-fit max-h-screen 
		
		
		bg-gray-100 bg-opacity-10 ">


					<CardBlock className=' md:flex flex-col items-center justify-start md:mt-16  '>
						{children}
					</CardBlock>


				</div>

			}


		</>


	);
};

export default ControlBTW;