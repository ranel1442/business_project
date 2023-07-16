
import { createContext, useContext, useEffect, useState } from "react";
import Title from "../../components/Title";
import Card from "./Card";
import { deleteCard, getCards } from "../../services/ApiService";
import { CardPackage } from "../Home";
import { toast } from "react-toastify";
import { AppContext } from "../../App";

export interface CardContextType {
    onDelete: Function
}
export const CardContext = createContext<CardContextType | null>(null);
function Cards() {
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
        <Title mainText={"All the business you need"} subText="in one place"/>

            <CardContext.Provider  value={{onDelete}}>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    {context?.cards.map(card=>
                    <Card
                        key={card._id}
                        card={card}
                        />
                    )}
                </div>
            </div>
            </CardContext.Provider>
        </>
     );
}

export default Cards;