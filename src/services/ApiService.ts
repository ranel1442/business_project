import { useContext } from "react";
import { AppContext } from "../App";
import { User } from "../auth/SingUp";
import { getToken } from "../auth/TokenManager";
import { CardPackage } from "../pages/Home";



const serverUrl = 'http://localhost:3000/';
const cardsUrl = `${serverUrl}cards/`;
const usersUrl = `${serverUrl}users/`

export async function getCards(): Promise<Array<CardPackage>> {
    const res = await fetch(`${cardsUrl}`);
    return res.json();
}
export async function getCardsById(_id: string): Promise<CardPackage> {
    const res = await fetch(`${cardsUrl}${_id}`, {
        method: 'GET',
        headers: {
            'x-auth-token': getToken()
        }
    });
    return res.json();
}

export async function editCard(
    _id: string,
    card: CardPackage
): Promise<CardPackage> {
    const res = await fetch(`${cardsUrl}${_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken()
        },
        body: JSON.stringify(card)
    })
    return res.json()
}



export async function addCards(card: CardPackage): Promise<CardPackage> {
    const res = await fetch(`${cardsUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken()
        },
        body: JSON.stringify(card)
    });
    return res.json();
}
export async function deleteCard(_id: string): Promise<CardPackage> {
    const res = await fetch(`${cardsUrl}${_id}`, {
        method: 'DELETE',
        headers: {
            'x-auth-token': getToken()
        },
    })
    return res.json()
}


export async function login(user: User): Promise<User> {

    const res = await fetch(`${usersUrl}login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return res.json();
}


export async function signup(user: User): Promise<User> {
    const res = await fetch(`${usersUrl}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return res.json();
}

export async function editUser(
    email: string,
    User: User
): Promise<User> {
    const res = await fetch(`${usersUrl}${email}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken()
        },
        body: JSON.stringify(User)
    })
    return res.json()
}
export async function getUsersByEmail(email: string): Promise<User> {
    const res = await fetch(`${usersUrl}${email}`, {
        method: 'GET',
        headers: {
            'x-auth-token': getToken()
        }
    });
    return res.json();
}

