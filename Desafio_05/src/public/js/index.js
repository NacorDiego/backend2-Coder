const socket = io();

const getProducts = async () => {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Error al obtener productos.');
    }

    const data = await response.json();

    const productList = document.getElementById('products-list');
    productList.innerHTML = '';
    data.message.forEach(product => {
      productList.innerHTML += `<li>${product.title}</li>`;
    });
  } catch (err) {
    console.error(err.message);
  }
};

getProducts();

socket.on('productsUpdated', () => {
  getProducts();
});
