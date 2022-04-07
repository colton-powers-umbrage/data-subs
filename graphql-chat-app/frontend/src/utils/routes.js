import Home from '../components/pages/Home';
import Chats from '../components/pages/Chats';

const routes = [
    {
      //you don't have a / route, so the opening page is blank. Consider changing this to /
      path: '/home',
      component: Home,
    },
    {
      path: '/chats',
      component: Chats,
    },
]

export default routes;
