import emailService from '../../../services/email-service.js';
import utilService from '../../../services/util.service.js';

export default {
    template:`
<div class="email-view">
        <div class="sender"><span>From: </span>{{email.from}}</div>
        <div class="sub-date">
        <div class="subject-read"><span>Subject: </span>{{email.subject}}</div>
        <div class="at">{{email.date}}</div>
    </div>
        <div class="content">
        {{email.body}}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ab. Labore placeat et 
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, sapiente excepturi ab, nam aliquam, a officiis incidunt optio vel suscipit error molestias tenetur ea id laboriosam! Cum tempore voluptate iusto!
            laboriosam officiis quisquam perspiciatis eaque nesciunt voluptatum! Veniam iusto reiciendis amet exercitationem? Est, odio omnis? Vero, consequuntur?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed est voluptatibus doloribus ducimus cupiditate tempora, ipsam doloremque ullam, similique rerum deleniti, cumque odio labore porro temporibus adipisci laborum laudantium! Nesciunt?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam laborum, inventore maiores porro, voluptates assumenda voluptatem delectus ut quidem saepe consequuntur esse necessitatibus incidunt quis aut veritatis amet quisquam blanditiis?
        </div>
        <div class="btns">
        <router-link exact to="/email"><button class="back-btn"><i class="fas fa-arrow-circle-left"></i></button></router-link>
        <button class="delete-btn" @click="deleteMail"><i class="fas fa-trash-alt"></i></button>
    </div>
    </div>
    `,
    data(){
        return{
            email:{}
        }
    },
    computed: {
    },
    methods:{ 
        goback(){
            console.log('I am going back');
            this.$router.push('/email');
            
        },
        deleteMail(){
        console.log('I am about to delete');
        emailService.deleteEmail(this.email.id).then(res=>{
            console.log('I was deleted');
        });
        this.$router.push('/email');
    }
    },
    mounted: {
    },
    created(){
        const emailID = this.$route.params.emailID;
        
        console.log('this.$route.params', this.$route.params);
        if (emailID) {
            // console.log('emailID', emailID);
            emailService.getEmailbyId(emailID).then(email=>{
                this.email = email;
                this.email.isRead = true;
                emailService.saveEmailData(this.email.id);
            })
        }},
    }
