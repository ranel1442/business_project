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

function MyCards() {
    // const [cards, setCards] = useState<Array<CardPackage>>([]);
    const context = useContext(AppContext);

    async function onDelete(_id: string) {
        const res = await deleteCard(_id);
        const updated = [...context?.cards as CardPackage[]].filter(
            card => card._id !== _id
        )

        context?.setCards(updated);

        toast.success('Vacation has been deleted');
    }
    return (
        <>
        <Title mainText={"All your business"}/>

            <CardContext.Provider  value={{onDelete}}>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    {context?.cards.map((item,index)=>{
                        if(context.loginEmail!==item.emailCreate){
                            return null
                        }
                        return<>
                        <Card key={index} card={item}/>
                        </>
                        
                    })
                        
                    }
                </div>
            </div>
            </CardContext.Provider>
        </>
        );
}

export default MyCards;