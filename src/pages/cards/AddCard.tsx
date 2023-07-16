import { useContext, useState } from "react";
import { toast } from "react-toastify";
import FormLayout from "../../components/FormLayout";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

interface Props{
    onAdd:Function
}

function AddCard({onAdd}:Props) {
    const context = useContext(AppContext);
    
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
    const [emailCreate,setEmailCreate]=useState(context?.loginEmail)

    const navigate = useNavigate();
   
    // context?.loginEmail
function validate():boolean{
    if (!title||title.length<2){
        toast.error("You have entered an invalid Title")
        return false
    }    
    if (!subTitle||subTitle.length<2){
        toast.error("You have entered an invalid SubTitle")
        return false
    }
    if (!phone||phone.length<9||phone.length>14){
        toast.error("You have entered an invalid Phone")
        return false
    }    
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        toast.error("You have entered an invalid Email")
        return false
    }    
    if (!country||country.length<2){
        toast.error("You have entered an invalid Country")
        return false
    }    
    if (!city||city.length<2){
        toast.error("You have entered an invalid City")
        return false
    }    
    if (!street||street.length<2){
        toast.error("You have entered an invalid Street")
        return false
    }    
    if (!houseNumber||houseNumber.length<1||houseNumber.length>5){
        toast.error("You have entered an invalid House Number")
        return false
    }    
    return true
}
function handleClick() {
    if (!validate()) {
        return;
    }

    onAdd({
        title,
        subTitle,
        description,
        phone,
        email,
        web,
        imageUrl,
        imageAlt,
        state,
        country,
        city,
        street,
        houseNumber,
        zip,
        emailCreate
    })
    setTitle('')
    setSubTitle('')
    setDescription('')
    setPhone('')
    setEmail('')
    setWeb('')
    setImageUrl('')
    setImageAlt('')
    setState('')
    setCountry('')
    setCity('')
    setStreet('')
    setHouseNumber('')
    setZip('')
    navigate('/myCards');

}
    return ( 
        <>
        <FormLayout>
        <div className="mb-3">
                <label
                    className="form-label"
                >
                  Title*
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  Sub Title*
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  Description*
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  Phone*
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  Email*
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  Web
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={web}
                    onChange={(e) => setWeb(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  Image Url
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  Image Alt
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  State
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  Country*
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  City*
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  Street*
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  House Number*
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  zip
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                />
            </div>
            <button
                className="btn btn-info"
                onClick={handleClick}
            >
                Add
            </button>
        </FormLayout>
        </>
     );
}

export default AddCard;