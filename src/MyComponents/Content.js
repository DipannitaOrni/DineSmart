import React from 'react'
import ContentHeader from './ContentHeader';

import UserHome from './UserHome';
import './Content.css';
const Content=()=>{
  return (
    <div className='content'>
        <ContentHeader/>
        <UserHome/>
    </div>
  )
}

export default Content;