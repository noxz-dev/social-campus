import WebSocket from 'ws';
import { JwtUser } from '../../interfaces/jwtUser.interface';
declare class MyWebSocket extends WebSocket {
  user?: JwtUser;
}
