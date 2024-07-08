import React from 'react'
import { CardBlock, ContainerBlock, ImageArt, TextBlock } from '../../../components';
import { BsSortAlphaDown } from 'react-icons/bs';

export default function CompsTable({
    handleSortCompsByArtikul,
    sortWord,
    handleSortCompsByABC,
    filteredComps,
    setShowModalComp,
    setSelectedComp,


}) {
    return (
        <ContainerBlock
            className="flex-grow overflow-auto  mb-1 relative pt-0 px-0 rounded-t-none"
        >

            <div
                className='max-h-screen   '
            >
                <table className="min-w-full text-sm "  >

                    <thead className="  sticky top-0">
                        <tr className=''>
                            {/* Заголовки таблицы */}
                            <th
                                className=" lg:w-1/4  bg-gradient-to-b from-slate-700/95 to-slate-900/95  hover:bg-sky-500 border-0 transition ease-in-out duration-300 cursor-pointer	 "
                                rowSpan="2"
                                colSpan="2"
                                onClick={handleSortCompsByArtikul}
                            >
                                <TextBlock
                                    className="space-x-2"
                                >

                                    <TextBlock
                                    >
                                        Артикул
                                    </TextBlock>

                                    <TextBlock
                                        className={`text-3xl  ${sortWord === "artikul" && "text-green-500"}`}
                                    >
                                        <BsSortAlphaDown />
                                    </TextBlock>

                                </TextBlock>

                            </th>
                            <th
                                className="  bg-gradient-to-b from-slate-700/95 to-slate-900/95    hover:bg-green-500 border-0 transition ease-in-out duration-300	cursor-pointer	 "
                                rowSpan="2"
                                onClick={handleSortCompsByABC}
                            >
                                <TextBlock
                                    className="space-x-2"
                                >

                                    <TextBlock
                                    >
                                        ABC
                                    </TextBlock>

                                    <TextBlock
                                        className={`text-3xl  ${sortWord === "abc" && "text-green-300"}`}
                                    >
                                        <BsSortAlphaDown />
                                    </TextBlock>

                                </TextBlock>
                            </th>
                            <th className=" bg-gradient-to-b from-slate-700/95 to-slate-900/95  " colSpan="5">
                                Наявність
                            </th>
                            <th className=" bg-gradient-to-b from-slate-700/95 to-slate-900/95  " colSpan="5">
                                Ціна
                            </th>
                        </tr>
                        <tr>
                            {/* Заголовки для данных */}
                            <th className="  bg-gradient-to-b from-blue-500/90 to-blue-700/90">Btrade</th>
                            <th className="  bg-gradient-to-b from-amber-500/90 to-amber-700/90 ">Yumi</th>
                            <th className="  bg-gradient-to-b from-sky-500/90 to-sky-700/90">Sharte</th>
                            <th className="  bg-gradient-to-b from-lime-500/90 to-lime-700/90">Air</th>
                            <th className="  bg-gradient-to-b from-pink-500/90 to-pink-700/90">Best</th>

                            <th className="  bg-gradient-to-b from-blue-500/90 to-blue-700/90">Btrade</th>
                            <th className="  bg-gradient-to-b from-amber-500/90 to-amber-700/90 ">Yumi</th>
                            <th className="  bg-gradient-to-b from-sky-500/90 to-sky-700/90">Sharte</th>
                            <th className="  bg-gradient-to-b from-lime-500/90 to-lime-700/90">Air</th>
                            <th className="  bg-gradient-to-b from-pink-500/90 to-pink-700/90">Best</th>
                        </tr>
                    </thead>



                    <tbody className=' ' >
                        {

                            filteredComps?.map((comp) => (
                                <tr
                                    className="bg-slate-900 
										
										hover:bg-gray-800 transition duration-300 ease-in-out 	
										text-sm		"
                                    key={comp._id.$oid}

                                >

                                    <td
                                        colSpan="2"
                                        className='p-0 bg-sky-800/50'
                                    >

                                        <CardBlock
                                            className="flex p-0 items-stretch "
                                        >


                                            <ImageArt
                                                artikul={comp.artikul}
                                                size={50}
                                                className="py-1 bg-white cursor-pointer"
                                            />


                                            <CardBlock
                                                className="flex items-center justify-start w-full cursor-pointer 
														hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500 p-0 rounded-none px-1"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setShowModalComp(true);
                                                    setSelectedComp(comp)
                                                }}

                                            >

                                                <TextBlock
                                                    className="text-left text-sm  "


                                                >
                                                    {comp.nameukr}
                                                </TextBlock>

                                            </CardBlock>


                                        </CardBlock>

                                    </td>



                                    <td
                                        className="text-emerald-200 bg-emerald-500/10"
                                    >
                                        {comp?.abc}
                                    </td>

                                    <td
                                        className={` w-1/12 `}
                                    >
                                        <span className={`p-2 rounded-xl shadow-md  ${comp?.avail?.btrade ? "text-blue-200 bg-blue-500/20 shadow-blue-500/20 " : "text-rose-200 bg-rose-500/20"} `}>
                                            {comp?.avail?.btrade ?? "-"}
                                        </span>
                                    </td>


                                    <td
                                        className={` w-1/12  `}
                                    >
                                        <span className={`p-2 rounded-xl shadow-md  ${comp?.avail?.yumi === "N/A" ? "text-gray-200 bg-gray-500/20 shadow-gray-500/20 " : comp?.avail?.yumi === 0 ? "text-red-200 bg-red-500/20 shadow-red-500/20 " : "text-blue-200 bg-blue-500/20 shadow-blue-500/20 "} `}>
                                            {comp?.avail?.yumi}
                                        </span>
                                    </td>



                                    <td className={` w-1/12  `} >
                                        <span
                                            className={`p-2 rounded-xl shadow-md   ${comp?.avail?.sharte === "N/A" ? "text-gray-200 bg-gray-500/20 shadow-gray-500/20 " : comp?.avail?.sharte === false ? "text-red-200 bg-red-500/20 shadow-red-500/20 " : "text-green-200 bg-green-500/20 shadow-green-500/20"} `}
                                        >
                                            {comp?.avail?.sharte === "N/A" ? comp?.avail?.sharte : comp?.avail?.sharte === false ? "Немає" : "Є"}
                                        </span>
                                    </td>





                                    <td className={` w-1/12  `} >
                                        <span
                                            className={`p-2 rounded-xl shadow-md  ${comp?.avail?.air === "N/A" ? "text-gray-200 bg-gray-500/20 shadow-gray-500/20" : comp?.avail?.air === false ? "text-red-200 bg-red-500/20 shadow-red-500/20" : "text-green-200 bg-green-500/20 shadow-green-500/20"} `}
                                        >
                                            {comp?.avail?.air === "N/A" ? comp?.avail?.air : comp?.avail?.air === false ? "Немає" : "Є"}
                                        </span>

                                    </td>

                                    <td className={` w-1/12  `}
                                    >
                                        <span
                                            className={` p-2 rounded-xl shadow-md  ${comp?.avail?.best === "N/A" ? "text-gray-200 bg-gray-500/20 shadow-gray-500/20" : comp?.avail?.best === false ? "text-red-200 bg-red-500/20 shadow-red-500/20" : "text-green-200 bg-green-500/20 shadow-green-500/20"} `}
                                        >
                                            {comp?.avail?.best === "N/A" ? comp?.avail?.best : comp?.avail?.best === false ? "Немає" : "Є"}
                                        </span>

                                    </td>

                                    <td className='text-green-500 w-1/12  bg-slate-900/50 ' >
                                        {comp?.price?.btrade}
                                    </td>
                                    <td className='text-yellow-400 w-1/12  bg-slate-900/50' >
                                        {comp?.price?.yumi ? comp?.price?.yumi : "-"}
                                    </td>

                                    <td className='text-yellow-400 w-1/12  bg-slate-900/50' >
                                        {comp?.price?.sharte}
                                    </td>


                                    <td className='text-yellow-400 w-1/12  bg-slate-900/50' >
                                        {comp?.price?.air ? comp?.price?.air : "-"}
                                    </td>
                                    <td className='text-yellow-400 w-1/12  bg-slate-900/50' >
                                        {comp?.price?.best ? comp?.price?.best : "-"}
                                    </td>


                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </ContainerBlock>
    )
}
