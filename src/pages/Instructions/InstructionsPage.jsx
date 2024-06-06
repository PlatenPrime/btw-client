import React, { useEffect, useState } from "react";
import {
  ButtonBlock,
  ButtonGroup,
  CardBlock,
  ContainerBlock,
  HeaderBlock,
  InputSearch,
  ModalCreate,
  PageBTW,
  PaginationBlock,
  TextBlock,
} from "../../components";
import { useNavigate } from "react-router-dom";

import useInsFoldersStore from "./stores/insFoldersStore";
import useFetchAllInsFolders from "./hooks/useFetchInsFolders";
import InsFolderBage from "./components/InsFolderBage";
import useFetchAllIns from "./hooks/useFetchAllIns";
import useFetchUsers from "../Auth/hooks/useFetchUsers";
import { toast } from "react-toastify";
import { useDebouncedCallback } from 'use-debounce'
import InsBage from "./components/InsBage";


export default function InstructionsPage() {

  const navigate = useNavigate();

  const { insFolders, isAllInsFoldersLoading } = useFetchAllInsFolders();
  const { instructions, isAllInsLoading } = useFetchAllIns();
  const { users } = useFetchUsers()


  const { createInsFolder } = useInsFoldersStore();
  const [isInsFolderCreating, setIsInsFolderCreating] = useState(false);
  const [isShowModalInsFolderCreating, setIsShowModalInsFolderCreating] = useState(false);


  const [filteredIns, setFilteredIns] = useState([]);
  const [page, setPage] = useState(1);
  const step = 10



  const handleSearch = useDebouncedCallback((term) => {
    const filtered = instructions.filter((ins) =>
      ins.title.toLowerCase().includes(term.toLowerCase().trim())
    );

    if (filtered.length === 0) {
      toast.info("По запиту нічого не знайдено")
    }
    setFilteredIns(filtered);
    setPage(1)
  }, 500);


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



  useEffect(() => {
    setFilteredIns(instructions)
  }, [instructions])





  return (
    <PageBTW
      className="space-y-4 "
      isLoading={isAllInsFoldersLoading}
    >

      <HeaderBlock className="bg-blue-500 shadow-2xl shadow-blue-500 ">
        Інструкції
      </HeaderBlock>

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


      <ContainerBlock>

        <InputSearch
          handleSearch={handleSearch}
          placeholder="Пошук інструкції по назві"
        />

        <PaginationBlock
          allItems={instructions}
          filteredItems={filteredIns}
          page={page}
          step={step}
          setPage={setPage}
        />


        <CardBlock className="space-y-2">
          {filteredIns?.length === 0 ? (
            <TextBlock className="text-red-500">Нічого не знайдено</TextBlock>
          ) : (
            (filteredIns?.length === instructions?.length ? instructions : filteredIns)
              .slice(step * page - step, step * page)
              .map((ins) => (
                <InsBage
                  key={ins._id}
                  ins={ins}
                  users={users}
                />
              ))
          )}
        </CardBlock>



      </ContainerBlock>



    </PageBTW >
  );
}
