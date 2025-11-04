import { Router } from 'express';
import db from './db.js'; // Import the database connection pool

const router = Router();

// ==========================================================
// USER ROUTES (Activities 4, 5, 6, 7)
// ==========================================================

// GET /api/users - Fetch all users
router.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/users/:id - Fetch user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/users - Create a new user
router.post('/users', async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;

    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)';
    const [result] = await db.query(sql, [first_name, last_name, email]);
    
    res.status(201).json({
      id: result.insertId,
      first_name,
      last_name,
      email
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/users/:id - Update an existing user
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email } = req.body;

    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?';
    const [result] = await db.query(sql, [first_name, last_name, email, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ id: Number(id), first_name, last_name, email });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/users/:id - Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: `User with ID ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// ==========================================================
// PRODUCT ROUTES (Activities 4, 5, 6, 7)
// ==========================================================

// GET /api/products - Fetch all products
router.get('/products', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/products/:id - Fetch product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/products - Create a new product
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, stock_quantity } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    
    const stock = stock_quantity || 0;

    const sql = 'INSERT INTO products (name, description, price, stock_quantity) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [name, description, price, stock]);

    res.status(201).json({
      id: result.insertId,
      name,
      description,
      price,
      stock_quantity: stock
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT /api/products/:id - Update an existing product
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock_quantity } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
    
    const stock = stock_quantity || 0;

    const sql = 'UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ? WHERE id = ?';
    const [result] = await db.query(sql, [name, description, price, stock, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ id: Number(id), name, description, price, stock_quantity: stock });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/products/:id - Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: `Product with ID ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;