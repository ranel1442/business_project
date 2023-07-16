import { useContext, useState } from "react";
import Title from "../components/Title";
import Card from "./cards/Card";
import { CardContext } from "./cards/Cards";
import { AppContext } from "../App";
import { deleteCard } from "../services/ApiService";
import { toast } from "react-toastify";

export interface CardPackage{
    _id?:string
    title?:string
    subTitle?:string
    description?:string
    phone?:string
    email?:string
    web?:string
    imageUrl?:string
    imageAlt?:string
    state?:string
    country?:string
    city?:string
    street?:string
    houseNumber?:string
    zip?:string,
    emailCreate?:string
}
interface CardContextType {
    onDelete: Function
}
function Home() {
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
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    {context?.cards.map((item,index)=>{
                        if("ranel011021@gmail.com"!==item.emailCreate){
                            return null
                        }
                        return<>
                        <Card key={index} card={item}/>
                        </>
                        
                    })
                        
                    }
                </div>
            </div>
        </>
    );
}

export default Home;