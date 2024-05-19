
import { ButtonBlock, CardBlock, ImageArt, TextBlock } from '../../../components'
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import { BsBalloon, BsBoxSeam } from "react-icons/bs";


export default function PositionBage({ pos, onDelete, onEdit, artsDB }) {


	const defaultImageArtikul = "1102-3092"
	const artikul = artsDB?.find((art) => art.artikul === pos?.artikul)





	return (

		<>
			<li className={`grid grid-rows-6 lg:grid-rows-1 lg:grid-cols-6
	 relative  shadow-lg 
	
	 
	 ${pos?.quant ? "hover:bg-teal-500/10 hover:shadow-teal-500": "bg-slate-700/80 hover:bg-slate-700 hover:shadow-slate-700 g " }
	 
	 

		rounded-xl
		transition ease-in-out duration-300	
		
		`}
				key={pos?._id}
			>

				<TextBlock
					className={`
					absolute top-0 left-0 z-10 bg-red-500 rounded-xl
					${pos?.date ? "p-1" : ""}
					
					`}
				>
					{pos?.date}
				</TextBlock>








				<CardBlock
					className="w-full row-span-3 col-span-3 lg:row-span-1 lg:col-span-3 grid grid-cols-3 "
				>


					<CardBlock
						className="col-span-1  bg-white rounded-l-xl grid "
					>

						<ImageArt
							size={100}
							artikul={artikul ? pos?.artikul : ""}
							className="rounded-lg justify-self-center self-center"
						/>

					</CardBlock>





					<CardBlock
						className="grid  col-span-2  p-2 bg-blue-500/10"

					>

						<TextBlock
							className=" text-2xl font-bold text-center self-center justify-self-center  "
						>
							{pos?.artikul}
						</TextBlock>

						<TextBlock
							className=" italic text-center text-lg self-center justify-self-center p-1 "
						>
							{artikul ? artikul?.nameukr.slice(9) : "-"}
						</TextBlock>

					</CardBlock>




				</CardBlock>













				<CardBlock
					className="col-span-3 row-span-2 lg:col-span-2 bg-teal-500/5"
				>




					<CardBlock
						className="flex flex-col  space-x-1  "

					>

						<TextBlock
							className=" text-xl  "
						>
							{pos?.sklad === "pogrebi" ? "Погреби" : pos?.sklad === "merezhi" ? "Мережі" : null}
						</TextBlock>

						<TextBlock
							className=" text-xl  "
						>
							{pos?.com}
						</TextBlock>

					</CardBlock>


					<CardBlock
						className="grid grid-cols-2 p-2 gap-2">


						<CardBlock
							className="flex justify-center items-center"
						>

							<TextBlock
								className="text-sky-100  text-xl"
							><BsBalloon /></TextBlock>

							<TextBlock
								className="text-sky-100  font-bold text-3xl  rounded"
							>
								{pos?.quant}
							</TextBlock>

						</CardBlock>


						<CardBlock
							className="flex justify-center items-center"
						>
							<TextBlock
								className="text-amber-100  text-xl "
							><BsBoxSeam /></TextBlock>

							<TextBlock
								className="text-amber-100  font-bold text-3xl  rounded"
							>
								{pos?.boxes}
							</TextBlock>
						</CardBlock>




					</CardBlock>





				</CardBlock>




				<CardBlock
					className="col-span-3 row-span-1 lg:col-span-1 flex  space-x-2 justify-evenly lg:items-center rounded-b-xl rounded-r-xl p-2  bg-slate-900/10 hover:bg-slate-800">

					<ButtonBlock
						className=" blue-b text-2xl w-full h-full"
						onClick={onEdit}
					>
						<MdOutlineEdit />
					</ButtonBlock>

					<ButtonBlock
						className="red-b text-2xl w-full h-full "
						onClick={onDelete}
					>
						<MdDeleteForever />
					</ButtonBlock>


				</CardBlock>




			</li>

		</>

	)
}
