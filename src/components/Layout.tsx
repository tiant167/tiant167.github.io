import React from 'react';
import Header from './Header';

const Layout: React.FunctionComponent = (props) => {
  return (
    <div className="App">
      <Header />
      { props.children }
    </div>
  )
}

export default Layout
