import React, { useState, useEffect } from 'react';
import NavigationBar from 'shared/ui/NavigationBar';
import { useQuery } from 'react-query';
import axios from 'axios';

interface NotificationProps {
  id: number;
  content: string;
}

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]); // 알림 데이터 상태

  // 알림 데이터를 서버에서 Fetch
  const fetchNotifications = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('로그인 토큰이 없습니다. 다시 로그인해주세요.');
    }
    const response = await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/notifications/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  };

  const { data, isLoading, isError, refetch } = useQuery('notifications', fetchNotifications, {
    refetchInterval: 60000, // 1분마다 자동으로 데이터 갱신
  });

  useEffect(() => {
    if (data) {
      setNotifications(data);
    }
  }, [data]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>알림을 불러오는 데 실패했습니다...</div>;

  return (
    <div>
      <NavigationBar />
      <div className="flex justify-center m-4 sm:m-10">
        <div className="flex flex-col gap-3 bg-custom_teal-300 p-8 sm:p-10 h-auto w-auto min-h-[400px] max-h-[900px] min-w-[600px] max-w-[800px] rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">알림</h2>
          <ul className="w-full">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="bg-white p-4 my-2 rounded-lg shadow-md transition duration-200"
              >
                <p>
                  <strong>알림 {notification.id}:</strong> {notification.content}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notification;
