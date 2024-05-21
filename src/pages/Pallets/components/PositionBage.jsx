
import { ButtonBlock, CardBlock, ImageArt, TextBlock } from '../../../components'
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import { BsBalloon, BsBoxSeam } from "react-icons/bs";


export default function PositionBage({ pos, onDelete, onEdit, artsDB }) {


	const defaultImageArtikul = "1102-3092"
	const artikul = artsDB?.find((art) => art.artikul === pos?.artikul)





	return (


		<li className={`grid grid-rows-6 lg:grid-rows-1 lg:grid-cols-6
	 relative  shadow-lg 
	group
	 
	 ${pos?.quant ?
				"hover:bg-teal-500 hover:shadow-teal-500 bg-gradient-to-b from-teal-600 to-teal-900/50 hover:from-transparent hover:to-transparent " :
				" hover:bg-slate-700 hover:shadow-slate-700 bg-gradient-to-b from-slate-500 to-teal-slate-900/50 hover:from-transparent hover:to-transparent "}
	 
	
		rounded-xl
		transition-all ease-in-out duration-500	
		
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
					className="grid  col-span-2  p-2 "

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
				className="col-span-3 row-span-2 lg:col-span-2 "
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
				className="hidden group-hover:flex  col-span-3 row-span-1 lg:col-span-1   justify-evenly lg:items-center rounded-xl    group-transition duration-1000  ">

				<ButtonBlock
					className="bg-transparent shadow-none blue-b-n text-2xl w-full  h-full"
					onClick={onEdit}
				>
					<MdOutlineEdit size={24} />
				</ButtonBlock>

				<ButtonBlock
					className="red-b-n bg-transparent shadow-none text-2xl w-full h-full "
					onClick={onDelete}
				>
					<MdDeleteForever size={24} />
				</ButtonBlock>


			</CardBlock>




		</li>



	)
}