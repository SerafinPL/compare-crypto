'use client'
import { EventHandler, useState } from "react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NaviBar: React.FunctionComponent = () => {

    const pathname = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const menuArray = ['Dashboard', ];//'Coin', 'Compare',

    const clickCloseHandler = () => {
        setDropdownOpen(false);
    }

    console.log();


    const menuView = menuArray.map(el => <li key={`menuItem${el.toLowerCase()}`} onClick={() => setDropdownOpen(false)}>
        <Link href={`/${el.toLowerCase()}`} className={`${pathname == el.toLowerCase() ? 'active' : ''}`}
            onClick={clickCloseHandler}>
            {el}
        </Link>
    </li>)

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">

                <div className={`dropdown ${dropdownOpen ? 'dropdown-open' : ''}`}>
                    <div className="btn btn-ghost lg:hidden" onClick={() => setDropdownOpen(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>

                    <ul className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${dropdownOpen ? '' : 'hidden'}`} onClick={() => setDropdownOpen(false)}>
                        {menuView}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Crypto Compare</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuView}
                </ul>
            </div>
            <div className="navbar-end">
                {/* <a className="btn ">Search</a> */}
            </div>
        </div>

    )
}

export default NaviBar;