// settings.js
import React, { useState, useEffect } from 'react';
import './settings.css';

const Settings = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState({Product_ID:'', Food: '', Price: ''});

  useEffect(() => {
    // Fetch food items from the database when the component mounts
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await fetch('http://localhost:8081/Foods');
      const data = await response.json();
      setFoodItems(data);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  const handleFoodSelection = (food) => {
    setSelectedFood(food);
  };

  const handleSave = () => {
    fetch('http://localhost:8081/partyplatters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedFood),
    })
      .then((response) => response.json())
      .then(() => {
        fetchFoodItems();
        setSelectedFood({ Food: '', Price: '' });
      })
      .catch((error) => {
        console.error('Error saving food item:', error);
      });
  };

  const handleUpdate = () => {
    const { Product_ID, ...updatedValues } = selectedFood;
  
    fetch(`http://localhost:8081/Update_Customers/${Product_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Product_ID, ...updatedValues }), // Include Product_ID in the request body
    })
      .then((response) => response.json())
      .then(() => {
        // Handle the response or update UI as needed
        fetchFoodItems();
      })
      .catch((error) => {
        console.error('Error updating food item:', error);
      });
  };
  
  
  
  const handleDelete = () => {
    const { Product_ID } = selectedFood; // Corrected property name
  
    fetch(`http://localhost:8081/Delete_Customers/${Product_ID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error deleting food item: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        fetchFoodItems();
        setSelectedFood({ Food: '', Price: '', Product_ID: '' });
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="settings-container">
      <div className="food-price-container">
        <h3>PARTY PLATTERS</h3>

        <label>Product_ID</label>
        <input
          type="text"
          value={selectedFood.Product_ID}
          onChange={(e) => setSelectedFood({ ...selectedFood, Product_ID: e.target.value })}
        />

        <label>Food</label>
        <input
          type="text"
          value={selectedFood.Food}
          onChange={(e) => setSelectedFood({ ...selectedFood, Food: e.target.value })}
        />
        <label>Price</label>
        <input
          type="text"
          value={selectedFood.Price}
          onChange={(e) => setSelectedFood({ ...selectedFood, Price: e.target.value })}
        />
      </div>
      <div className="button-container">
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="update-button" onClick={handleUpdate}>Update</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>
      <div className="table-container">
        <h3>Food Items</h3>
        <table>
          <thead>
            <tr>
              <th>Product_ID</th>
              <th>Food</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map((foodItem) => (
              <tr key={foodItem.Customer_ID} onClick={() => handleFoodSelection(foodItem)}>
                <td>{foodItem.Product_ID}</td>
                <td>{foodItem.Food}</td>
                <td>{foodItem.Price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
