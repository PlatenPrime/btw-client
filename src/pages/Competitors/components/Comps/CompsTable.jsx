import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ContainerBlock, ImageArt, TextBlock } from '../../../../components';
import { BsSortAlphaDown } from 'react-icons/bs';


import { prods, categoriesList, subcategoriesList, sizesList } from '../../../../constants/compsData';

import { FilterIcon } from '../../../../components/UI/Icons';
import SelectedCompModal from '../modals/SelectedCompModal';
import FilterCompsModal from '../modals/FilterCompsModal';





export default function CompsTable({

    comps,
}) {



    const [isShowFilterModal, setIsShowFilterModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");



    const [filter, setFilter] = useState({
        prod: '',
        category: "",
        subcategory: "",
        size: "",
        abcLetter: "",

    });




    const [selectedComp, setSelectedComp] = useState(null)
    const [isShowModalComp, setIsShowModalComp] = useState(false)

    const [sortWord, setSortWord] = useState("")


    const prodOptions = prods;
    const categoryOptions = categoriesList;
    const sizesOptions = sizesList;



    const filteredComps = comps?.filter((comp) => {
        return (
            (filter.prod === '' || comp.prod === filter.prod) &&
            (filter.category === '' || comp.category === filter.category) &&
            (filter.subcategory === '' || comp.subcategory === filter.subcategory) &&
            (filter.size === '' || comp.size === filter.size) &&
            (filter.abcLetter === '' || comp.abc?.includes(filter.abcLetter))
        );
    })
        .sort((a, b) => sortComps(a, b))



    function sortComps(a, b) {
        try {
            if (a && b && typeof a.abc === 'string' && typeof b.abc === 'string') {
                if (sortWord === "artikul") {
                    console.log("Sorted comp a", a.artikul);
                    console.log("Sorted comp b", b.artikul);
                    if (a.artikul < b.artikul) {
                        return -1;
                    }
                    if (a.artikul > b.artikul) {
                        return 1;
                    }
                    return 0;
                }

                if (sortWord === "abc") {
                    console.log("Sorted by abc comp a", a.abc);
                    console.log("Sorted by abc comp b", b.abc);

                    const letterA = a.abc.match(/([A-Z]+)/);
                    console.log(letterA)
                    const letterB = b.abc.match(/([A-Z]+)/);
                    console.log(letterB)



                    if (letterA < letterB) return -1;
                    if (letterA > letterB) return 1;

                    const numberA = parseInt(a.abc);
                    const numberB = parseInt(b.abc);

                    if (numberA < numberB) return -1;
                    if (numberA > numberB) return 1;

                }
            }
            return 0;
        } catch (error) {
            console.log(error);
        }
    }




    const handleSortCompsByABC = () => {
        setSortWord("abc")
    }

    const handleSortCompsByArtikul = () => {
        setSortWord("artikul")
    }


    const resetFilter = () => {
        setFilter({
            prod: '',
            category: '',
            subcategory: '',
            size: '',
            abcLetter: '',
        });
    };






    return (

        <>


            <FilterCompsModal

                isShowFilterModal={isShowFilterModal}
                setIsShowFilterModal={setIsShowFilterModal}
                filteredComps={filteredComps}
                comps={comps}
                setFilter={setFilter}
                filter={filter}
                resetFilter={resetFilter}
                prodOptions={prodOptions}
                categoryOptions={categoryOptions}
                sizesOptions={sizesOptions}
                setSelectedCategory={setSelectedCategory}
                setSelectedSubcategory={setSelectedSubcategory}
                subcategoriesList={subcategoriesList}
                selectedCategory={selectedCategory}


            />


            <SelectedCompModal
                setIsShowModalComp={setIsShowModalComp}
                comp={selectedComp}
                isShowModalComp={isShowModalComp}
            />



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
                                    className=" p-0 bg-gradient-to-b from-slate-700/95 to-slate-900/95  min-w-[50px]"
                                    rowSpan="2"
                                    colSpan="1"
                                >
                                    <ButtonBlock
                                        className={` ${filteredComps?.length === comps?.length ? "slate-b" : "fuchsia-b" }  h-full  mx-auto`}
                                        onClick={() => setIsShowFilterModal(true)}
                                    >
                                        <FilterIcon size={24}   />
                                    </ButtonBlock>

                                </th>

                                <th
                                    className=" lg:w-1/4 min-w-[300px]  bg-gradient-to-b from-slate-700/95 to-slate-900/95  hover:bg-sky-500 border-0 transition ease-in-out duration-300 cursor-pointer	 "
                                    rowSpan="2"
                                    colSpan="1"
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
                                            className={`text-3xl  ${sortWord === "artikul" && "text-sky-500"}`}
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
										border-b border-slate-500/40
										hover:bg-gray-800 transition duration-300 ease-in-out 	
										text-sm		"
                                        key={comp._id.$oid}

                                    >

                                        <td
                                            colSpan="2"
                                            className='p-0 bg-sky-800/50  '
                                        >

                                            <CardBlock
                                                className="flex p-0 items-stretch  "
                                            >


                                                <ImageArt
                                                    artikul={comp.artikul}
                                                    size={50}
                                                    className="py-1 bg-white cursor-pointer min-w-[50]"
                                                />


                                                <CardBlock
                                                    className="flex items-center justify-start w-full cursor-pointer 
														hover:bg-sky-500 hover:shadow-lg hover:shadow-sky-500 p-0 rounded-none px-1"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setIsShowModalComp(true);
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
        </>
    )
}
