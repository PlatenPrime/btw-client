
import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, ModalDelete, PageBTW, TextBlock } from '../../../components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetchCompById from '../hooks/useFetchCompById'
import { DeleteIcon, EditIcon, UpdateIcon } from '../../../components/UI/Icons'
import useCompStore from '../stores/compStore'
import { toast } from 'react-toastify'
import useFetchArts from '../../../hooks/useFetchArts'
import CompData from '../components/Comp/CompData'
import CompCard from '../components/Comp/CompCard'
import UpdateCompModal from '../components/modals/UpdateCompModal'
import CompStamp from '../components/Comp/CompStamp'
import useFetchUsers from '../../Auth/hooks/useFetchUsers'

export default function CompPage() {


    const { id } = useParams()
    const navigate = useNavigate()

    const { comp, compStamp, isCompLoading, error } = useFetchCompById(id)
    const { artsDB } = useFetchArts()

    const { user } = useFetchUsers()





    const { updateCompById, deleteCompById, getUpdatedCompByArtikul } = useCompStore()



    const [isGettingUpdateCompByArtikul, setGettingUpdateCompByArtikul] = useState(false)

    const [isShowModalDeleteComp, setIsShowModalDeleteComp] = useState(false)
    const [isShowModalCompUpdate, setIsShowModalCompUpdate] = useState(false)



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


            {(user?.role === "ADMIN" || user?.role === "PRIME") &&
                <ButtonGroup>
                    <ButtonGroup.Navigation></ButtonGroup.Navigation>
                    <ButtonGroup.Actions>
                        <ButtonBlock
                            onClick={handleGetUpdatedCompByArtikul}
                            className="emerald-b "
                        >
                            <UpdateIcon size={12} />   Оновити
                        </ButtonBlock>

                        <ButtonBlock
                            onClick={() => setIsShowModalCompUpdate(true)}
                            className="blue-b"
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
            }




            {isShowModalDeleteComp && <ModalDelete
                ask={`Видалити артикул ${comp?.artikul}  з конкурентів?`}
                onDelete={handleDeleteCompById}
                onCancel={() => setIsShowModalDeleteComp(false)}
                isDeleting={isCompDeleting}
            />}


            {isShowModalCompUpdate &&
                <UpdateCompModal
                    comp={comp}
                    isShowModalCompUpdate={isShowModalCompUpdate}
                    setIsShowModalCompUpdate={setIsShowModalCompUpdate}
                />}


            <CompCard
                comp={comp}
            />

            <CompData
                comp={comp}
                isGettingUpdateCompByArtikul={isGettingUpdateCompByArtikul}
            />



            <CompStamp
                compStamp={compStamp}
            />


        </PageBTW>
    )
}
