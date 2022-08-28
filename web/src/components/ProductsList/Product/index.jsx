import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CustomButton from '../../CustomButton';

import './Product.scss'


export default function Product(props){
  const [touchActive, setTouchActive] = useState('')
  const history = useHistory()

  function seeDetails() {
    const isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0))
    if (isTouch) {
      history.push(`/${props.code}/`)
    }
  }

  return (
    <dl
      className={ `product-card ${ touchActive }` }
      onClick={ seeDetails }
      onTouchMove={() => setTouchActive('touch-active')}
      onTouchEnd={() => setTouchActive('')}
    >
      <div className="name-container">
        <strong>Name:</strong>
        <h2>{ props.name }</h2>
      </div>

      <div className="code-category">
        <div>
          <p><strong>Code: </strong>{ props.code }</p>
          <p><strong>Category: </strong>{ props.category }</p>
        </div>

        <CustomButton>
          <Link to={`/${props.code}/`}>See Details</Link>
        </CustomButton>
      </div>
    </dl>
  );
}
