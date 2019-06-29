import userMsg from './cmps/user-msg.js'


export default{
    name: 'appHeader',
    template: `<header class="top-header">
                <user-msg></user-msg>
                <router-link exact to="/">
                    <h1 class="welcome"> 
                        <img class="logo" src="img/logo1.png">
                        <span class="main-title">Appsus</span>
                    </h1>
                </router-link>
                <div class="links">
                    <router-link exact to="/">Home</router-link> | 
                    <router-link to="/email">Email</router-link> |
                    <router-link to="/memos">Memos</router-link>
               </div>
              </header>
            `,
    components:{
        userMsg
    },
}