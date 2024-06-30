
import React from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, PageBTW, TextBlock } from '../../../components'
import { Link, useParams } from 'react-router-dom'
import useFetchCompById from '../hooks/useFetchCompById'
import { DeleteIcon, EditIcon, UpdateIcon } from '../../../components/UI/Icons'
import CompInfo from '../components/CompInfo'

export default function NewCompPage() {


    const { id } = useParams()

    const { comp, isCompLoading, error } = useFetchCompById(id)





    return (
        <PageBTW

            isLoading={isCompLoading}


        >

            <HeaderBlock
                className="bg-fuchsia-500 shadow-lg shadow-fuchsia-500"
            >
                Конкуренти {comp?.artikul}
            </HeaderBlock>


            <ButtonGroup>
                <ButtonGroup.Navigation></ButtonGroup.Navigation>
                <ButtonGroup.Actions>
                    <ButtonBlock
                        className="emerald-b "
                    >
                        <UpdateIcon />    Оновити дані
                    </ButtonBlock>

                    <ButtonBlock
                        className="blue-b"
                    >
                        <EditIcon /> Редагувати
                    </ButtonBlock>

                    <ButtonBlock
                        className="red-b"
                    >
                        <DeleteIcon /> Видалити
                    </ButtonBlock>


                </ButtonGroup.Actions>
            </ButtonGroup>

            <ContainerBlock
                className="flex   gap-2 "
            >

                <CardBlock
                    className="
					 lg:w-fit flex justify-center items-center 
						bg-white rounded-xl shadow-lg shadow-white 
						"
                >
                    <ImageArt size={100} artikul={comp?.artikul} className="rounded-xl" />

                </CardBlock>


                <TextBlock
                    className="text-3xl text-center   p-1 bg-gradient-to-b  from-sky-500/50 to-sky-900/50  rounded-xl w-full"
                >
                    {comp?.nameukr}
                </TextBlock>
            </ContainerBlock>


            <ContainerBlock>
                <TextBlock>Виробник: {comp?.prod}</TextBlock>
                <TextBlock>Категорія: {comp?.category}</TextBlock>
                <TextBlock>Підкатегорія: {comp?.subcategory}</TextBlock>
                <TextBlock>Розмір: {comp?.size}</TextBlock>
            </ContainerBlock>


            <CompInfo
                comp={comp}
            />


        </PageBTW>
    )
}
