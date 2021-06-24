import {createContext, ReactNode, useEffect, useState} from 'react';
import { auth,firebase } from '../services/firebase';

type User = {
    id: string,
    name: string, 
    avatar: string,
}

//Ele pode ser um user ou undefined
//Estamos dizendo que o signInWithGoogle é uma promise pois ele é uma função assincrona
type AuthContextType={
    user: User | undefined;
    signInWithGoogle: ()=>Promise<void>;
}

type AuthContextProviderProps ={
    children: ReactNode;
}

//aqui está a nossa tipagem
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props:AuthContextProviderProps){
    
    const [user,setUser] = useState<User>();

    //Responsável por guardar o usuário no sistema após o cliente sair do site
    useEffect(()=>{
        //é recomendados guaradar o componente em uma variável e colocá-lo no return
        const unSubscribe = auth.onAuthStateChanged(user=>{
            if(user){
                const {displayName, photoURL, uid} = user;

                if(!displayName || !photoURL){
                    throw new Error('Missing information from Google Account')
                }
            
                setUser({
                    id:uid,
                    name: displayName,
                    avatar: photoURL,
                })
            }
        })
        //boa prática
        return()=>{
            unSubscribe();
        }
    },[])

    async function signInWithGoogle(){
    
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider)

    
        if(result.user){
            const {displayName, photoURL, uid} = result.user

            if(!displayName || !photoURL){
                throw new Error('Missing information from Google Account')
            }
        
            setUser({
                id:uid,
                name: displayName,
                avatar: photoURL,
            })
        }
    }
    
    return(
        <AuthContext.Provider value={{user, signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    )
}