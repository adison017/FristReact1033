const API_URL = 'http://localhost:8080/api'; // URL ของ API

// ฟังก์ชันดึงรายการสินค้าทั้งหมด
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/Products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Error fetching Products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
};

// ฟังก์ชันดึงข้อมูลสินค้าตาม ID
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/Products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Error fetching product');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
};

// ฟังก์ชันเพิ่มสินค้าใหม่
export const addProduct = async (product) => {
  try {
    const response = await fetch(`${API_URL}/Products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    if (!response.ok) {
      throw new Error('Error adding product');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
};

// ฟังก์ชันแก้ไขข้อมูลสินค้าตาม ID
export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${API_URL}/Products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    if (!response.ok) {
      throw new Error('Error updating product');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
};
export const getOrderStatus = async () => {
  const response = await fetch(`${API_URL}/orders/status`);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

// ฟังก์ชันลบสินค้าตาม ID
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/Products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Error deleting product');
    }
    return 'Product deleted';
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
};
// ApiService.js
export const getAccountInfo = async () => {
  const response = await fetch(`${API_URL}/account`);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

export const updateAccountInfo = async (accountData) => {
  const response = await fetch(`${API_URL}/account`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(accountData),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

