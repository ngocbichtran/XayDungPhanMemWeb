import { useEffect, useState } from "react";
import "./dashboard.css";

function Dashboard() {

  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setTimeout(() => {

      setStats([
        { title: "Total Orders", value: 1240 },
        { title: "Revenue", value: "$18,450" },
        { title: "Products", value: 320 },
        { title: "Users", value: 890 }
      ]);

      setOrders([
        { id: 1, customer: "Nguyen Tri Hao", total: "$120", status: "Paid" },
        { id: 2, customer: "Tran Ngoc Bich", total: "$75", status: "Pending" }
      ]);

      setLoading(false);

    }, 1500);

  }, []);

  return (
    <div className="dashboard">

      <h1>E-commerce Dashboard</h1>


      <div className="stats-grid">

        {loading ? (
          [...Array(4)].map((_, i) => (
            <div className="stat-card skeleton" key={i}></div>
          ))
        ) : (

          stats.map((item, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-top">
                <span className="stat-icon">{item.icon}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.value}</p>
            </div>
          ))

        )}

      </div>

      <div className="orders">

        <h2>Recent Orders</h2>

        {loading ? (

          <div className="loading">Loading...</div>

        ) : orders.length === 0 ? (

          <div className="empty">
            No orders yet
          </div>

        ) : (

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.total}</td>
                  <td>
                    <span className={`status ${o.status.toLowerCase()}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        )}

      </div>

    </div>
  );
}

export default Dashboard;