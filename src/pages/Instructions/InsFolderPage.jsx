import React, { useEffect, useState } from "react";
import { ButtonBlock, ButtonGroup, ContainerBlock, HeaderBlock, PageBTW, Spinner } from "../../components";
import { useParams } from "react-router-dom";
import useInsFoldersStore from "./insFoldersStore";
import useInsStore from "./insStore";




export default function InsFolderPage() {

  const { id } = useParams()


  const { insFolder, getInsFolderById } = useInsFoldersStore()
  const { createInstruction } = useInsStore()


  const [isInsFolderLoading, setIsInsFolderLoading] = useState(false);




  useEffect(() => {
    const fetchIns = async () => {
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

    fetchIns();
  }, [getInsFolderById, id]);







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

















        </>
      }


    </PageBTW >
  )
}

