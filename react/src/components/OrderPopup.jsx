// import React, { useEffect, useState } from "react";
// import { axiosClient } from "../axios-client";
// import styles from "../css/OrderPopup.module.css";

// const OrderPopup = ({ orderId, onClose }) => {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axiosClient.get(`/orders/${orderId}`)
//       .then(({ data }) => {
//         setOrder(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Ошибка загрузки заказа:", err);
//         setLoading(false);
//       });
//   }, [orderId]);

//   if (loading) {
//     return <div className={styles.popup}><p>Загрузка...</p></div>;
//   }

//   return (
//     <div className={styles.overlay} onClick={onClose}>
//       <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
//         <button className={styles.closeButton} onClick={onClose}>✖</button>
//         <h2>Заказ #{order.id}</h2>
//         <p><strong>Клиент:</strong> {order.client_name}</p>
//         <p><strong>Телефон:</strong> {order.client_phone}</p>
//         <p><strong>Тариф:</strong> {order.tariff?.ration_name || "Не указан"}</p>
//         <p><strong>График:</strong> {order.schedule_type}</p>
//         <p><strong>Дата начала:</strong> {order.first_date}</p>
//         <p><strong>Дата окончания:</strong> {order.last_date}</p>
//         <p><strong>Комментарий:</strong> {order.comment || "Нет комментариев"}</p>

//         <h3>Рационы питания</h3>
//         <ul className={styles.rationsList}>
//           {order.rations.map((ration) => (
//             <li key={ration.id} className={styles.rationItem}>
//               🍽 Доставка: {ration.delivery_date} (Приготовлено: {ration.cooking_date})
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default OrderPopup;


import React from "react";
import styles from "../css/OrderPopup.module.css";

const OrderPopup = ({ order, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✖</button>
        <h2>Заказ #{order.id}</h2>
        <p><strong>Клиент:</strong> {order.client_name}</p>
        <p><strong>Телефон:</strong> {order.client_phone}</p>
        <p><strong>Тариф:</strong> {order.tariff?.ration_name || "Не указан"}</p>
        <p><strong>График:</strong> {order.schedule_type}</p>
        <p><strong>Дата начала:</strong> {order.first_date}</p>
        <p><strong>Дата окончания:</strong> {order.last_date}</p>
        <p><strong>Комментарий:</strong> {order.comment || "Нет комментариев"}</p>

        <h3>Рационы питания</h3>
        <ul className={styles.rationsList}>
          {order.rations.map((ration) => (
            <li key={ration.id} className={styles.rationItem}>
              🍽 Доставка: {ration.delivery_date} (Приготовлено: {ration.cooking_date})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderPopup;
