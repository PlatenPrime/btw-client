import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ContainerBlock, ImageArt, TextBlock } from '../../../../components';
import { BsSortAlphaDown } from 'react-icons/bs';


import { prods, categoriesList, subcategoriesList, sizesList } from '../../../../constants/compsData';

import { CalculateIcon, FilterIcon } from '../../../../components/UI/Icons';
import SelectedCompModal from '../modals/SelectedCompModal';
import FilterCompsModal from '../modals/FilterCompsModal';
import UpdateFilteredCompsModal from '../modals/UpdateFilteredCompsModal';




const availOptions = {
    true: "✅",
    false: "❌",
    "N/A": "N/A",
}


const showDataStyleOptions = {
    avail: "text-blue-300",
    price: "text-green-500",
    "N/A": "text-gray-400 bg-gray-500/20 ",
}



function TableData({
    comp,
    competitor,
    showData,
    numeric

}) {

    return (
        <td
            className={` w-1/12  `}

        >
            <span
                className={`
                    p-2 rounded-xl shadow-md 
                ${comp?.[showData]?.[competitor] === "N/A" ? showDataStyleOptions["N/A"] : showDataStyleOptions[showData]}
                `}
            >
                {showData === "price" && comp?.[showData]?.[competitor]}
                {showData === "avail" && numeric && comp?.[showData]?.[competitor]}
                {showData === "avail" && !numeric && availOptions[comp?.[showData]?.[competitor]]}
            </span>
        </td>
    )
}




export default function CompsTable({

    comps,
}) {


    const [showData, setShowData] = useState("avail");

    const [isShowModalUpdateFilteredComps, setIsShowModalUpdateFilteredComps] = useState(false)


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



            <CardBlock
                className="flex-grow overflow-auto  mb-1 relative  rounded-t-none"
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
                                <th className=
                                    "cursor-pointer bg-slate-800/90 hover:bg-slate-700/90 transition duration-300 ease-in-out "
                                    colSpan="6"
                                    onClick={() => setShowData(showData === "avail" ? "price" : "avail")}
                                >
                                    <span
                                        className={`${showData === "avail" && "text-blue-300 "}  hover:text-blue-300 `}
                                    >Наявність</span>
                                    <span
                                        className={`  ${showData === "price" && "text-green-500 "}  hover:text-green-500`}
                                    > Ціна</span>
                                </th>

                                <th
                                    className=
                                    " cursor-pointer bg-slate-800/90 hover:bg-slate-700/90 transition duration-300 ease-in-out"
                                    colSpan="3"
                                // onClick={() => setShowData(showData === "avail" ? "price" : "avail")}
                                >

                                    {filteredComps?.length !== comps?.length && <ButtonBlock
                                        onClick={() => setIsShowModalUpdateFilteredComps(true)}
                                        className="fuchsia-b mx-auto"
                                    >
                                        <CalculateIcon size={24} />   Проаналізувати
                                    </ButtonBlock>}

                                    <UpdateFilteredCompsModal
                                        filteredComps={filteredComps}
                                        isShowModalUpdateFilteredComps={isShowModalUpdateFilteredComps}
                                        setIsShowModalUpdateFilteredComps={setIsShowModalUpdateFilteredComps}
                                    />


                                </th>


                            </tr>
                            <tr
                                className="bg-gradient-to-b from-slate-500/95 to-slate-900/95"
                            >
                                {/* Заголовки для данных */}
                                <th className="   ">
                                    <img src="https://sharik.ua/local/templates/main/images/ua-logo.png"
                                        alt="Btrade"
                                        className="object-contain h-6 mx-auto"
                                    />
                                </th>

                                <th className="  ">
                                    <img src="https://images.prom.ua/2620988838_w350_h100_yumi-optovij.jpg"
                                        alt="Yumi"
                                        className="object-contain h-6 mx-auto"
                                    />
                                </th>


                                <th className="  ">
                                    <img src="https://ideaopt.com.ua/image/catalog/logo-idea.png"
                                        alt="Idea"
                                        className="object-contain h-6 mx-auto"
                                    />
                                </th>


                                <th className="  ">
                                    <img src="https://sharte.net/local/templates/dresscodeV2/images/logo_shartico2.png"
                                        alt="Sharte"
                                        className="object-contain h-6 mx-auto"
                                    />
                                </th>


                                <th className="  ">
                                    <img src="https://airballoons.com.ua/image/catalog/logo_IVVO11.png"
                                        alt="Air"
                                        className="object-contain h-6 mx-auto"
                                    />
                                </th>


                                <th className="  ">
                                    <img src="https://best-balloons.com.ua/wp-content/uploads/2019/05/wood-logo-dark.jpg"
                                        alt="Best"
                                        className="object-contain h-6 mx-auto"
                                    />
                                </th>


                                <th className="  ">
                                    <img src="https://images.prom.ua/4361922127_w350_h100_aero-bum.jpg"
                                        alt="Aero"
                                        className="object-contain h-6 mx-auto"
                                    />
                                </th>


                                <th className="  ">
                                    <img src="https://images.prom.ua/2069861087_w250_h120_balun-optovij.jpg"
                                        alt="Balun"
                                        className="object-contain h-6 mx-auto"
                                    />
                                </th>


                                <th className="  ">
                                    <img src="https://svyatoopt.com.ua/content/images/2/200x100l90nn0/52579472314969.webp"
                                        alt="Svyato"
                                        className="object-contain h-6 mx-auto"
                                    />
                                </th>

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
                                            className='p-0   '
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
                                            className=""
                                        >
                                            {comp?.abc}
                                        </td>



                                        <TableData
                                            comp={comp}
                                            competitor="btrade"
                                            showData={showData}
                                            numeric
                                        />


                                        <TableData
                                            comp={comp}
                                            competitor="yumi"
                                            showData={showData}
                                            numeric
                                        />


                                        <TableData
                                            comp={comp}
                                            competitor="idea"
                                            showData={showData}
                                            numeric
                                        />


                                        <TableData
                                            comp={comp}
                                            competitor="sharte"
                                            showData={showData}

                                        />

                                        <TableData
                                            comp={comp}
                                            competitor="air"
                                            showData={showData}

                                        />

                                        <TableData
                                            comp={comp}
                                            competitor="best"
                                            showData={showData}

                                        />


                                        <TableData
                                            comp={comp}
                                            competitor="aero"
                                            showData={showData}

                                        />


                                        <TableData
                                            comp={comp}
                                            competitor="balun"
                                            showData={showData}

                                        />


                                        <TableData
                                            comp={comp}
                                            competitor="svyato"
                                            showData={showData}

                                        />




                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </CardBlock>
        </>
    )
}
