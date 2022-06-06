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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    getNotifications(page,rowsPerPage);
    WebSocketClient(`/user/${getUserDetails().user_name}/queue/message`);
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
  const getNotifications = (page, rowsPerPage) => {
    getAllNotification(page, rowsPerPage).then((res: any) => {
      let respones = res.results.NotificationByUserEmail;
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
            shortmsg: post.shortmsg,
            detailsmsg: post.detailsmsg,
          };
        });
        
      setNotifications(convertdata);
      });
      

      stompClient.subscribe( `/user/${getUserDetails().user_name}/queue/lieurequest`, (data) => {
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
            shortmsg: post.shortmsg,
            detailsmsg: post.detailsmsg,
          };
        });
        
      setNotifications(convertdata);
      });
      stompClient.subscribe(`/user/${getUserDetails().user_name}/queue/statusChange`, (data) => {
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
          };
        });
  
        setNotifications(convertdata);
      });
    });
    stompClient.activate();
  };



  return <div>Notification</div>;
}
