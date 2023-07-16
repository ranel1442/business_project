import { useContext, useState } from "react";
import FormLayout from "../components/FormLayout";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { login } from "../services/ApiService";
import { setToken } from "./TokenManager";
import { AppContext,  } from "../App";
import { toast } from "react-toastify";

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const context = useContext(AppContext);


    function validate(): boolean {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) { 
            toast.error('email is required.')
            return false
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password)) {
            toast.error('Password must six characters, at least one uppercase letter, one lowercase letter, one number and one special character(@$!%*?&)')
            return false
        }

        return true
    }
    function handleClick() {
        if (!validate()) {
            return;
        }
        login({
            email,
            password
        })
            .then((user) => {
                setToken(user.token)
                if (context) {
                    context.setAdmin(user.isAdmin);
                    context.setUserName(user.firstName);
                    context.setBusiness(user.business);
                    context.setLoginEmail(user.email)
                }
                navigate('/')
                toast.success("you inside")
            })
    }


    return ( 
        <>
            <Title
                mainText="Login"/>
            <FormLayout>
            <div className="mb-3">
                    <label
                        className="form-label"
                    >
                        Email
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


                </div>
                <div className="mb-3">
                    <button
                        className="btn btn-info me-3"
                        onClick={handleClick}
                    >
                        Login
                    </button>
                </div>
            </FormLayout>
        
        </>
     );
}

export default LogIn;