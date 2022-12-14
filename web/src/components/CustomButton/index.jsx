import React from 'react'

import './CustomButton.scss'


export default function CustomButton(props) {
    return (
        <button className="custom-button">
            { props.children }
        </button>
    )
}
