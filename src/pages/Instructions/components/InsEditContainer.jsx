import React, { useState } from 'react'
import { CardBlock, ContainerBlock, InputBlock, ModalConfirm } from '../../../components'
import TitleImage from './TitleImage'
import Editor from '../Editor/QuillEditor'
import YoutubeCard from '../../../components/UI/YoutubeCard/YoutubeCard';
import useInsStore from '../stores/insStore';

export default function InsEditContainer({
    ins,
    isInsEditing,
    setIsInsEditing, 
    isShowModalInsUpdating,
    setIsShowModalInsUpdating
}) {

    const { updateInstructionById } = useInsStore();

    const [newTitle, setNewTitle] = useState(ins?.title);
    const [newTitleImage, setNewTitleImage] = useState(ins?.titleImage);
    const [newVideoUrl, setNewVideoUrl] = useState(ins?.videoUrl);
    const [newBody, setNewBody] = useState(ins?.body);


    const [isInsUpdating, setIsInsUpdating] = useState(false);




    const handleInsUpdate = async (updateData) => {
        try {
            setIsInsUpdating(true);
            const updatedInstruction = await updateInstructionById(ins?._id, updateData);
    
        } catch (error) {
            console.log(error.message);

        } finally {
            setIsInsUpdating(false);
            setIsShowModalInsUpdating(false);
            setIsInsEditing(false);
        }
    };


    if (!isInsEditing) return null;


    return (
        <CardBlock className=" flex flex-col space-y-4 ">


            {isShowModalInsUpdating &&
                <ModalConfirm
                    ask="Зберегти інструкцію?"
                    onConfirm={() => handleInsUpdate({

                        title: newTitle,
                        titleImage: newTitleImage,
                        body: newBody,
                        videoUrl: newVideoUrl
                    })}
                    onCancel={() => setIsShowModalInsUpdating(false)}
                    isConfirming={isInsUpdating}

                />}

            <CardBlock
                className="flex justify-evenly items-center space-x-4 bg-gradient-to-b from-slate-700/50 to-slate-900/50 p-2 rounded-xl"

            >

                <label
                    className='min-w-[200px]'
                    htmlFor="">Назва інструкції:
                </label>

                <InputBlock
                    name="newTitle"
                    className="text-xl outline-none border-none p-3 px-8 bg-slate-700 focus:bg-slate-600 w-full
                 placeholder:font-light rounded-xl rounded-l-none
                "
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="..."
                />


            </CardBlock>

            <CardBlock
                className="flex justify-start items-center space-x-4 bg-gradient-to-b from-slate-700/50 to-slate-900/50 p-2 rounded-xl"

            >

                <label htmlFor=""
                    className='min-w-[200px]'
                >
                    Зображення:
                </label>



                <CardBlock
                    className="w-full flex justify-center "
                >
                    <TitleImage newTitleImage={newTitleImage} setNewTitleImage={setNewTitleImage} />
                </CardBlock>

            </CardBlock>




            <CardBlock
                className="flex justify-start items-center space-x-4 bg-gradient-to-b from-slate-700/50 to-slate-900/50 p-2 rounded-xl"
            >
                <label htmlFor=""
                    className='min-w-[200px]'
                >
                    Відео:
                </label>



                <InputBlock
                    type="text"
                    className="text-xl outline-none border-none p-3 px-8 bg-slate-700 focus:bg-slate-600 w-full
                 placeholder:font-light rounded-xl rounded-l-none
                "
                    placeholder="https://www.youtube.com/..."
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                />

            </CardBlock>


            {newVideoUrl
                &&
                <YoutubeCard url={newVideoUrl} />

            }


       

                <Editor
                    value={newBody}
                    setValue={setNewBody}

                />

        </CardBlock>
    )
}
