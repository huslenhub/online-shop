import React, { useState } from 'react';
import './MyPage.css';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('userInfo'); // 'userInfo' 또는 'orderInfo' 상태 관리
  const [userInfo, setUserInfo] = useState({
    email: 'user@example.com',
    name: 'John Doe',
    address: '1234 Elm Street',
    phone: '123-456-7890',
  });
  const [orderInfo, setOrderInfo] = useState([
    { id: 1, status: 'Pending Payment', date: '2024-11-01' },
    { id: 2, status: 'Payment Completed', date: '2024-10-20' },
    { id: 3, status: 'Order Received', date: '2024-10-15' },
    { id: 4, status: 'Shipping', date: '2024-10-10' },
  ]);
  const [editableUserInfo, setEditableUserInfo] = useState({ ...userInfo });
  const [selectedOrder, setSelectedOrder] = useState(null); // 선택된 주문 정보 저장
  const [showButtons, setShowButtons] = useState(false); // 버튼 표시 상태 관리

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowButtons(false); // 다른 탭 클릭 시 버튼 숨김
  };

  const handleEditChange = (e) => {
    setEditableUserInfo({
      ...editableUserInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = () => {
    setUserInfo({ ...editableUserInfo });
  };

  const handleOrderClick = (orderId) => {
    // 주문 클릭 시 버튼 토글
    setSelectedOrder(orderId);
    setShowButtons(!showButtons); // 클릭 시 버튼 표시 상태 토글
  };

  const handleCancelOrder = () => {
    // 주문 취소 처리 로직
    alert('주문 취소 처리');
    setShowButtons(false);
  };

  const handleRefundOrder = () => {
    // 환불 처리 로직
    alert('환불 처리');
    setShowButtons(false);
  };

  return (
    <div className="my-page-container">
      <div className="sidebar">
        <button onClick={() => handleTabClick('userInfo')}>내 정보</button>
        <button onClick={() => handleTabClick('orderInfo')}>주문 정보</button>
      </div>
      <div className="content">
        {/* 내 정보 섹션 */}
        {activeTab === 'userInfo' && (
          <div className="user-info">
            <h2>내 정보</h2>
            <div className="user-details">
              <label>
                이메일:
                <input
                  type="email"
                  name="email"
                  value={editableUserInfo.email}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                이름:
                <input
                  type="text"
                  name="name"
                  value={editableUserInfo.name}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                주소:
                <input
                  type="text"
                  name="address"
                  value={editableUserInfo.address}
                  onChange={handleEditChange}
                />
              </label>
              <label>
                전화번호:
                <input
                  type="text"
                  name="phone"
                  value={editableUserInfo.phone}
                  onChange={handleEditChange}
                />
              </label>
              <button onClick={handleSaveChanges}>저장</button>
            </div>
          </div>
        )}

        {/* 주문 정보 섹션 */}
        {activeTab === 'orderInfo' && (
          <div className="order-info">
            <h2>주문 정보</h2>
            <ul>
              {orderInfo.map((order) => (
                <li
                  key={order.id}
                  onClick={() => handleOrderClick(order.id)} // 주문 클릭 시 해당 주문의 정보 표시
                  className={selectedOrder === order.id ? 'active-order' : ''}
                >
                  <div>
                    <strong>주문 번호:</strong> {order.id}
                  </div>
                  <div>
                    <strong>주문 상태:</strong> {order.status}
                  </div>
                  {/* 선택된 주문일 경우, 주문 번호 옆에 상세 정보를 표시 */}
                  {selectedOrder === order.id && (
                    <div className="order-details">
                      <div><strong>주문 상태:</strong> {order.status}</div>
                      <div><strong>주문 날짜:</strong> {order.date}</div>
                    </div>
                  )}
                  {/* 주문 번호를 클릭했을 때 버튼을 표시 */}
                  {selectedOrder === order.id && showButtons && (
                    <div className="order-actions">
                      <button onClick={handleCancelOrder}>주문 취소</button>
                      <button onClick={handleRefundOrder}>환불</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
