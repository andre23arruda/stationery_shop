import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ProductsList from './components/ProductsList'
import ProductDetail from './components/ProductDetail'
import Header from './components/Header'

export default class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Header />
                <Route path="/:code/" component={ProductDetail} />
                <Route path="/" exact component={ProductsList} />
            </Router>
        )
    }
}
