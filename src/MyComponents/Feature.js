import React from 'react';
import Featurebox from './Featurebox';
import fimage1 from '../images/track.jpeg';
import fimage2 from '../images/Payment.jpeg';
import fimage3 from '../images/redem.jpeg';
import fimage4 from '../images/update.jpeg';

function Feature() {
  return (
    <div id='features'>
      <h1>SERVICES</h1>
      <div className='a-container'>
        <Featurebox 
          image={fimage1} 
          title="Meal Tracking" 
          message="Track your daily meals easily" 
        />
        <Featurebox 
          image={fimage3} 
          title="Meal Redemption" 
          message="Redeem meals effortlessly" 
        />
         <Featurebox 
          image={fimage2} 
          title="Online Payment" 
          message="Fast and secure meal payments" 
        />
        <Featurebox 
          image={fimage4} 
          title="Quick Updates" 
          message="Get instant dining updates" 
        />
      </div>
    </div>
  );
}

export default Feature;
