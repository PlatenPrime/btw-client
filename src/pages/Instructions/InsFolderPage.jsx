import React, { useEffect, useState } from "react";
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ModalCreate, ModalDelete, ModalEditOneValue, ModalWrapper, PageBTW, Spinner, TextBlock } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import useInsFoldersStore from "./stores/insFoldersStore";
import useInsStore from "./stores/insStore";
import useAuthStore from "../Auth/authStore";




export default function InsFolderPage() {

  const { id } = useParams()
  const navigate = useNavigate()


  const { insFolder, getInsFolderById, updateInsFolderById, deleteInsFolderById } = useInsFoldersStore()
  const { createInstruction, folderInstructions, getFolderInstructions } = useInsStore()
  const { user } = useAuthStore()


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

    >


      <HeaderBlock className="bg-yellow-500 shadow-2xl shadow-yellow-500">
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










      {isInsFolderLoading ?


        <ContainerBlock
          className="w-full h-full flex justify-start items-center"
        >
          <Spinner color="rgb(234 179 8)" />
        </ContainerBlock>

        :

        <>


          <ButtonGroup>

            <ButtonBlock
              className="green-b"
              onClick={() => setIsShowModalInsCreating(true)}
            >
              Створити інструкцію
            </ButtonBlock>


            <ButtonBlock
              className="blue-b"
              onClick={() => setIsShowModalInsFolderUpdating(true)}
            >
              Редагувати
            </ButtonBlock>

            <ButtonBlock
              className="red-b"
              onClick={() => setIsShowModalInsFolderDeleting(true)}
            >
              Видалити
            </ButtonBlock>

          </ButtonGroup>






          {folderInstructions?.length > 0 ?
            <ContainerBlock
              className="space-y-2"
            >
              {folderInstructions?.map((instruction) => (
                <CardBlock
                  key={instruction._id}
                  className=" flex items-center space-x-4 w-full p-2 rounded-xl bg-blue-500/20 hover:bg-blue-500 cursor-pointer
     transition duration-500 ease-in-out"
                  onClick={() => navigate(`/ins/${instruction._id}`)}
                >





                  <CardBlock
                    className="flex justify-center items-center w-full lg:w-fit aspect-video rounded-xl"
                  >

                    {instruction?.titleImage ?

                      <img src={instruction?.titleImage} alt="" className="w-[300px] " />

                      :

                      <img
                        src='https://placehold.co/600x400?text=Інструкція'
                        width={300}
                      ></img>}
                  </CardBlock>



                  <TextBlock
                    className="text-xl"
                  >
                    {instruction?.title}
                  </TextBlock>
                </CardBlock>

              ))}
            </ContainerBlock>

            :
            <ContainerBlock>
              <TextBlock>В цій теці інструкцій немає</TextBlock>
            </ContainerBlock>

          }










        </>
      }


    </PageBTW >
  )
}

