import React, { useState } from 'react';
import Button from '@mui/material/Button';
import UploadIcon from '@mui/icons-material/Upload';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import NavbarComponent from './NavbarComponent';
// Import your components here
import Upload from './Upload';
import ProductDashboard from './ProductDashboard';
import Customers from './Customers';
import sellerimage from '../images/download.jpeg';

const Side = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderComponent = () => {
    switch(activeComponent) {
      case 'Upload Product':
        return <Upload />;
      case 'Product Dashboard':
        return <ProductDashboard />;
      case 'Customers':
        return <Customers />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ 
        backgroundColor: 'white', 
        width: '33vh',
        height: '100vh',
        padding: '20px',
        marginTop: '0px',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '2px solid #ccc'
      }}>
        <img src={sellerimage} alt="Sellerimage" className="img-fluid"  
          style={{ 
            width: '100%', 
            marginBottom: '20px' 
          }}
        />
        {[
          { text: 'Upload Product', icon: <UploadIcon /> },
          { text: 'Dashboard', icon: <DashboardIcon /> },
          { text: 'Customers', icon: <PeopleIcon /> }
        ].map((item, index) => (
          <Button
            key={index}
            onClick={() => setActiveComponent(item.text)}
            variant="contained"
            startIcon={item.icon}
            style={{
              margin: '5px 0',
              backgroundColor: 'white',  // Match button background color to screen
              color: 'black',  // Set text color to black
              fontWeight: 'bold',  // Make text bold
              height: '40px',
              width: '100%',  // Ensure all buttons have the same width
              whiteSpace: 'nowrap'
            }}
          >
            {item.text}
          </Button>
        ))}
      </div>
      <div style={{ flex: 1, padding: '20px' }}>

        {renderComponent()}
      </div>
    </div>
  );
};

export default Side;