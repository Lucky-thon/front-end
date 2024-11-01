import React, { useState, useEffect } from 'react';
import NavigationBar from 'shared/ui/NavigationBar';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface NotificationProps {
  id: number;
  message: string;
  created_at: string;
  is_read: boolean;
  target_url: string;
}

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationProps[]>([]); // 알림 데이터 상태
  const [unreadCount, setUnreadCount] = useState<number>(0); // 읽지 않은 알림 개수

  // 알림 데이터를 서버에서 Fetch
  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('로그인 토큰이 없습니다. 다시 로그인해주세요.');
    }
    const response = await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/notification/list/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  };

  // 읽지 않은 알림 개수 확인
  const fetchUnreadCount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('로그인 토큰이 없습니다. 다시 로그인해주세요.');
    }
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER_URL}/notification/unread_check/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    return response.data.unread_count;
  };

  const { data, isLoading, isError } = useQuery('notifications', fetchNotifications, {
    refetchInterval: 60000, // 1분마다 자동으로 데이터 갱신
  });

  const { data: unreadData, refetch: refetchUnreadCount } = useQuery(
    'unreadCount',
    fetchUnreadCount,
    {
      refetchInterval: 60000, // 1분마다 자동으로 데이터 갱신
    },
  );

  useEffect(() => {
    if (data) {
      setNotifications(data);
      console.log('Notifications data:', data); // 상태 업데이트 시 데이터를 콘솔로 확인
    }
    if (unreadData !== undefined) {
      setUnreadCount(unreadData);
      console.log('Unread notifications count:', unreadData); // 읽지 않은 알림 개수 확인
    }
  }, [data, unreadData]);

  const handleNotificationClick = async (notificationId: number) => {
    // 클릭한 알림의 is_read를 true로 업데이트
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId ? { ...notification, is_read: true } : notification,
      ),
    );

    // 서버에 is_read 업데이트 요청
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('로그인 토큰이 없습니다. 다시 로그인해주세요.');
      }
      await axios.patch(
        `${process.env.REACT_APP_API_SERVER_URL}/notification/read/${notificationId}/`,
        { is_read: true },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      refetchUnreadCount(); // 읽지 않은 알림 개수 갱신
    } catch (error) {
      console.error('Failed to update notification status:', error);
    }

    const notification = notifications.find((notif) => notif.id === notificationId);
    if (notification) {
      navigate(notification.target_url, {
        state: { id: notificationId }, // 게시글 id 전달
      });
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>알림을 불러오는 데 실패했습니다...</div>;

  return (
    <div>
      <NavigationBar />
      <div className="flex justify-center m-4 sm:m-10">
        <div className="flex flex-col gap-3 bg-custom_teal-300 p-8 sm:p-10 h-auto w-auto min-h-[400px] max-h-[900px] min-w-[600px] max-w-[800px] rounded-lg shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            알림
            {unreadCount > 0 && (
              <span className="ml-2 text-red-500">({unreadCount}개의 읽지 않은 알림)</span>
            )}
          </h2>
          <ul className="w-full">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="bg-white p-4 my-2 rounded-lg shadow-md transition duration-200 flex items-center"
              >
                {!notification.is_read && (
                  <span className="w-3 h-3 bg-custom_teal-400 rounded-full mr-3"></span> // 읽지 않은 알림에 빨간 점 표시
                )}
                <div className="flex-1">
                  <p>
                    <strong>알림:</strong> {notification.message}
                  </p>
                </div>
                <button
                  onClick={() => handleNotificationClick(notification.id)}
                  className="text-blue-500 underline mt-2"
                >
                  자세히 보기
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notification;
