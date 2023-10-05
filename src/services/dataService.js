export async function getUser() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const cbid = JSON.parse(sessionStorage.getItem("cbid"));

  const requestData = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }
  const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${cbid}`, requestData);
  if(!response.ok) {
    throw{message: response.statusText, status: response.status} //eslint-disable-line
  }
  const data = await response.json();
  return data;
}

export async function getUserOrders() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const cbid = JSON.parse(sessionStorage.getItem("cbid"));
  
  const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${cbid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  if(!response.ok) {
    throw{message: response.statusText, status: response.status} //eslint-disable-line
  }
  const data = await response.json();
  return data;
}

export async function createOrder(cartList, total, userInfo) {
  const token = JSON.parse(sessionStorage.getItem("token"));

  const order = {
    cartList: cartList,
    amount_paid: total,
    quantity: cartList.length,
    user: {
      name: userInfo.name,
      email: userInfo.email,
      id: userInfo.id
    }
  };
  const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(order)
  });
  if(!response.ok) {
    throw{message: response.statusText, status: response.status} //eslint-disable-line
  }
  const data = await response.json();
  return data;
}