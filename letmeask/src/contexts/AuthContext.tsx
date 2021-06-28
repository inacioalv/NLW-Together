import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../service/firebase";


type User = {
    id: string;
    name: string;
    avatar: string;
}

type AuthContextType = {
    user: User | undefined;
    singnInWinthGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

//Contexto conpartilhar informação
export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider(props: AuthContextProviderProps) {

    //inicia como user || undefined
    const [user, setUser] = useState<User>();

    //Manter logado
    useEffect(() => {
        //ficar ouvindo o evento, se detectar um usuario logado retorna ele
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                if (user) {
                    //Buscar dados do usuário
                    const { displayName, photoURL, uid } = user

                    //Ferificar se usuário não tiver nome ou photo
                    if (!displayName || !photoURL) {
                        throw new Error('Missing information from Google Account.');
                    }
                    //se tem coloca os dados
                    setUser({
                        id: uid,
                        name: displayName,
                        avatar: photoURL
                    })
                }
            }
        })

        //descadastrar
        return () => {
            unsubscribe();
        }
    }, []);


    async function singnInWinthGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        //Foi retornado um usuário
        if (result.user) {
            //Buscar dados do usuário
            const { displayName, photoURL, uid } = result.user

            //Ferificar se usuário não tiver nome ou photo
            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.');
            }
            //se tem coloca os dados
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }

    };

   


    return (
        <AuthContext.Provider value={{ user, singnInWinthGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}