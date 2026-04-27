import { createContext, useMemo, useState } from "react";

export const AuthContext= createContext();

const AuthProvider =({children})=>{
    const storedLogin = localStorage.getItem("isLogin") === "true";
    const storedUserInfo = localStorage.getItem("userInfo");

    const [isLogin, setLoginState] = useState(storedLogin);
    const [userInfo, setUserInfoState] = useState(() => {
        if (!storedUserInfo) {
            return null;
        }

        try {
            return JSON.parse(storedUserInfo);
        } catch (error) {
            console.error("Failed to parse stored user info", error);
            localStorage.removeItem("userInfo");
            return null;
        }
    });

    const setLogin = (value) => {
        const nextValue = Boolean(value);
        setLoginState(nextValue);
        localStorage.setItem("isLogin", String(nextValue));
    };

    const setUserInfo = (value) => {
        setUserInfoState((currentValue) => {
            const nextValue =
                typeof value === "function" ? value(currentValue) : value;

            if (nextValue) {
                localStorage.setItem("userInfo", JSON.stringify(nextValue));
            } else {
                localStorage.removeItem("userInfo");
            }

            return nextValue;
        });
    };

    const contextValue = useMemo(
        () => ({ isLogin, setLogin, userInfo, setUserInfo }),
        [isLogin, userInfo]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
