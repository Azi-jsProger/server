import React, {ReactNode, useState} from 'react';
import cls from "./Dropdown.module.scss"
import {classNames} from "../../5shered/styleFunction/classNameFn";

type TDropdownProps = {
    children: ReactNode,
    className: string,
    darcking?:boolean
}

const Dropdown = (props: TDropdownProps) => {
    const { children, className, darcking } = props

    return (
        <>
            <div className={classNames(cls.none, {[cls.darcking]: darcking})}></div>
            <ul className={className} style={{zIndex:"101"}}>
                {children}
            </ul>
        </>
    );
};

export default Dropdown;