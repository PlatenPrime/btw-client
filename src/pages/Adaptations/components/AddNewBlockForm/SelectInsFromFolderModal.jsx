import React from 'react'
import { CardBlock, ModalWrapper, TextBlock } from '../../../../components'
import useAdaptBlocksStore from '../../stores/adaptBlocksStore'


export default function SelectInsFromFolderModal({
    isShowSelectInsFromFolderModal,
    setIsShowSelectInsFromFolderModal,
    selectedInsFolder,
    instructions,
    setNewAdaptBlockInsId
}) {


    const { oneAdaptBlocks } = useAdaptBlocksStore()





    const filteredInstructions = instructions?.filter((ins) => ins.folderId === selectedInsFolder?._id)
        .filter((ins) => !oneAdaptBlocks?.find((adaptBlock) => adaptBlock.insId === ins._id))



    if (!isShowSelectInsFromFolderModal) return
    return (
        <ModalWrapper
            title={selectedInsFolder?.title}
            onCancel={() => setIsShowSelectInsFromFolderModal(false)}
        >
            <CardBlock
                className="grid gap-2"
            >

                {filteredInstructions?.length === 0 && <TextBlock className="text-center">Немає доступних інструкцій</TextBlock>}

                {filteredInstructions
                    .map((ins) => (
                        <TextBlock
                            className="p-2 cursor-pointer rounded-xl text-lg
                            bg-blue-500/50 hover:shadow-lg hover:shadow-blue-500"
                            onClick={() => {
                                setNewAdaptBlockInsId(ins._id)
                                setIsShowSelectInsFromFolderModal(false)
                            }}>
                            {ins?.title}
                        </TextBlock>
                    ))}
            </CardBlock>

        </ModalWrapper>
    )
}
