import React, { useEffect, useState } from 'react';
import { Bell, Package, ShoppingCart, Truck } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import './styles/app.css';

const stats = [
  { label: 'Orders', value: '42', icon: ShoppingCart },
  { label: 'Revenue', value: '12.5M', icon: Package },
  { label: 'Shipping', value: '8', icon: Truck },
  { label: 'Notifications', value: 'Realtime', icon: Bell },
];

function App() {
  const [message, setMessage] = useState('Waiting for order updates');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8087/ws/notifications');
    socket.onmessage = (event) => setMessage(event.data);
    return () => socket.close();
  }, []);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <h1>Ecommerce Ops</h1>
        <nav>
          <button>Dashboard</button>
          <button>Products</button>
          <button>Orders</button>
          <button>Users</button>
        </nav>
      </aside>
      <section className="workspace">
        <header>
          <div>
            <p className="eyebrow">Distributed ecommerce system</p>
            <h2>Order processing dashboard</h2>
          </div>
          <span className="status">{message}</span>
        </header>
        <div className="stats-grid">
          {stats.map(({ label, value, icon: Icon }) => (
            <article className="stat-card" key={label}>
              <Icon size={20} />
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
        <section className="flow">
          <h3>Order Flow</h3>
          <ol>
            <li>Order Service creates order</li>
            <li>Payment Service simulates payment</li>
            <li>Notification Service sends realtime update</li>
            <li>Delivery Service tracks shipping</li>
          </ol>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
