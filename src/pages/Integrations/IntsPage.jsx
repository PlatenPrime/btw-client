import React from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, PageBTW, Spinner } from '../../components'
import useIntsStore from './stores/IntsStore';
import { useNavigate } from 'react-router-dom';

export default function IntsPage() {


    const navigate = useNavigate()


    const { ints,  getAllInts } = useIntsStore();


    const [error, setError] = React.useState(null);
    const [isIntsLoading, setIsIntsLoading] = React.useState(false);









    React.useEffect(() => {




        const fetchInts = async () => {


            try {
                setIsIntsLoading(true);
                getAllInts()
            } catch (error) {
                setError(error);
            } finally {
                setIsIntsLoading(false);
            }
        }

        fetchInts()



    }, [getAllInts]);











    return (

        <PageBTW>
            <HeaderBlock
                className="bg-green-500 shadow-2xl shadow-green-500"
            >
                Інтеграції
            </HeaderBlock>


            <ButtonGroup>

                <ButtonBlock
                    className="green-b"
                    onClick={() => navigate('/createint')}
                >
                    Створити інтеграцію
                </ButtonBlock>
            </ButtonGroup>



            {isIntsLoading ? (
                <ContainerBlock
                    className="w-full h-full flex justify-start items-center"
                >
                    <Spinner color="rgb(34 197 94)" />
                </ContainerBlock>
            ) : (
                <ContainerBlock className="flex flex-col gap-4">
                    {ints?.map((int) => (

                        <CardBlock
                            onClick={() => navigate(`/ints/${int._id}`)}
                            key={int._id}
                            className="text-center text-3xl p-4 bg-green-500/20 hover:bg-green-500 rounded-xl cursor-pointer transition duration-500 ease-in-out"
                        >
                            {int.title}
                        </CardBlock>

                    ))}
                </ContainerBlock>
            )}





        </PageBTW >

    )
}
