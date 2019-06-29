import emailService from '../../../services/email-service.js'

export default{
    props:['email'],
    template:`
    <div class="sub-preview-container">
    <span><span @click.stop="toggle(email)">::</span>
     <i class="fas fa-envelope"
     :class="{'fa-envelope-open' : email.isRead }"></i>{{this.email.subject}}</span> 
    <span class="at">{{this.email.date}}</span>
    </div>
    `,
    data(){
        return{
            // email:{}
        }
    },
    methods:{
        //to do make it toggle between mail status , read/unread
        // toggle(email){
        //     emailService.getEmailbyId(email.id).then(email=>{
        //         emailService.saveEmailData(this.email.id);
        //     })
        // }
    },
    computed:{

    }
}