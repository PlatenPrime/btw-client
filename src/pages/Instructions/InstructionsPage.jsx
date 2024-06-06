import React, { useState } from "react";
import {
  ButtonBlock,
  ButtonGroup,
  CardBlock,
  ContainerBlock,
  HeaderBlock,
  ModalCreate,
  PageBTW,
  TextBlock,
} from "../../components";

import { FcFolder } from "react-icons/fc";

import { useNavigate } from "react-router-dom";

import useInsFoldersStore from "./stores/insFoldersStore";
import useFetchAllInsFolders from "./hooks/useFetchInsFolders";
import InsFolderBage from "./components/InsFolderBage";


// DFNNauCXiFM

export default function InstructionsPage() {

  const navigate = useNavigate();

  const { insFolders, isAllInsFoldersLoading } = useFetchAllInsFolders();

  const { createInsFolder } = useInsFoldersStore();
  const [isInsFolderCreating, setIsInsFolderCreating] = useState(false);
  const [isShowModalInsFolderCreating, setIsShowModalInsFolderCreating] = useState(false);



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
      isLoading={isAllInsFoldersLoading}
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
        <ContainerBlock className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3">
          {insFolders.map((insFolder) => (
            <InsFolderBage
              key={insFolder._id}
              insFolder={insFolder}
            />
          ))}
        </ContainerBlock>
      )}



    </PageBTW >
  );
}
