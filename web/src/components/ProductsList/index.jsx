import React from 'react';
import { connect } from 'react-redux'
import { fetchProducts } from '../../services/actions';
import { PongSpinner } from 'react-spinners-kit';
import { Container, Row, Col } from 'react-bootstrap';

import Product from './Product';

import './ProductsList.scss'

function totalItems(products) {
  const initialValue = 0
  const result = products.length ? products.reduce(
    (previousValue, product) => previousValue + product.available_quantity,
    initialValue
  ) : 0
  return result
}


class ProductsList extends React.Component {

  componentDidMount(){
    this.props.fetchProducts();
  }

  render(){
    const { isLoading, products } = this.props;

    if (isLoading) {
      return (
        <Container style={{ height: '100vh' }}>
          <div style={{ margin: '0 auto', top: 'calc(50% - 17px)', width: '60px', position: 'relative' }}>
            <PongSpinner />
          </div>
        </Container>
      )
    }

    return (
      <Container className="top-offset products-container">
        <Row className="sub-header">
          <h1>Products List</h1>

          <Col className="status-area">
            <h3>Inventory Status</h3>
            <p className="single-products"><strong>Single products: </strong>{ products.length }</p>
            <p><strong>Total items in stock: </strong>{ totalItems(products) }</p>
          </Col>
        </Row>

        <Row>
          {products.map(product => (
            <Col md="6" key={product.code}>
              <Product {...product}/>
            </Col>
          ))}
        </Row>

      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ isLoading: state.products.isLoading, products: state.products.items });
const mapDispatchToProps = (dispatch) => ({ fetchProducts: () => dispatch(fetchProducts()) });

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);
