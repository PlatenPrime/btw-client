import React, { useState } from 'react'
import useFetchAllCompVariants from '../hooks/useFetchAllCompVariants';
import useCompStore from '../stores/compStore';
import { ButtonBlock, ButtonGroup, HeaderBlock, PageBTW } from '../../../components';
import useFetchCompVariantById from '../hooks/useFetchCompVariantById';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchUsers from '../../Auth/hooks/useFetchUsers';
import { DeleteIcon, EditIcon, UpdateIcon } from '../../../components/UI/Icons';
import { toast } from 'react-toastify';

export default function CompVariantPage() {


    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useFetchUsers();

    const { compVariant, compStamp, isCompVariantLoading, error } = useFetchCompVariantById(id);

    const { updateCompVariantById, deleteCompVariantById } = useCompStore()


    const [isCompVariantDeleting, setIsCompVariantDeleting] = useState(false)
    const [isShowModalDeleteCompVariant, setIsShowModalDeleteCompVariant] = useState(false)






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
                className="bg-violet-500 shadow-sm shadow-violet-500"
            >
                Варіант {compVariant?.artikul}
            </HeaderBlock>


            {(user?.role === "ADMIN" || user?.role === "PRIME") &&
                <ButtonGroup>
                    <ButtonGroup.Navigation></ButtonGroup.Navigation>
                    <ButtonGroup.Actions>
                        <ButtonBlock
                            // onClick={handleGetUpdatedCompByArtikul}
                            className="emerald-b "
                        >
                            <UpdateIcon size={12} />   Оновити
                        </ButtonBlock>

                        <ButtonBlock
                            // onClick={() => setIsShowModalCompUpdate(true)}
                            className="blue-b"
                        >
                            <EditIcon /> Редагувати
                        </ButtonBlock>

                        <ButtonBlock
                            className="red-b"
                        // onClick={() => setIsShowModalDeleteComp(true)}
                        >
                            <DeleteIcon /> Видалити
                        </ButtonBlock>


                    </ButtonGroup.Actions>
                </ButtonGroup>
            }













        </PageBTW>
    )
}
