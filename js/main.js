import router from './routes.js'
import appHeader from './appHeader.cmp.js'
import eventBus from '../services/event-bus.service.js'


new Vue({
  el:'#app',
  created(){
    // console.log('I am the main of the app and I was created')
    // debugger
   
  },
  mounted() {
    eventBus.$on('usr-msg-display', msg => {
      this.msg = msg;
      console.log('I am in sis')
      setTimeout(this.closeMsg, 3000);
  })
  },
  template:`
  <div>
  <app-header></app-header>
  <router-view></router-view>
  </div>
  `,
  components:{
    appHeader,
  },
  methods:{
  },
  router
})