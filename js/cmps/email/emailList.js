import emailPreview from './emailPreview.js';

export default{
   props:['emails'] ,
   template:`
   <ul class="emails-container">
        <li class="subject" v-for="mail in emails" :class="{unread:!mail.isRead}">
        <email-preview :email="mail" @click.native="readMail(mail)" ></email-preview>
        <!-- <router-link :to="mailId(mail)"> 
          <email-preview :email="mail" ></email-preview>
        </router-link> -->

        </li>
   </ul>
`,
data(){
    return{
    
    }
},
   created(){
      console.log('emailList cmp was created',this.emails);
   },
   methods:{
    readMail(mail){
        console.log('mail.id:', mail.id);
        this.$router.push(`email/readMail/${mail.id}`);  
    },
//     mailId(mail){
//         return `/email/readMail/${mail.id}`;
//    }
   },
   computed: {
  
   },

   components:{
    emailPreview
}
}