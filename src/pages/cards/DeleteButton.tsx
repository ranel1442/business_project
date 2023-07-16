import { useContext } from "react";
import { CardContext } from "./Cards";

interface Props {
    cardId: string,
}
function DeleteButton({cardId}:Props) {
    const context = useContext(CardContext);
    function handleClick() {
        if (!context) return;

        context.onDelete(cardId);
    }

    return ( 
        <button
            className="btn btn-default ms-2"
            onClick={handleClick}
        >
            <i className="bi bi-trash" />
        </button>
     );
}

export default DeleteButton;