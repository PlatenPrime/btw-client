
import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, PageBTW, TextBlock } from '../../../components'
import { Link, useParams } from 'react-router-dom'
import useFetchCompById from '../hooks/useFetchCompById'
import { DeleteIcon, EditIcon, UpdateIcon } from '../../../components/UI/Icons'
import CompInfo from '../components/CompInfo'
import { MdOutlineCategory, MdOutlinePrecisionManufacturing } from 'react-icons/md'
import { BiCategory } from 'react-icons/bi'
import { TbResize } from 'react-icons/tb'
import useCompStore from '../stores/compStore'
import { toast } from 'react-toastify'

export default function CompPage() {


    const { id } = useParams()

    const { comp, isCompLoading, error } = useFetchCompById(id)

    const { updateCompById, deleteCompById, getUpdatedCompByArtikul } = useCompStore()



    const [isGettingUpdateCompByArtikul, setGettingUpdateCompByArtikul] = useState(false)



    const handleGetUpdatedCompByArtikul = async () => {

        try {

            setGettingUpdateCompByArtikul(true)
            await getUpdatedCompByArtikul(comp?.artikul)
            toast.success(`Оновлено дані артикула ${comp?.artikul}`);
        } catch (error) {
            console.log(error);
        } finally {
            setGettingUpdateCompByArtikul(false)
        }


    }





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
                        onClick={handleGetUpdatedCompByArtikul}
                        className="emerald-b "
                    >
                        <UpdateIcon />   Оновити
                    </ButtonBlock>

                    <ButtonBlock
                        className=""
                    >
                        <EditIcon /> Редагувати
                    </ButtonBlock>

                    <ButtonBlock
                        className=""
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


    


            <CompInfo
                comp={comp}
                isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
            />


        </PageBTW>
    )
}
