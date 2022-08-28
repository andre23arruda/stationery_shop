import React from 'react'

import Logo from '../../assets/logo.svg'
import './Header.scss'


export default function Header() {
    return (
        <header className="header">
            <img src={ Logo } alt="Stationery Shop Logo" title="Stationery Shop" />
        </header>
    )
}
