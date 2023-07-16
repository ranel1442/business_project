import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { editCard, getCardsById } from "../../services/ApiService";
import { toast } from "react-toastify";
import FormLayout from "../../components/FormLayout";
import { AppContext } from "../../App";

function Edit() {
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

    const [emailCreate,setEmailCreate]=useState(context?.loginEmail as string)

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
            return
        }

        if (!id) return;

        editCard(id, {
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
            
        })
            .then(json => {
                navigate('/cards');
            })
    }

    return (  
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
            <div className="mb-3">
            <button
                className="btn btn-info me-3"
                onClick={handleClick}
            >
                Update
            </button>
            <Link
                    to="/cards"
                    className="btn btn-secondary"
                >
                    Cancel
                </Link>
            </div>

        </FormLayout>
    );
}

export default Edit;