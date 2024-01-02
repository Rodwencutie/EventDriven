// Orders.js
/*
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const StyledThTd = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const StyledTh = styled(StyledThTd)`
  background-color: white;
`;

const StyledTr = styled.tr`
  &:hover {
    background-color: white;
  }
`;

const StyledInfoParagraph = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #b0b9b9;
  margin-bottom: 10px;
  text-align: center;
`;

const SearchBar = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`;

const Button = styled.button`
background-color: #f1d0fb;
color: #000000;
padding: 10px 20px;
border: none;
cursor: pointer;
border-radius: 4px;
transition: background-image 0.25s;
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8081/Customers');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSearch = () => {
    const filteredOrders = orders.filter(order =>
      Object.values(order).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setOrders(filteredOrders);
  };
  const handleDelete = async (customerId) => {
    try {
      await fetch(`http://localhost:8081/Delete_Customers/${customerId}`, {
        method: 'DELETE',
      });
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleUpdate = async (customerId) => {
    console.log(`Update order with ID: ${customerId}`);
  };

  return (
    <div>
      <StyledInfoParagraph>CUSTOMERS RESERVATION INFORMATION</StyledInfoParagraph>
      <SearchBar
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      <StyledTable>
        <thead>
          <StyledTr>
            <StyledTh>Customer_ID</StyledTh>
            <StyledTh>Name</StyledTh>
            <StyledTh>Email</StyledTh>
            <StyledTh>Contact No</StyledTh>
            <StyledTh>Venue</StyledTh>
            <StyledTh>Menu</StyledTh>
            <StyledTh>Event</StyledTh>
            <StyledTh>Date</StyledTh>
            <StyledTh>Time</StyledTh>
            <StyledTh>Actions</StyledTh>
          </StyledTr>
        </thead>
        <tbody>
          {orders.map(order => (
            <StyledTr key={order.Customer_ID}>
              <StyledThTd>{order.Customer_ID}</StyledThTd>
              <StyledThTd>{order.Name}</StyledThTd>
              <StyledThTd>{order.Email}</StyledThTd>
              <StyledThTd>{order.Contact_no}</StyledThTd>
              <StyledThTd>{order.Venue}</StyledThTd>
              <StyledThTd>{order.Menu}</StyledThTd>
              <StyledThTd>{order.Event}</StyledThTd>
              <StyledThTd>{order.Date}</StyledThTd>
              <StyledThTd>{order.Time}</StyledThTd>
              <StyledThTd>
                <Button onClick={() => handleDelete(order.Customer_ID)}>Delete</Button>
                <Button onClick={() => handleUpdate(order.Customer_ID)}>Update</Button>
              </StyledThTd>
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default Orders;
*/


// Orders.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UpdateForm from './Update';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const StyledThTd = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const StyledTh = styled(StyledThTd)`
  background-color: white;
`;

const StyledTr = styled.tr`
  &:hover {
    background-color: white;
  }
`;

const StyledInfoParagraph = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #b0b9b9;
  margin-bottom: 10px;
  text-align: center;
`;

const SearchBar = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`;

const Button = styled.button`
background-color: #f1d0fb;
color: #000000;
padding: 10px 20px;
border: none;
cursor: pointer;
border-radius: 4px;
transition: background-image 0.25s;
`;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8081/Customers');
      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSearch = () => {
    const filteredOrders = orders.filter(order =>
      Object.values(order).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredOrders(filteredOrders);
  };


  const handleDelete = async (customerId) => {
    try {
      await fetch(`http://localhost:8081/Delete_Customers/${customerId}`, {
        method: 'DELETE',
      });
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  const handleUpdate = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowUpdateForm(true);
  };

  const updateData = async (customerId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:8081/Update_Customers/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log('Customer updated successfully');
        fetchOrders();
      } else {
        console.error('Error updating customer:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating customer:', error);
    }
    // For demonstration, reset the selected customer ID and close the form
    setSelectedCustomerId(null);
    setShowUpdateForm(false);
  };

  const closeModal = () => {
    setSelectedCustomerId(null);
    setShowUpdateForm(false);
    setModalContent(null);
  };

  return (
    <div>
      <StyledInfoParagraph>CUSTOMERS RESERVATION INFORMATION</StyledInfoParagraph>
      <SearchBar
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      <StyledTable>
        <thead>
          <StyledTr>
            <StyledTh>Customer_ID</StyledTh>
            <StyledTh>Name</StyledTh>
            <StyledTh>Email</StyledTh>
            <StyledTh>Contact No</StyledTh>
            <StyledTh>Venue</StyledTh>
            <StyledTh>Menu</StyledTh>
            <StyledTh>Event</StyledTh>
            <StyledTh>Date</StyledTh>
            <StyledTh>Time</StyledTh>
            <StyledTh>Actions</StyledTh>
          </StyledTr>
        </thead>
        <tbody>
        {filteredOrders.map(order => (
            <StyledTr key={order.Customer_ID}>
              <StyledThTd>{order.Customer_ID}</StyledThTd>
              <StyledThTd>{order.Name}</StyledThTd>
              <StyledThTd>{order.Email}</StyledThTd>
              <StyledThTd>{order.Contact_no}</StyledThTd>
              <StyledThTd>{order.Venue}</StyledThTd>
              <StyledThTd>{order.Menu}</StyledThTd>
              <StyledThTd>{order.Event}</StyledThTd>
              <StyledThTd>{order.Date}</StyledThTd>
              <StyledThTd>{order.Time}</StyledThTd>
              <StyledThTd>
                <Button onClick={() => handleDelete(order.Customer_ID)}>Delete</Button>
                <Button onClick={() => handleUpdate(order.Customer_ID)}>Update</Button>
              </StyledThTd>
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
      {showUpdateForm && (
        <div>
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-content">
            <UpdateForm
              customerId={selectedCustomerId}
              onUpdate={updateData}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;