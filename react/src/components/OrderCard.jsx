// import React, { useState } from "react";
// import OrderPopup from "./OrderPopup";
// import styles from "../css/OrderCard.module.css";

// const OrderCard = ({ order }) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   return (
//     <>
//       <div className={styles.card} onClick={() => setIsPopupOpen(true)}>
//         <h3 className={styles.clientName}>{order.client_name}</h3>
//         <p className={styles.clientPhone}>📞 {order.client_phone}</p>
//         <p className={styles.tariff}>Тариф: {order.tariff?.ration_name || "Не указан"}</p>
//         <p className={styles.comment}>💬 {order.comment || "Без комментариев"}</p>
//       </div>
//       {isPopupOpen && <OrderPopup orderId={order.id} onClose={() => setIsPopupOpen(false)} />}
//     </>
//   );
// };

// export default OrderCard;


import React from "react";
import styles from "../css/OrderCard.module.css";

const OrderCard = ({ order, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3 className={styles.clientName}>{order.client_name}</h3>
      <p className={styles.clientPhone}>📞 {order.client_phone}</p>
      <p className={styles.tariff}>Тариф: {order.tariff?.ration_name || "Не указан"}</p>
    </div>
  );
};

export default OrderCard;
