import React from 'react'
import { getDateFormatJson } from '../../../utils'

import './QuantityCard.scss'

export default function QuantityCard(props) {
    const ioHistory = props.history_list

    return (
        <div className="quantity-card">
            <div className="quantity">
                <h3>Quantity Available:</h3>
                <h1>{props.available_quantity}</h1>
            </div>

            <div className="io-history">
                <h3>I/O History</h3>

                <div className="data-container">
                    { ioHistory.map((value) => (
                        <div className="io-data">
                            <p>{ getDateFormatJson(value.date)} </p>

                            <div>
                                <span className="quantity_in">
                                    <strong>{ value.quantity_in ? `🡓${value.quantity_in}` : '---' }</strong>
                                </span>

                                <span className="quantity_out">
                                    <strong>{ value.quantity_out ? `🡑${value.quantity_out}` : '---' }</strong>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
