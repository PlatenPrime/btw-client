import React, { useEffect, useState } from "react";
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ModalCreate, ModalDelete, ModalEditOneValue, ModalWrapper, PageBTW, Spinner, TextBlock } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import useInsFoldersStore from "./stores/insFoldersStore";
import useInsStore from "./stores/insStore";
import useAuthStore from "../Auth/authStore";
import { AddIcon, DeleteIcon, EditIcon } from "../../components/UI/Icons";
import InsBage from "./components/InsBage";




export default function InsFolderPage() {

  const { id } = useParams()
  const navigate = useNavigate()


  const { insFolder, getInsFolderById, updateInsFolderById, deleteInsFolderById } = useInsFoldersStore()
  const { createInstruction, folderInstructions, getFolderInstructions } = useInsStore()
  const { user, users, getUsers } = useAuthStore()

  console.log(users);


  const [isInsFolderLoading, setIsInsFolderLoading] = useState(false);
  const [isInsCreating, setIsInsCreating] = useState(false);
  const [isInsFolderUpdating, setIsInsFolderUpdating] = useState(false);
  const [isInsFolderDeleting, setIsInsFolderDeleting] = useState(false);


  const [isShowModalInsCreating, setIsShowModalInsCreating] = useState(false);
  const [isShowModalInsFolderUpdating, setIsShowModalInsFolderUpdating] = useState(false);
  const [isShowModalInsFolderDeleting, setIsShowModalInsFolderDeleting] = useState(false);




  useEffect(() => {


    const fetchInsFolder = async () => {
      try {
        setIsInsFolderLoading(true);
        const insFolder = await getInsFolderById(id);
        console.log("Тека завантажена: ", insFolder);
      } catch (error) {
        console.log(error);
      } finally {
        setIsInsFolderLoading(false);
      }
    };


    const fetchFolderInstructions = async () => {
      try {
        setIsInsFolderLoading(true);
        const folderInstructions = await getFolderInstructions(id);
        console.log("Інструкції теки завантажені: ", folderInstructions);
      } catch (error) {
        console.log(error);
      } finally {
        setIsInsFolderLoading(false);
        setIsShowModalInsCreating(false)
      }
    };


    fetchInsFolder();
    fetchFolderInstructions()




  }, [getInsFolderById, getFolderInstructions, id]);




  useEffect(() => {

    const fetchUsers = async () => {
      try {
        await getUsers()

      } catch (error) {
        console.log(error);

      }
    }

    fetchUsers()

  }, [getUsers])






  const handleCreateInstruction = async (instructionData) => {
    try {
      setIsInsCreating(true)
      const newInstruction = await createInstruction(instructionData);
      console.log('Нова інструкція створена:', newInstruction);
    } catch (error) {
      console.error('Помилка при створенні інструкції:', error);
    } finally {
      setIsInsCreating(false)
      setIsShowModalInsCreating(false)
    }
  };



  const handleUpdateInsFolder = async (updateData) => {
    try {
      setIsInsFolderUpdating(true)
      const updatedInsFolder = await updateInsFolderById(id, updateData);
      console.log('Тека оновлена:', updatedInsFolder);
    } catch (error) {
      console.error('Помилка при оновленні теки:', error);
    } finally {
      setIsInsFolderUpdating(false)
      setIsShowModalInsFolderUpdating(false)
    }
  }



  const handleDeleteInsFolder = async () => {
    try {
      setIsInsFolderDeleting(true)
      await deleteInsFolderById(id);
      console.log('Тека видалена');
    } catch (error) {
      console.error('Помилка при видаленні теки:', error);
    } finally {
      setIsInsFolderDeleting(false)
      setIsShowModalInsFolderDeleting(false)
      navigate('/ins')
    }
  }






  return (
    <PageBTW
      className="space-y-4"
      isLoading={isInsFolderLoading}

    >


      <HeaderBlock className="bg-yellow-500 shadow-lg shadow-yellow-500">
        {insFolder?.title || 'Тека'}
      </HeaderBlock>





      {/* MODALS */}


      {isShowModalInsCreating && <ModalCreate
        title="Створення інструкції"
        onCancel={() => setIsShowModalInsCreating(false)}
        onConfirm={(newTitle) => handleCreateInstruction({ title: newTitle, folderId: id, author: user?._id })}
        isCreating={isInsCreating}
      />}


      {isShowModalInsFolderUpdating && <ModalEditOneValue
        value={insFolder?.title}
        onConfirm={(newTitle) => handleUpdateInsFolder({ title: newTitle })}
        onCancel={() => setIsShowModalInsFolderUpdating(false)}
        isUpdating={isInsFolderUpdating}

      />}




      {isShowModalInsFolderDeleting && <ModalDelete
        ask="Видалити теку і всі інструкції в ній?"
        onDelete={handleDeleteInsFolder}
        onCancel={() => setIsShowModalInsFolderDeleting(false)}
        isDeleting={isInsFolderDeleting}

      />}




      <ButtonGroup>


        <ButtonGroup.Actions>

          <ButtonBlock
            className="green-b"
            onClick={() => setIsShowModalInsCreating(true)}
          >
            <AddIcon />
            Створити інструкцію
          </ButtonBlock>

          <ButtonBlock
            className="blue-b"
            onClick={() => setIsShowModalInsFolderUpdating(true)}
          >
            <EditIcon />
            Редагувати
          </ButtonBlock>

          <ButtonBlock
            className="red-b"
            onClick={() => setIsShowModalInsFolderDeleting(true)}
          >
            <DeleteIcon />
            Видалити
          </ButtonBlock>



        </ButtonGroup.Actions>


        <ButtonGroup.Navigation>


        </ButtonGroup.Navigation>

      </ButtonGroup>






      {folderInstructions?.length > 0
        ?
        <ContainerBlock
          className="space-y-2"
        >
          {folderInstructions?.map((ins) => (

            <InsBage
              key={ins?._id} ins={ins} users={users} />
          ))}
        </ContainerBlock>
        :
        <ContainerBlock>
          <TextBlock>В цій теці інструкцій немає</TextBlock>
        </ContainerBlock>

      }



    </PageBTW >
  )
}

