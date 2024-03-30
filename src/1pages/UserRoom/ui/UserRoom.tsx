import React, {useContext} from 'react';
import cls from "./UserRoom.module.scss"
import {AppContext} from "../../../0app/providers/StoreProvider/Provider";
import {FaUser} from "react-icons/fa6";

const UserRoom = () => {
    const { user } = useContext(AppContext)

    return (
        <div className={cls.content}>
            <div className={cls.profile_header}>
            </div>
        </div>
    )
};

export default UserRoom;