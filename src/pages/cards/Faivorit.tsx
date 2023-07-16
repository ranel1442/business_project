import { createContext, useContext, useEffect, useState } from "react";
import { CardPackage } from "../Home";
import { deleteCard, getCardsById } from "../../services/ApiService";
import { AppContext } from "../../App";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import { CardContext } from "./Cards";
import Card from "./Card";
import { useNavigate } from "react-router-dom";


interface CardContextType {
    onDelete: Function
}

function Fauvorits() {    
    const context = useContext(AppContext);
    const [card, setCard] = useState<CardPackage>();
    const [cards, setCards] = useState<Array<CardPackage>>([]);
    const  [title,setTitle]=useState("")
    const  [caunter,setCaunter]=useState(0)
    const [isLoading,setIsLoading]=useState(true)

    const navigate = useNavigate();


    useEffect(() => {

        if(caunter>=(context?.cardsLove.length as number)){
            return
        }

        getCardsById(context?.cardsLove[caunter] as string)
            .then(json => {
                setCard(json as CardPackage);
                setTitle(json.title as string)
                setCards([...cards,card as CardPackage] as Array<CardPackage> )
                console.log(cards)

            setCaunter(caunter+1)
            })
            setTimeout(()=>{
                setIsLoading(false)
            },6000)
    }, [caunter]);

  
    async function onDelete(_id: string) {
        const res = await deleteCard(_id);
        const updated = [...cards].filter(
            card => card._id !== _id
        )
        setCards(updated);

        toast.success('Vacation has been deleted');
    }
    return (<>
     {isLoading&&<Title mainText="Loading..."/>}
{!isLoading&&<>
<Title mainText={"All the business you love"} subText="in one place"/>
<CardContext.Provider  value={{onDelete}}>


            {cards.map((item,index)=>{
                if(typeof item==='undefined'){
                    return null
                }
                return <>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <Card key={index} card={item}/>;    
                    </div>
                </div>
                    </>
            })}

</CardContext.Provider>
</>
}  



</>
        );
}

export default Fauvorits;