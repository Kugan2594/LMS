import { useEffect, useRef, useState } from 'react';
import { getUserDetails } from 'src/contents/login/LoginAuthentication';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { SYSTEM_CONFIG } from 'src/util/StytemConfig';
import {
  getAllNotification,
} from 'src/contents/Master/Notification/NotificationService';
import moment from 'moment';
import { countBy, filter } from 'lodash';
interface Position {
  vertical?: 'bottom' | 'top';
  horizontal?: 'right' | 'left' | 'center';
  open?: boolean;
}
let notificationCount = 0;
export default function HeaderNotifications() {
  const [isWebSocket, setIsWebSocket] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [possion, setPossion] = useState<Position>({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    getNotifications(getUserDetails().user_id);
    WebSocketClient(`/user/${getUserDetails().user_id}/queue/message`);
  }, []);

  const convertName = (name) => {
    let nameArray = name.split(' ');

    if (name === 'a few seconds ago') {
      return 'a sec ago';
    } else {
      if (nameArray[1] === 'minutes') {
        return `${nameArray[0]} min ago`;
      } else {
        return name;
      }
    }
  };
  const getNotifications = (noti) => {
    getAllNotification(noti).then((res: any) => {
      let respones = res.result.notification;
      let cou = [];
      let convertdata = respones.map((post, index) => {
        return {
          id: post.id,
          name: post.type,
          meassage: post.message,
          time: convertName(
            moment(post.createdAt, 'YYYY-MM-DD HH:mm:ss').fromNow()
          ),
          read: post.view,
          date: moment(post.createdAt).format('YYYY-MM-DD')
        };
      });

   
      let newNotifications = filter(convertdata, (res) => res.read);
      setNotifications(convertdata);

      if (status) {
       
        setOpen(false);
      }
    });
  };
  const WebSocketClient = (url) => {
    var sock = new SockJS(SYSTEM_CONFIG.webSocketUrl);
    let stompClient = Stomp.over(sock);
    sock.onopen = function () {};
    stompClient.connect({}, (frame) => {
      stompClient.subscribe(url, (data) => {
        let dataH = JSON.parse(data.body);

        setIsWebSocket(true);
        setPossion({
          open: true,
          vertical: 'top',
          horizontal: 'center'
        });
        let convertdata = dataH.map((post, index) => {
          return {
            id: post.id,
            name: post.type,
            meassage: post.message,
            time: convertName(
              moment(post.createdAt, 'YYYY-MM-DD HH:mm:ss').fromNow()
            ),
            read: post.view,
            date: moment(post.createdAt).format('YYYY-MM-DD')
          };
        });
  
        let newNotifications = filter(convertdata, (res) => !res.read);
        setNotifications(newNotifications);
        setCount(newNotifications.length);

        notificationCount = newNotifications.length;
      });

      stompClient.subscribe(  `/user/${getUserDetails().user_id}/queue/leaverequest`, (data) => {
        let dataH = JSON.parse(data.body);

        setIsWebSocket(true);
        setPossion({
          open: true,
          vertical: 'top',
          horizontal: 'center'
        });
        let convertdata = dataH.map((post, index) => {
          return {
            id: post.id,
            name: post.type,
            meassage: post.message,
            time: convertName(
              moment(post.createdAt, 'YYYY-MM-DD HH:mm:ss').fromNow()
            ),
            read: post.view,
            date: moment(post.createdAt).format('YYYY-MM-DD')
          };
        });
  
        let newNotifications = filter(convertdata, (res) => !res.read);
        setNotifications(newNotifications);
        setCount(newNotifications.length);

        notificationCount = newNotifications.length;
      });

      stompClient.subscribe(`/user/${getUserDetails().user_id}/queue/leaverequest`, (data) => {
        let dataH = JSON.parse(data.body);

        setIsWebSocket(true);
        setPossion({
          open: true,
          vertical: 'top',
          horizontal: 'center'
        });
        let convertdata = dataH.map((post, index) => {
          return {
            id: post.id,
            name: post.type,
            meassage: post.message,
            time: convertName(
              moment(post.createdAt, 'YYYY-MM-DD HH:mm:ss').fromNow()
            ),
            read: post.view,
            date: moment(post.createdAt).format('YYYY-MM-DD')
          };
        });
  
        let newNotifications = filter(convertdata, (res) => !res.read);
        setNotifications(newNotifications);
        setCount(newNotifications.length);

        notificationCount = newNotifications.length;
      });

      stompClient.subscribe(`/user/${getUserDetails().user_id}/queue/statusChange`, (data) => {
        let dataH = JSON.parse(data.body);

        setIsWebSocket(true);
        setPossion({
          open: true,
          vertical: 'top',
          horizontal: 'center'
        });
        let convertdata = dataH.map((post, index) => {
          return {
            id: post.id,
            name: post.type,
            meassage: post.message,
            time: convertName(
              moment(post.createdAt, 'YYYY-MM-DD HH:mm:ss').fromNow()
            ),
            read: post.view,
            date: moment(post.createdAt).format('YYYY-MM-DD')
          };
        });
  
        let newNotifications = filter(convertdata, (res) => !res.read);
        setNotifications(newNotifications);
        setCount(newNotifications.length);

        notificationCount = newNotifications.length;
      });
    });
    stompClient.activate();
  };



  return <div>Notification</div>;
}
