import React, { useState } from 'react';
import NavigationBar from 'shared/ui/NavigationBar';

interface NotificationProps {
  id: number;
  content: string;
}

// 샘플 알림 데이터
const notification_sample: NotificationProps[] = [
  { id: 1, content: ' 새로운 미션이 도착했습니다!' },
  { id: 2, content: ' 친구가 댓글을 남겼습니다!' },
  { id: 3, content: ' 오늘의 미션이 완료되었습니다!' },
  { id: 4, content: ' 친구 요청을 수락했습니다!' },
  { id: 5, content: ' 점수가 업데이트되었습니다!' },
];

const Notification = () => {
  const [notifications] = useState(notification_sample); // 알림 데이터 상태

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
                <p><strong>알림 {notification.id}:</strong> {notification.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notification;
