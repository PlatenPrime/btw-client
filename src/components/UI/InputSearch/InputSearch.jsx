import React from 'react'
import CardBlock from '../blocks/CardBlock'
import TextBlock from '../blocks/TextBlock'
import { GoSearch } from 'react-icons/go'
import InputBlock from '../blocks/InputBlock'

export default function InputSearch({handleSearch, placeholder}) {
    return (
        <CardBlock
            className="flex  justify-start rounded-xl bg-slate-700 space-x-3 pl-4 "
        >


            <TextBlock
                className="text-2xl font-bold"
            >
                <GoSearch />
            </TextBlock>
            <InputBlock
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={placeholder}
                className="text-xl outline-none border-none p-3 px-8 bg-slate-700 focus:bg-slate-600 w-full
								 placeholder:font-light placeholder:text-slate-400 rounded-xl rounded-l-none
								"
            />



        </CardBlock>
    )
}
