import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signup } from "../services/ApiService";
import FormLayout from "../components/FormLayout";
import Title from "../components/Title";

export interface User {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
    imageUrl?: string;
    imageAlt?: string;
    state?: string;
    country?: string;
    city?: string;
    street?: string;
    houseNumber?: string;
    zip?: string;
    token?: string;
    business?: boolean;
    isAdmin?:boolean;
    cardsLove?:any
}

function SingUP() {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState<any>("");
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState<any>();
    const [imageAlt, setImageAlt] = useState<any>();
    const [state, setState] = useState<any>();
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [zip, setZip] = useState<any>();
    const [business, setBusiness] = useState<any>(false);

    const navigate = useNavigate();

    function validate(): boolean {
        if (!firstName || firstName.length < 2) {
            toast.error('name is required.')
            return false
        }
        if (!lastName || lastName.length < 2) {
            toast.error('last name is required.')
            return false
        }
        if (!phone || phone.length < 9||phone.length>14) {
            toast.error('phone is required.')
            return false
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) { 
            toast.error('email is required.')
            return false
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
            toast.error('Password must six characters, at least one uppercase letter, one lowercase letter, one number and one special character(@$!%*?&)')
            return false
        }
        if (!country || country.length < 2) {
            toast.error('country is required.')
            return false
        }
        if (!city || city.length < 2) {
            toast.error('city is required.')
            return false
        }
        if (!street || street.length < 2) {
            toast.error('street is required.')
            return false
        }
        if (!houseNumber||houseNumber.length>5) {
            toast.error('house number is required.')
            return false
        }
        return true
    }

    function handleClick() {
        if (!validate()) {
            return;
        }
        signup({
            firstName,
            middleName,
            lastName,
            email,
            phone,
            password,
            imageUrl,
            imageAlt,
            state,
            country,
            city,
            street,
            houseNumber,
            zip,
            business
        })
            .then((user) => {
                navigate('/login')
            })
    }

    return ( 
        <>
        <Title
            mainText="Sign Up"
            subText="register to the application"
        />

        <FormLayout>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  First Name*
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label
                    className="form-label"
                >
                  Middle Name
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                />
            </div>
            <div className="mb-3">
            <label
                    className="form-label"
                >
                  Last Name*
                </label>
                <input
                    type="text"
                    className="form-control me-3"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control me-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
            <label
                    className="form-label"
                >
                    Singup as business
                </label>
            <input
                type="checkbox"
                checked={business}
                onChange={() => setBusiness(!business)}

            />
            </div>
            <div className="mb-3">
                <button
                    className="btn btn-info me-3"
                    onClick={handleClick}

                >
                    Sign Up
                </button>
            </div>
        </FormLayout>
    </>
     );
}

export default SingUP;