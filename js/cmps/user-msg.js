import eventBus from '../../services/event-bus.service.js';

export default {
    template: `
        <section v-if="msg" class="user-msg" v-bind:class="msg.type">
            <button @click="closeMsg">X</button>
            <h1>{{msg.txt}}</h1>
        </section>
    `,
    data(){
        return {
           msg: null
        }
    },
    created() {
        console.log('I am in siso')
        eventBus.$on('usr-msg-display', msg => {
            this.msg = msg;
            console.log('I am in sis')
            setTimeout(this.closeMsg, 1000);
        })
        
    },
    methods:{
        closeMsg(){
            this.msg = null;
        }
    }
}