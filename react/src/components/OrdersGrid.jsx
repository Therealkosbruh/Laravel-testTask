// import React, { useEffect, useState } from 'react';
// import { axiosClient } from '../axios-client';
// import OrderCard from './OrderCard';
// import styles from '../css/OrdersGrid.module.css';

// const OrdersGrid = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axiosClient.get('/orders')
//       .then(({ data }) => setOrders(data))
//       .catch((err) => console.error('Ошибка загрузки заказов:', err));
//   }, []);

//   return (
//     <div className={styles.gridContainer}>
//       {orders.length > 0 ? (
//         orders.map((order) => <OrderCard key={order.id} order={order} />)
//       ) : (
//         <p className={styles.noOrders}>Заказов пока нет.</p>
//       )}
//     </div>
//   );
// };

// export default OrdersGrid;

import React, { useEffect, useState } from "react";
import { axiosClient } from "../axios-client";
import OrderCard from "./OrderCard";
import OrderPopup from "./OrderPopup";
import styles from "../css/OrdersGrid.module.css";

const OrdersGrid = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get("/orders")
      .then(({ data }) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки заказов:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка заказов...</p>;

  return (
    <div className={styles.grid}>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onClick={() => setSelectedOrder(order)} />
      ))}
      
      {selectedOrder && <OrderPopup order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
};

export default OrdersGrid;
