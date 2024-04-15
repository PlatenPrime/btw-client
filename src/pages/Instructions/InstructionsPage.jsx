import React, { useEffect, useState } from "react";
import {
  ButtonBlock,
  ButtonGroup,
  CardBlock,
  ContainerBlock,
  HeaderBlock,
  InputBlock,
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

  const [newInsFolderTitle, setNewInsFolderTitle] = useState("");
  const [newInsFolderColor, setNewInsFolderColor] = useState("#000000");

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

      {isShowModalInsFolderCreating && (
        <ModalWrapper
          onCancel={() => setIsShowModalInsFolderCreating(false)}
          title="Створення теки"
        >
          <CardBlock className="space-y-2">
            <CardBlock className="grid grid-cols-1 space-x-2 md:grid-cols-2">
              <label
                className=" self-center justify-self-center md:justify-self-start"
                htmlFor="title"
              >
                Назва:
              </label>
              <InputBlock
                type="text"
                id="title"
                name="title"
                    autoComplete="off"
                value={newInsFolderTitle}
                onChange={(e) => setNewInsFolderTitle(e.target.value)}
              />
            </CardBlock>



            <CardBlock className="grid grid-cols-1 space-x-2">
  <label
    className="self-center justify-self-center md:justify-self-start"
    htmlFor="color"
  >
    Колір:
  </label>
  <input
    type="color"
    id="color"
    name="color"
    value={newInsFolderColor}
    onChange={(e) => setNewInsFolderColor(e.target.value)}
  />
</CardBlock>












          </CardBlock>

          <CardBlock className="grid grid-cols-2 space-x-2">
            <ButtonBlock
              className="red-b flex items-center justify-center"
              onClick={() => setIsShowModalInsFolderCreating(false)}
            >
              <TextBlock className="text-2xl">
                <CancelIcon />
              </TextBlock>
              <TextBlock className=""> Скасувати</TextBlock>
            </ButtonBlock>

            <ButtonBlock
              disabled={!newInsFolderTitle}
              type="submit"
              className="green-b flex items-center justify-center"
              onClick={() => handleInsFolderCreate(
              {  title: newInsFolderTitle,
                color: newInsFolderColor}
              )
              }
            >
              {isInsFolderCreating ? (
                <Spinner color="green" />
              ) : (
                <>
                  <TextBlock className="text-2xl">
                    <OkIcon />
                  </TextBlock>
                  <TextBlock className=""> Створити</TextBlock>
                </>
              )}
            </ButtonBlock>
          </CardBlock>
        </ModalWrapper>
      )}

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
  <CardBlock className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {insFolders.map((insFolder) => (
      <div
      key={insFolder._id}
      style={{backgroundColor: insFolder.color,  height: "200px", }}
      className= "rounded-xl flex justify-center items-center  bg-blue-500/20  hover:bg-blue-500/50 hover:shadow-lg hover:shadow-blue-500 transition duration-500 ease-in-out "
    
      
      >
{insFolder?.title}
      </div>
    ))}
  </CardBlock>
)}





















        </>
      )}
    </PageBTW>
  );
}
