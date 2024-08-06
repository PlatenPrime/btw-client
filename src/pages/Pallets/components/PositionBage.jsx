
import { ButtonBlock, CardBlock, ImageArt, TextBlock } from '../../../components'
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import { BsBalloon, BsBoxSeam } from "react-icons/bs";
import { BalloonIcon, BoxIcon, DeleteIcon, EditIcon } from '../../../components/UI/Icons';


export default function PositionBage({ pos, onDelete, onEdit, artsDB }) {


	const defaultImageArtikul = "1102-3092"
	const artikul = artsDB?.find((art) => art.artikul === pos?.artikul)





	return (


		<CardBlock className={`grid grid-rows-6 lg:grid-rows-1 lg:grid-cols-6
	   shadow-lg 
	group
	 
	 ${pos?.quant ?
				" hover:shadow-2xl hover:shadow-lg  hover:shadow-teal-500 hover:bg-teal-500   bg-gradient-to-b from-teal-500/50 to-teal-700/50 " :
				" hover:shadow-2xl hover:shadow-lg  hover:shadow-slate-500 hover:bg-slate-500   bg-gradient-to-b from-slate-500/50 to-slate-700/50  "}
	 
	
		rounded-xl
		transition-all ease-in-out duration-500	
		
		`}
			key={pos?._id}
		>










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
					className="grid  col-span-2  p-2  cursor-pointer hover:bg-sky-500"
					onClick={() => {
						const artId = artsDB?.find(art => art.artikul === pos.artikul)?._id || "";
						const url = `/arts/${artId}`;
						window.open(url, "_blank");
					}}
				>

					<TextBlock
						className=" text-xl font-bold text-center self-center justify-self-center  "
					>
						{pos?.artikul}
					</TextBlock>

					<TextBlock
						className=" italic text-center text-base self-center justify-self-center p-1 "
					>
						{artikul ? artikul?.nameukr.slice(9) : "-"}
					</TextBlock>

				</CardBlock>




			</CardBlock>













			<CardBlock
				className="col-span-3 row-span-2 lg:col-span-2 "
			>




				<CardBlock
					className="flex flex-col items-center   text-base p-2 "

				>


					{pos?.date && <TextBlock
						className={`
					bg-red-500 rounded-xl p-1 
					`}
					>
						{pos?.date}
					</TextBlock>}


					<TextBlock
						className=" text-base  "
					>
						{pos?.sklad === "pogrebi" ? "Погреби" : pos?.sklad === "merezhi" ? "Мережі" : null}
					</TextBlock>

					<TextBlock
						className=" text-base  "
					>
						{pos?.com}
					</TextBlock>




				</CardBlock>


				<CardBlock
					className="grid grid-cols-2 p-2 gap-2">


					<TextBlock
						className="  text-base"
					>
						<BalloonIcon size={12} />
						{pos?.quant}
					</TextBlock>

					<TextBlock
						className=" text-base "
					>
						<BoxIcon size={12} />
						{pos?.boxes}
					</TextBlock>





				</CardBlock>





			</CardBlock>




			<CardBlock
				className="hidden group-hover:flex  col-span-3 row-span-1 lg:col-span-1   justify-evenly lg:items-center rounded-xl    group-transition duration-1000  ">

				<ButtonBlock
					className="bg-transparent shadow-none blue-b-n text-2xl w-full  h-full"
					onClick={onEdit}
				>
					<EditIcon size={24} />
				</ButtonBlock>

				<ButtonBlock
					className="red-b-n bg-transparent shadow-none text-2xl w-full h-full "
					onClick={onDelete}
				>
					<DeleteIcon size={24} />
				</ButtonBlock>


			</CardBlock>




		</CardBlock>



	)
}
