import React, { useEffect, useState } from "react";
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ModalCreate, ModalWrapper, PageBTW, Spinner, TextBlock } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import useInsFoldersStore from "./insFoldersStore";
import useInsStore from "./insStore";




export default function InsFolderPage() {

  const { id } = useParams()
  const navigate = useNavigate()


  const { insFolder, getInsFolderById } = useInsFoldersStore()
  const { createInstruction, folderInstructions, getFolderInstructions } = useInsStore()


  const [isInsFolderLoading, setIsInsFolderLoading] = useState(false);
  const [isInsCreating, setIsInsCreating] = useState(false);


  const [isShowModalInsCreating, setIsShowModalInsCreating] = useState(false);




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
        onConfirm={(newTitle) => handleCreateInstruction({ title: newTitle, folder: id })}
        isCreating={isInsCreating}
      >


      </ModalCreate>}











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

            >
              Редагувати
            </ButtonBlock>

            <ButtonBlock

            >
              Видалити
            </ButtonBlock>

          </ButtonGroup>







          <ContainerBlock
            className="space-y-2"
          >
            {folderInstructions?.map((instruction) => (
              <CardBlock
                key={instruction._id}
                className="w-full p-2 rounded-xl bg-blue-500/20 hover:bg-blue-500 cursor-pointer
                transition duration-500 ease-in-out"
                onClick={() => navigate(`/ins/${instruction._id}`)}
              >
                <TextBlock>
                  {instruction?.title}
                </TextBlock>
              </CardBlock>

            ))}
          </ContainerBlock>









        </>
      }


    </PageBTW >
  )
}

