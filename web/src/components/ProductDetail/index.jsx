import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { PongSpinner } from 'react-spinners-kit';
import { Container, Row, Col } from 'react-bootstrap';

import CustomButton from '../CustomButton';
import DetailCard from './DetailCard';
import QuantityCard from './QuantityCard';
import { fetchProduct } from '../../services/actions';

import './ProductDetail.scss'
import ArrowLeft from '../../assets/arrow-left.svg'


class ProductsDetail extends React.Component {

  componentDidMount(){
    const { code } = this.props.match.params;
    this.props.fetchProduct(code);
  }

  render(){
    const { isLoading, product } = this.props;

    if (isLoading) {
      return (
        <Container style={{ height: '100vh' }}>
          <div style={{ margin: '0 auto', top: 'calc(50% - 17px)', width: '60px', position: 'relative' }}>
            <PongSpinner />
          </div>
        </Container>
      )
    }

    if (product) {
      return (
        <Container className="top-offset product-detail">
          <div className="product-name">
            <CustomButton>
              <Link to='/'>
                <img src={ ArrowLeft } alt="Back" title="Go back" />
              </Link>
            </CustomButton>

              <h1 className="ml-4 mb-0">{product.name}</h1>
          </div>

          <Row>
            <Col md="8">
              <DetailCard {...product} />
            </Col>

            <Col md="4" className="quantity-container">
              <QuantityCard {...product } />
            </Col>
          </Row>
        </Container>
      );
    }

    return null;
  }
}

function currentProduct(products, code) {
  const productsList = products.items
  return productsList.length > 0 ? productsList.find(product => product.code === code) : products.selectedItem
}

const mapStateToProps = (state, props) => {
  const { products } = state
  const { code } = props.match.params
  return {
    isLoading: state.products.isLoading,
    product: currentProduct(products, code)
  }
}
const mapDispatchToProps = (dispatch) => ({ fetchProduct: (code) => dispatch(fetchProduct(code)) });

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetail);
