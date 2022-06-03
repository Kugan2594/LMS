import SockJS from 'sockjs-client';
import {Stomp}  from '@stomp/stompjs';
import { SYSTEM_CONFIG } from 'src/util/StytemConfig';

export default function WebSocketClient(url){
    var sock=new SockJS(SYSTEM_CONFIG.webSocketUrl);
    let stompClient=Stomp.over(sock);
    sock.onopen=function (){};
    return new Promise((resolve,reject)=>{
       stompClient.connect({},(frame)=>{
           stompClient.subscribe(url,(data)=>{
               resolve(data);
               let dataH=JSON.parse(data.body);
               console.log("conneted",dataH);
           },);
       }) ;
       stompClient.activate()
    })
}