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




          <ButtonGroup>


            <ButtonGroup.Actions>

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

            </ButtonGroup.Actions>


            <ButtonGroup.Navigation>
              <ButtonBlock
                className="green-b"
                onClick={() => setIsShowModalInsCreating(true)}
              >
                Створити інструкцію
              </ButtonBlock>

            </ButtonGroup.Navigation>

          </ButtonGroup>






          {folderInstructions?.length > 0 ?
            <ContainerBlock
              className="space-y-2"
            >
              {folderInstructions?.map((ins) => (
                <CardBlock
                  key={ins._id}
                  className=" flex flex-col lg:flex-row items-center space-x-4 w-full p-2 rounded-xl bg-blue-500/20 hover:bg-blue-500 cursor-pointer
     transition duration-500 ease-in-out"
                  onClick={() => navigate(`/ins/${ins._id}`)}
                >





                  <CardBlock
                    className="flex justify-center items-center w-full lg:w-fit  rounded-xl"
                  >

                    {ins?.titleImage ?

                      <img src={ins?.titleImage} alt="" className="w-[300px] rounded-xl " />

                      :

                      <img
                        src='https://placehold.co/600x300?text=Інструкція'
                        width={300}
                        className="rounded-xl"
                      ></img>}
                  </CardBlock>



                  <CardBlock>
                    <TextBlock className="text-3xl "> {ins?.title}</TextBlock>

                    {ins?.author && users?.find((user) => user?._id === ins?.author) &&
                      <TextBlock className="text-xl text-slate-400">
                        {users?.find((user) => user?._id === ins?.author)?.fullname}
                      </TextBlock>}

                    {ins?.createdAt && <TextBlock className="text-lg text-slate-400 justify-start">Створена: {new Date(ins?.createdAt).toLocaleString()}</TextBlock>}
                    {ins?.updatedAt && <TextBlock className="text-lg text-slate-400 justify-start">Змінена: {new Date(ins?.updatedAt).toLocaleString()}</TextBlock>}
                  </CardBlock>
                </CardBlock>

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

