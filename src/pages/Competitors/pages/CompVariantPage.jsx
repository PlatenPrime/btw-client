import React, { useState } from 'react'
import useCompStore from '../stores/compStore';
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, ModalDelete, PageBTW, TextBlock } from '../../../components';
import useFetchCompVariantById from '../hooks/useFetchCompVariantById';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchUsers from '../../Auth/hooks/useFetchUsers';
import { DeleteIcon, EditIcon, UpdateIcon } from '../../../components/UI/Icons';
import { toast } from 'react-toastify';
import CompVariantCard from '../components/CompVariant/CompVariantCard';
import CompStamp from '../components/Comp/CompStamp';
import CompData from '../components/Comp/CompData';
import UpdateCompVariantModal from '../components/modals/UpdateCompVariantModal';
import { TbArrowMoveRight } from 'react-icons/tb';
import TransferCompVariantModal from '../components/modals/TransferCompVariantModal';

export default function CompVariantPage() {


    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useFetchUsers();

    const { compVariant, compStamp, isCompVariantLoading, error } = useFetchCompVariantById(id);

    const { updateCompVariantById, deleteCompVariantById, getUpdatedCompVariantByArtikul } = useCompStore()

    const [isGettingUpdateCompVariantByArtikul, setGettingUpdateCompVariantByArtikul] = useState(false)

    const [isCompVariantDeleting, setIsCompVariantDeleting] = useState(false)

    const [isShowModalDeleteCompVariant, setIsShowModalDeleteCompVariant] = useState(false)
    const [isShowModalTransferCompVariant, setIsShowModalTransferCompVariant] = useState(false)

    const [isShowModalCompVariantUpdate, setIsShowModalCompVariantUpdate] = useState(false)




    const handleGetUpdatedCompVariantByArtikul = async () => {

        try {

            setGettingUpdateCompVariantByArtikul(true)
            await getUpdatedCompVariantByArtikul(compVariant?.artikul)
            toast.success(`Оновлено дані варіанту ${compVariant?.artikul}`);
        } catch (error) {
            console.log(error);
        } finally {
            setGettingUpdateCompVariantByArtikul(false)
        }
    }



    const handleDeleteCompVariantById = async () => {
        try {

            setIsCompVariantDeleting(true)
            await deleteCompVariantById(id)
            navigate("/comps")
            toast.success(`Видалено варіант ${compVariant?.artikul}`);
        } catch (error) {
            console.log(error);
        } finally {
            setIsCompVariantDeleting(false)
            setIsShowModalDeleteCompVariant(false)
        }
    }



    return (
        <PageBTW
            isLoading={isCompVariantLoading}
            error={error}
        >
            <HeaderBlock
                className="bg-gradient-to-b  from-violet-700/50  to-violet-400 shadow-md shadow-violet-500 "
            >
                Варіант {compVariant?.artikul}
            </HeaderBlock>


            {(user?.role === "ADMIN" || user?.role === "PRIME") &&
                <ButtonGroup>
                    <ButtonGroup.Navigation></ButtonGroup.Navigation>
                    <ButtonGroup.Actions>
                        <ButtonBlock
                            onClick={handleGetUpdatedCompVariantByArtikul}
                            className="emerald-b "
                        >
                            <UpdateIcon size={12} />   Оновити
                        </ButtonBlock>

                        <ButtonBlock
                            onClick={() => setIsShowModalCompVariantUpdate(true)}
                            className="blue-b"
                        >
                            <EditIcon /> Редагувати
                        </ButtonBlock>


                        <ButtonBlock
                            onClick={() => setIsShowModalTransferCompVariant(true)}
                            className="fuchsia-b"
                        >
                            <TbArrowMoveRight size={20} /> Перенести
                        </ButtonBlock>

                        <ButtonBlock
                            className="red-b"
                            onClick={() => setIsShowModalDeleteCompVariant(true)}
                        >
                            <DeleteIcon /> Видалити
                        </ButtonBlock>


                    </ButtonGroup.Actions>
                </ButtonGroup>
            }


            {isShowModalDeleteCompVariant && <ModalDelete
                ask={"Ви впевнені, що хочете видалити варіант? "}
                onDelete={handleDeleteCompVariantById}
                isDeleting={isCompVariantDeleting}
                onCancel={() => setIsShowModalDeleteCompVariant(false)}
            />}


           <UpdateCompVariantModal
                compVariant={compVariant}
                isShowModalCompVariantUpdate={isShowModalCompVariantUpdate}
                setIsShowModalCompVariantUpdate={setIsShowModalCompVariantUpdate}
            />


            <TransferCompVariantModal
                isShowModalTransferCompVariant={isShowModalTransferCompVariant}
                setIsShowModalTransferCompVariant={setIsShowModalTransferCompVariant}
                compVariant={compVariant}
                compStamp={compStamp}
            />



            {compVariant?.connect && <ContainerBlock
                className=""
            >

                <TextBlock
                    className="font-bold text-xl text-rose-500"
                >
                    Цей варіант уже перенесено на артикул {compVariant?.connect}.
                    Його можна видалити.
                </TextBlock>
            </ContainerBlock>}






            <CompVariantCard
                compVariant={compVariant}
            />



            <CompData
                comp={compVariant}
                isGettingUpdateCompByArtikul={isGettingUpdateCompVariantByArtikul}
                isVariant
            />


            <CompStamp
                compStamp={compStamp}
                isVariant
            />


        </PageBTW>
    )
}
