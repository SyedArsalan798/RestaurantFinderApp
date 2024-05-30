import { useEffect, useState } from "react";
import ProfileContext from "./ProfileContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProfileContextProvider = ({children}) => {

    return (
        <ProfileContext.Provider value={4}>
            {children}
        </ProfileContext.Provider>
    )

}


export default ProfileContextProvider;