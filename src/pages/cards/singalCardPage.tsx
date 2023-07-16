import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../App";
import { getCardsById } from "../../services/ApiService";
import Title from "../../components/Title";

function SingalCardPage() {

    const context = useContext(AppContext);

    const navigate = useNavigate();
    const { id } = useParams();
    const [title,setTitle]=useState('')
    const [subTitle,setSubTitle]=useState('')
    const [description,setDescription]=useState('')
    const [phone,setPhone]=useState('')
    const [email,setEmail]=useState('')
    const [web,setWeb]=useState<any>()
    const [imageUrl,setImageUrl]=useState<any>()
    const [imageAlt,setImageAlt]=useState<any>()
    const [state,setState]=useState<any>()
    const [country,setCountry]=useState('')
    const [city,setCity]=useState('')
    const [street,setStreet]=useState('')
    const [houseNumber,setHouseNumber]=useState('')
    const [zip,setZip]=useState<any>()


    useEffect(() => {
        if (!id) return;

        getCardsById(id)
            .then(json => {
                setTitle(json.title as string)
                setSubTitle(json.subTitle as string)
                setDescription(json.description as string)
                setPhone(json.phone as string)
                setEmail(json.email as string)
                setWeb(json.web)
                setImageUrl(json.imageUrl)
                setImageAlt(json.imageAlt)
                setState(json.state)
                setCountry(json.country as string)
                setCity(json.city as string)
                setStreet(json.street as string)
                setHouseNumber(json.houseNumber as string)
                setZip(json.zip as string)
                
            })
    }, [id])

    return ( 
        <>
        <Title mainText={title} subText={subTitle}/>
                <div className="text-center">
                    {imageUrl&&<img src={imageUrl} className="card-img-top" alt={imageAlt}/>}
                    <div className="card-body">
                        <p className="card-text">{description}</p>
                     </div>
                        <div className="card-footer">
                        <p className="card-text">We are in {state} {country} {city} {street} {houseNumber} and are zip:{zip}</p>
                        <p className="card-text">To contact us our Email:   {email}         Phone:   {phone}</p>
                        {web&&
                        <>  <Link to={web}>
                        <p className="card-text">Visit us on our website</p>
                        </Link></>}
                        </div>
                </div>
        </>
     );
}

export default SingalCardPage;