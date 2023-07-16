import { Link } from "react-router-dom";
import { CardPackage } from "../Home";
import DeleteButton from "./DeleteButton";
import { verifyToken } from "../../auth/TokenManager";
import { useContext, useEffect, useState } from "react";
import { getCardsById,editCard, editUser, getUsersByEmail} from "../../services/ApiService";
import { AppContext } from "../../App";

export interface CardProps{
card:CardPackage

}

function Card({card}:CardProps) {
const context = useContext(AppContext);
const[cardsLove,setCardsLove]=useState<any>([])


const [boolLove,setBoolLove]=useState<Boolean>(false)
useEffect(()=>{
    console.log(context?.loginEmail)
    if (!context?.loginEmail) return;
    
    console.log(context?.cardsLove[1])

    editUser(context?.loginEmail as string,{
        cardsLove
    })
    if (context) {
        context.setCardsLove(cardsLove)
    }
},[boolLove])
const [heartColor,setHeartColor]=useState("bi bi-heart")

function handleClick(){
    if(cardsLove==undefined){
        setBoolLove(!boolLove)
        setCardsLove(card._id)

    }
    else{
    setBoolLove(!boolLove)
    setCardsLove([...cardsLove,card._id])
    if(boolLove==true) setHeartColor("bi bi-heart text-danger")
    else{setHeartColor("bi bi-heart")}
    }
    

}

function CreateUserOrAdmin(){
    return (context?.loginEmail===card.emailCreate)||context?.admin===true
}
    return ( 
                <div className="card">
                    <img src={card.imageUrl} className="card-img-top" alt={card.imageAlt} />
                    <div className="card-body">
                        <h5 className="card-title">{card.title}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{card.subTitle}</h6>
                        <p className="card-text">Phone:{card.phone}</p>
                        <p className="card-text">Address:{card.country}{card.state }{card.city}{card.street}{card.houseNumber}</p>
                        {CreateUserOrAdmin()&&
                        <>
                        <DeleteButton cardId={card._id as string}/>
                        <Link
                        
                        to={`/edit/${card._id}`}
                        className="btn btn-default"
                        >
                        <i className="bi bi-pen" />
                        </Link>
                        </>}
                        {verifyToken() &&
                        <>
                        <Link 
                            to={`/cards`}
                            className="btn btn-default"
                            onClick={handleClick}
                            >
                                
                             <i className={heartColor}></i>
                        </Link>
                        </>}
                        <Link 
                            to={`/business/${card._id}`}
                            className="btn btn-default"
                            >
                                <i className="bi bi-telephone"></i>
                        </Link>

                    </div>
                </div>

     );
}

export default Card;