const express = require ('express');
const mysql = require ('mysql');
const cors = require('cors');



const app = express()
app.use(cors())
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'ordersystem'
})


app.get('/', (re, res) => {
    return res.json("Sample");
})


/*
app.get('/Foods', (req, res) => {
  const sql = "SELECT * from partyplatters";
  db.query(sql, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
})


app.get('/Customers', (req, res) => {
  const sql = "SELECT * from customers_order";
  db.query(sql, (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
})
*/

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    // Query to check login credentials
    const query = 'SELECT position FROM accounts WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) {
        console.error('MySQL Query Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (results.length > 0) {
          res.json({ success: true, message: 'Login successful' });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    });
  });

  app.get('/api/menu', (req, res) => {
    const query = 'SELECT Food, Price FROM partyplatters';
    db.query(query, (err, results) => {
      if (err) {
        console.error('MySQL Query Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });


  app.post('/Guest_Reservation', (req, res) => {
    const {
        name,
        email,
        contact,
        roomType,
        date,
        reservationTime,
    } = req.body;

    const query =
        'INSERT INTO customers_order (`Name`, `Email`, `Contact_no`, `Room_type`, `Date`, `Time`) VALUES (?,?,?,?,?,?)';

    const values = [name, email, contact, roomType, date, reservationTime];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('MySQL Query Error:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});


app.post('/partyplatters', (req, res) => {
  const {
      Food,
      Price,
  } = req.body;

  const query =
  'INSERT INTO `partyplatters`(`Food`, `Price`) VALUES (?,?)';
  const values = [Food, Price];

  db.query(query, values, (err, results) => {
      if (err) {
          console.error('MySQL Query Error:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          res.json(results);
      }
  });
});
  

app.delete('/Delete_Customers/:foodId', (req, res) => {
  const foodId = req.params.foodId;

  const query = 'DELETE FROM customers_order WHERE Customer_ID = ?';

  db.query(query, [foodId], (err, results) => {
      if (err) {
          console.error('MySQL Query Error:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          if (results.affectedRows === 0) {
              res.status(404).json({ error: 'Record not found' });
          } else {
              res.json({ success: true, message: 'Record deleted successfully' });
          }
      }
  });
});

app.delete('/DeleteFood', (req, res) => {
  const foodId = req.params.foodId;

  // Implement MySQL query to delete a record by ID
  const query = 'DELETE FROM `partyplatters` WHERE Food = ?';

  db.query(query, [foodId], (err, results) => {
    if (err) {
      console.error('MySQL Query Error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.affectedRows === 0) {
        // No record was deleted (ID not found)
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json({ success: true, message: 'Record deleted successfully' });
      }
    }
  });
});

app.put('/Update_Customers/:foodId', (req, res) => {
  const foodId = req.params.foodId;
  const { Product_ID, Food, Price } = req.body;

  if (!Product_ID || !Food || !Price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query =
  'UPDATE `partyplatters` SET Food=?, Price=? WHERE Product_ID=?';

db.query(query, [Food, Price, foodId], (err, results) => {
  if (err) {
    console.error('MySQL Query Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.json({ success: true, message: 'Record updated successfully' });
    }
  }
});
});



app.put('/Update_Customers/:foodId', (req, res) => {
  const foodId = req.params.foodId;
  const { Product_ID, Food, Price } = req.body;

  if (!Product_ID || !Food || !Price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query =
  'UPDATE `partyplatters` SET Food=?, Price=? WHERE Product_ID=?';

db.query(query, [Food, Price, foodId], (err, results) => {
  if (err) {
    console.error('MySQL Query Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.json({ success: true, message: 'Record updated successfully' });
    }
  }
});
});



app.put('/Update_Customers/:foodId', (req, res) => {
  const foodId = req.params.foodId;
  const { Product_ID, Food, Price } = req.body;

  if (!Product_ID || !Food || !Price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query =
  'UPDATE `customers_order` SET `Name`= ?,`Email`= ?,`Contact_no`= ?,`Venue`= ?,`Menu`= ?,`Event`= ?, Date= ? , Time= ? WHERE Customer_ID = ?';

db.query(query, [Food, Price, foodId], (err, results) => {
  if (err) {
    console.error('MySQL Query Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Record not found' });
    } else {
      res.json({ success: true, message: 'Record updated successfully' });
    }
  }
});
});




app.listen(8081, () => {
    console.log('Server is running on port 3001')
})