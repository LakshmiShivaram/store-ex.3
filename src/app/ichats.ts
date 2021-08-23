import { Isender } from './Isender';
export interface Ichats {
  id: number;
  content: string;
  read: string;
  date: Date;
  sender: Isender;
  // name: string;
  // profileImage: string;
  message: string; //sender messages
}
