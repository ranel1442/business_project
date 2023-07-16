import { useContext, useEffect, useState } from "react";
import { CardPackage } from "../Home";
import { AppContext } from "../../App";
import { addCards, getCards } from "../../services/ApiService";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import AddCard from "./AddCard";

function NewCard() {
    const [cards,setCards]=useState<Array<CardPackage>>([])
    const context = useContext(AppContext);

    useEffect(() => {
        getCards()
            .then(json => {
                setCards(json);
            })
    }, []);

    function onAdd(card: CardPackage) {
        addCards(card)
            .then(json => {
                setCards([
                    ...cards,
                    json
                ])

                toast.success(` your business ${json.title} has been added successfully`);
            })
    }
    return (  
        <>
            {context?.userName &&
                <div className="p-2">Welcome {context.userName}</div>
            }
            <Title
                mainText="New Card"
                subText="lets create a new card"
            />
            <AddCard onAdd={onAdd}/>
        </>
    );
}

export default NewCard;