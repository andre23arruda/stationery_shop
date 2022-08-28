import React from 'react'

import './DetailCard.scss'

const UnavailableText = () => {
    return <span className="unavailable">Unavailable</span>
}

export default function DetailCard(props) {
    return (
        <div className="detail-card">
            <p>
                <strong>Code: </strong>
                {props.code}
            </p>

            <p>
                <strong>Category: </strong>
                <span>{props.category || <UnavailableText />}</span>
            </p>

            <p>
                <strong>Description: </strong>
                {props.description || <UnavailableText />}
            </p>
        </div>
    )
}
