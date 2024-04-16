import React, { useEffect, useState } from "react";
import {
  ButtonBlock,
  ButtonGroup,
  CardBlock,
  ContainerBlock,
  HeaderBlock,
  InputBlock,
  ModalCreate,
  ModalWrapper,
  PageBTW,
  Spinner,
  TextBlock,
} from "../../components";
import { useNavigate } from "react-router-dom";

import useInsFoldersStore from "./insFoldersStore";
import { CancelIcon, OkIcon } from "../../components/UI/Icons";

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
    <PageBTW className="space-y-4">
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






      {/* MAIN */}

      {isInsFoldersLoading ? (
        <ContainerBlock className="flex h-full w-full items-center justify-start">
          <Spinner color="rgb(59 130 246)" />
        </ContainerBlock>
      ) : (
        <>
          <ButtonGroup>
            <ButtonBlock
              className="green-b"
              onClick={() => setIsShowModalInsFolderCreating(true)}
            >
              Створити теку
            </ButtonBlock>
          </ButtonGroup>


          {insFolders?.length > 0 && (
            <ContainerBlock className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 
            lg:grid-cols-3">
              {insFolders.map((insFolder) => (
                <div
                  key={insFolder._id}
                  onClick={() => navigate(`/insfolder/${insFolder._id}`)}
                  className="rounded-xl flex justify-center items-center p-2 bg-yellow-500/20 
                      hover:bg-yellow-500  hover:shadow-2xl 
                      transition duration-500 ease-in-out min-h-[6rem] cursor-pointer transform-gpu"
                >
                  <TextBlock className="bg-gray-100 hover:bg-white text-black text-xl px-2 py-1 rounded-lg w-full shadow-md">
                    {insFolder?.title}
                  </TextBlock>
                </div>

              ))}
            </ContainerBlock>
          )}

















        </>
      )
      }
    </PageBTW >
  );
}
