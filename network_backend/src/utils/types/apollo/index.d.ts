import WebSocket from 'ws';
import { JwtUser } from '../../interfaces/interfaces';
declare class MyWebSocket extends WebSocket {
  user?: JwtUser;
}
