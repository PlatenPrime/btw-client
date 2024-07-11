
import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, ModalDelete, PageBTW, TextBlock } from '../../../components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetchCompById from '../hooks/useFetchCompById'
import { DeleteIcon, EditIcon, UpdateIcon } from '../../../components/UI/Icons'
import CompInfo from '../components/CompInfo'
import { MdOutlineCategory, MdOutlinePrecisionManufacturing } from 'react-icons/md'
import { BiCategory } from 'react-icons/bi'
import { TbResize } from 'react-icons/tb'
import useCompStore from '../stores/compStore'
import { toast } from 'react-toastify'
import useFetchArts from '../../../hooks/useFetchArts'

export default function CompPage() {


    const { id } = useParams()
    const navigate = useNavigate()

    const { comp, isCompLoading, error } = useFetchCompById(id)
    const {artsDB} = useFetchArts()

    const { updateCompById, deleteCompById, getUpdatedCompByArtikul } = useCompStore()



    const [isGettingUpdateCompByArtikul, setGettingUpdateCompByArtikul] = useState(false)

    const [isShowModalDeleteComp, setIsShowModalDeleteComp] = useState(false)



    const [isCompDeleting, setIsCompDeleting] = useState(false)



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



    const handleDeleteCompById = async () => {
        try {

            setIsCompDeleting(true)
            await deleteCompById(id)
            navigate("/comps")
            toast.success(`Видалено артикул ${comp?.artikul}`);
        } catch (error) {
            console.log(error);
        } finally {
            setIsCompDeleting(false)
            setIsShowModalDeleteComp(false)
        }
    }





    return (
        <PageBTW

            isLoading={isCompLoading}


        >

            <HeaderBlock
                className="bg-fuchsia-500 shadow-sm shadow-fuchsia-500"
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
                        className="red-b"
                        onClick={() => setIsShowModalDeleteComp(true)}
                    >
                        <DeleteIcon /> Видалити
                    </ButtonBlock>


                </ButtonGroup.Actions>
            </ButtonGroup>




            {isShowModalDeleteComp && <ModalDelete
                ask={`Видалити артикул ${comp?.artikul} ?`}
                onDelete={handleDeleteCompById}
                onCancel={() => setIsShowModalDeleteComp(false)}
                isDeleting={isCompDeleting}
            />}













            <ContainerBlock
                className="flex   gap-2 "
            >

                <CardBlock
                    className="
					 lg:w-fit flex justify-center items-center 
						bg-white rounded-xl shadow-sm shadow-white 
						"
                >
                    <ImageArt size={100} artikul={comp?.artikul} className="rounded-xl" />

                </CardBlock>


                <TextBlock
                    className=" w-full flex flex-col items-center justify-center px-2 
                   bg-gradient-to-b from-sky-500/50 to-sky-800/20
                   hover:shadow-sm hover:shadow-sky-500 hover:bg-sky-500
                    cursor-pointer rounded-xl text-2xl "

                    onClick={() => {
                        const artId = artsDB?.find(art => art.artikul === comp?.artikul)?._id || "";
                        const url = `/arts/${artId}`;
                        window.open(url, "_blank");
                    }}
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
