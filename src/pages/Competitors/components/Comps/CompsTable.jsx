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


    const [showData, setShowData] = useState("avail");


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
                className="flex-grow overflow-auto  mb-1 relative p-0 rounded-t-none"
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
                                        className={` ${filteredComps?.length === comps?.length ? "slate-b" : "fuchsia-b"}  h-full  mx-auto`}
                                        onClick={() => setIsShowFilterModal(true)}
                                    >
                                        <FilterIcon size={24} />
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
                                <th className="  bg-slate-800/90">Btrade</th>
                                <th className="  bg-slate-800/90 ">Yumi</th>
                                <th className="  bg-slate-800/90  ">Idea</th>

                                <th className="  bg-slate-800/90 ">Sharte</th>
                                <th className="  bg-slate-800/90 ">Air</th>
                                <th className="  bg-slate-800/90 ">Best</th>

                                <th className="  bg-slate-800/90 ">Aero</th>
                                <th className="  bg-slate-800/90 ">Balun</th>
                                <th className="  bg-slate-800/90 ">Svyato</th>
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
                                            className='p-0 bg-fuchsia-800/50  '
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
														hover:bg-fuchsia-500 hover:shadow-lg hover:shadow-fuchsia-500 p-0 rounded-none px-1"
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
                                            className="text-emerald-200 bg-emerald-800/10"
                                        >
                                            {comp?.abc}
                                        </td>

                                        <td
                                            className={` w-1/12 `}
                                        >
                                            <span className={`p-2 rounded-xl shadow-md  
                                                ${showData === "avail" ?
                                                    "text-blue-300  "
                                                    : "text-green-500 "} `}>
                                                {comp[showData]?.btrade ?? "-"}
                                            </span>
                                        </td>


                                        <td
                                            className={` w-1/12  `}
                                        >
                                            <span className={`p-2 rounded-xl shadow-md  ${comp[showData]?.yumi === "N/A"
                                                ? "text-gray-400 bg-gray-500/20  "
                                                : showData === "avail"
                                                    ? "text-blue-300 "
                                                    : "text-green-500 "} `}>
                                                {comp[showData]?.yumi}
                                            </span>
                                        </td>



                                        <td
                                            className={` w-1/12  `}
                                        >
                                            <span className={`p-2 rounded-xl shadow-md  ${comp[showData]?.idea === "N/A"
                                                ? "text-gray-400 bg-gray-500/20  "
                                                : showData === "avail"
                                                    ? "text-blue-300 "
                                                    : "text-green-500 "} `}>
                                                {comp[showData]?.idea}
                                            </span>
                                        </td>




                                        <td className={` w-1/12  `} >
                                            <span
                                                className={`p-2 rounded-xl shadow-md   ${comp[showData]?.sharte === "N/A" ? "text-gray-200 bg-gray-500/20 shadow-gray-500/20 " : comp?.avail?.sharte === false ? "text-red-200 bg-red-500/20 shadow-red-500/20 " : "text-green-200 bg-green-500/20 shadow-green-500/20"} `}
                                            >
                                                {comp[showData]?.sharte === "N/A" ? comp[showData]?.sharte : comp[showData]?.sharte === false ? "Немає" : "Є"}
                                            </span>
                                        </td>





                                        <td className={` w-1/12  `} >
                                            <span
                                                className={`p-2 rounded-xl shadow-md  ${comp[showData]?.air === "N/A" ? "text-gray-200 bg-gray-500/20 shadow-gray-500/20" : comp?.avail?.air === false ? "text-red-200 bg-red-500/20 shadow-red-500/20" : "text-green-200 bg-green-500/20 shadow-green-500/20"} `}
                                            >
                                                {comp[showData]?.air === "N/A" ? comp[showData]?.air : comp[showData]?.air === false ? "Немає" : "Є"}
                                            </span>

                                        </td>

                                        <td className={` w-1/12  `}
                                        >
                                            <span
                                                className={` p-2 rounded-xl shadow-md  ${comp[showData]?.best === "N/A" ? "text-gray-200 bg-gray-500/20 shadow-gray-500/20" : comp?.avail?.best === false ? "text-red-200 bg-red-500/20 shadow-red-500/20" : "text-green-200 bg-green-500/20 shadow-green-500/20"} `}
                                            >
                                                {comp[showData]?.best === "N/A" ? comp[showData]?.best : comp[showData]?.best === false ? "Немає" : "Є"}
                                            </span>

                                        </td>

                                        <td className='text-green-500 w-1/12  bg-slate-900/50 ' >
                                            {comp[showData]?.btrade}
                                        </td>
                                        <td className='text-yellow-400 w-1/12  bg-slate-900/50' >
                                            {comp[showData]?.yumi ? comp[showData]?.yumi : "-"}
                                        </td>

                                        <td className='text-yellow-400 w-1/12  bg-slate-900/50' >
                                            {comp[showData]?.sharte}
                                        </td>


                                        <td className='text-yellow-400 w-1/12  bg-slate-900/50' >
                                            {comp[showData]?.air ? comp?.price?.air : "-"}
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
