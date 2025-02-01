
import React from "react";
import { Link } from "react-router-dom";
import { CreateOrder } from "../components/CreateOrder";

export default function Makeorder() {
  return (
    <div style={{ position: "relative", padding: "20px" }}>
   <Link
        to="/orderlist"
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          textDecoration: "none",
          background: "#007bff",
          color: "white",
          padding: "8px 12px",
          borderRadius: "5px",
          zIndex: 1000, 
        }}
      >
        Список заказов
      </Link>
      <CreateOrder />
    </div>
  );
}
