import React, { useEffect, useState } from "react";
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, PageBTW, Spinner, TextBlock } from "../../components";
import { useParams } from "react-router-dom";
import useInsFoldersStore from "./insFoldersStore";
import useInsStore from "./insStore";




export default function InsFolderPage() {

  const { id } = useParams()


  const { insFolder, getInsFolderById } = useInsFoldersStore()
  const { createInstruction, folderInstructions, getFolderInstructions } = useInsStore()


  const [isInsFolderLoading, setIsInsFolderLoading] = useState(false);




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
      }
    };


    fetchInsFolder();
    fetchFolderInstructions()




  }, [getInsFolderById, getFolderInstructions, id]);







  return (
    <PageBTW
      className="space-y-4"

    >


      <HeaderBlock className="bg-yellow-500 shadow-2xl shadow-yellow-500">
        {insFolder?.title || 'Тека'}
      </HeaderBlock>



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

            >
              Створити інструкцію
            </ButtonBlock>
          </ButtonGroup>







          <ContainerBlock>
            {folderInstructions?.map((instruction) => (
              <TextBlock>{instruction?.title}</TextBlock>

            ))}
          </ContainerBlock>









        </>
      }


    </PageBTW >
  )
}

