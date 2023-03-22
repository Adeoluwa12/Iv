const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: "*"
}))


// Test data
const products = [
  {
    id: '1',
    name: 'Black Shoe',
    price: 6.99,
    description: 'Here is a shoe of high italian quality, it is made of strong leather and is very resistant to wear.<br>Makes the best choice for anyone who wishes to get quality and comfort in one pack',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsw88jUBWtiu3CHo9VbrQtMifT0elAT_7o8QIK9dXbX8nBc6YWncTrJRus-fR98YFIiew&usqp=CAU',
  },
  {
    id: '2',
    name: 'Hand Bag',
    price: 6.99,
    description: 'This is a bag of great use, serves it purpose realy well, it is also very luxurious and has great fashion quality',
    image: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/41abW-keC6L._SX395_SY395_QL70_ML2_.jpg',
  },
  {
    id: '3',
    name: 'Samsung Phone',
    price: 10.77,
    description: 'This is a modern mobile device with a lot of interesting and smart features that makes it a great pick for whoever desires to have an interesting experience with mobile devivces. ',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFt4H0AsCxV39XVspMNyQee5UZzv9UtlqX0zbJm9dJWq1pAn2clkoECGoDfTEuQgmuGp8&usqp=CAU',
  },
];

let cart = [
    
        { productId: 'AER397', quantity: 2 },
        { productId: 'JHM380', quantity: 1 },
        { productId: 'XBV154', quantity: 3 }
 ];

// endpoint for all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// endpoint to get current cart
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// endpoint to add a product to cart
app.post('/api/cart/:productId', (req, res) => {
  const productId = req.params.productId;
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  const cartItem = cart.find((item) => item.productId === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }

  res.json(cart);
});

// endpoint to remove a product from cart
app.delete('/api/cart/:productId', (req, res) => {
  const productId = req.params.productId;
  const index = cart.findIndex((item) => item.productId === productId);

  if (index === -1) {
    return res.status(404).send('Product not found in cart');
  }

  cart.splice(index, 1);

  res.json(cart);
});

    


// Setting up the the server
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});












