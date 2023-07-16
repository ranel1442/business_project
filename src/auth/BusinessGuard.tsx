import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../App";

interface Props {
    children: ReactNode
}

function BusinessGuard({ children }: Props) {
    const context = useContext(AppContext);

    function isNotBusiness(): boolean {
        return !context?.business || false;
    }

    return isNotBusiness() ? (
        <Navigate
            to="/"
            replace={true}
        />
    ) : (
        <>{children}</>

    )
}

export default BusinessGuard;