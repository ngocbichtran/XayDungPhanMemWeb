import "./dashboard.css";

function Dashboard() {

  const stats = [
    { title: "Total Orders", value: 1240 },
    { title: "Revenue", value: "$18,450" },
    { title: "Products", value: 320 },
    { title: "Users", value: 890 }
  ];

  const orders = [
    { id: 1, customer: "Nguyen Tri Hao", total: "$120", status: "Paid" },
    { id: 2, customer: "Tran Ngoc Bich", total: "$75", status: "Pending" },
    { id: 3, customer: "Vo Thanh Tan", total: "$220", status: "Shipped" },
  ];

  return (
    <div className="dashboard">

      <h1>E-commerce Dashboard</h1>

      {/* STATS */}
      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

      {/* ORDERS TABLE */}
      <div className="orders">
        <h2>Recent Orders</h2>

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
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;