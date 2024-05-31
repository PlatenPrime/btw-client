import React, { useEffect, useState } from "react";
import {
  ButtonBlock,
  ButtonGroup,
  CardBlock,
  ContainerBlock,
  HeaderBlock,
  InputBlock,
  ModalCreate,
  PageBTW,
  Spinner,
  TextBlock,
} from "../../components";

import { FcFolder } from "react-icons/fc";


import { useNavigate } from "react-router-dom";

import useInsFoldersStore from "./stores/insFoldersStore";


// DFNNauCXiFM

export default function InstructionsPage() {
  const navigate = useNavigate();

  const { insFolders, getAllInsFolders, createInsFolder } =
    useInsFoldersStore();



  const [isInsFoldersLoading, setIsInsFoldersLoading] = useState(false);
  const [isInsFolderCreating, setIsInsFolderCreating] = useState(false);

  const [isShowModalInsFolderCreating, setIsShowModalInsFolderCreating] =
    useState(false);

  useEffect(() => {
    const fetchIns = async () => {
      try {
        setIsInsFoldersLoading(true);

        const instructions = await getAllInsFolders();

        console.log("Інструкції завантажені", instructions);
      } catch (error) {
        console.log(error);
      } finally {
        setIsInsFoldersLoading(false);
      }
    };

    fetchIns();
  }, [getAllInsFolders]);

  console.log(insFolders);

  const handleInsFolderCreate = async (createData) => {
    try {
      setIsInsFolderCreating(true);
      await createInsFolder(createData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsInsFolderCreating(false);
      setIsShowModalInsFolderCreating(false);
    }
  };

  return (
    <PageBTW
      className="space-y-4"
      isLoading={isInsFoldersLoading}
    >


      <HeaderBlock className="bg-blue-500 shadow-2xl shadow-blue-500">
        Інструкції
      </HeaderBlock>

      {/* MODALS */}



      {isShowModalInsFolderCreating && <ModalCreate
        title="Створення теки"
        onConfirm={(newInsFolderTitle) => handleInsFolderCreate({ title: newInsFolderTitle })}
        onCancel={() => setIsShowModalInsFolderCreating(false)}
        isCreating={isInsFolderCreating}
      />}


      <ButtonGroup>
        <ButtonGroup.Actions>
          <ButtonBlock
            className="green-b"
            onClick={() => setIsShowModalInsFolderCreating(true)}
          >
            Створити теку
          </ButtonBlock>
        </ButtonGroup.Actions>
      </ButtonGroup>


      {insFolders?.length > 0 && (
        <ContainerBlock className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2 
            lg:grid-cols-3">
          {insFolders.map((insFolder) => (
            <CardBlock
              key={insFolder._id}
              onClick={() => navigate(`/insfolder/${insFolder._id}`)}
              className="group rounded-xl flex justify-center items-center
                  bg-blue-500/10 
                      hover:bg-blue-500  hover:shadow-2xl  hover:shadow-blue-500
                      transition duration-500 ease-in-out  cursor-pointer "
            >

              <FcFolder className="text-5xl" />
              <TextBlock className="  text-xl px-2 py-1 rounded-lg   w-full ">
                {insFolder?.title}
              </TextBlock>


            </CardBlock>

          ))}
        </ContainerBlock>
      )}



    </PageBTW >
  );
}
