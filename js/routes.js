import home from './pages/home.js'
import email from './pages/email/misterEmail.js'
import newEmail from './pages/email/newEmail.js'
import readMail from './pages/email/readMail.js'
import memo from './pages/memos/memos.js'
import memoEdit from './pages/memos/memo-edit.js';
import todoEdit from './pages/memos/todo-edit.js';

const routes = [
  { path: '/', component: home },
  // {path: '/about', component: about},
  { path: '/email', component: email },
  { path: '/email/newEmail', component:newEmail },
  { path: '/email/readMail/:emailID?', component: readMail },
  { path: '/memos', component: memo },
  { path: '/memos/memo-edit/:memoId?', component: memoEdit },
  { path: '/memos/todo-edit/:memoId?', component: todoEdit },
];

Vue.use(VueRouter);
var myRouter = new VueRouter({ routes })

export default myRouter;