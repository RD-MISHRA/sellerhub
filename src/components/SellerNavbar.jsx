import React from 'react';
import SellerNavbar from './SellerNavbar';

const App = () => {
  const sellerName = "John Doe";

  return (
    <div>
      <SellerNavbar sellerName={sellerName} />
      {/* Other components and content */}
    </div>
  );
};

export default App;