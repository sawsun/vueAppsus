import emailService from '../../../services/email-service.js';
import emailCompose from '../../cmps/email/emailCompose.js';
import emailSearch from '../../cmps/email/emailSearch.js';
import emailSort from '../../cmps/email/emailSort.js'
import sideBar from '../../cmps/email/sideBar.js';
import emailList from '../../cmps/email/emailList.js';
import emailStatus from '../../cmps/email/emailStatus.js';
import eventBus from '../../../services/event-bus.service.js';

export default {
    template: `
<section class="email-app">

   <section class="misterEmail-container">
   
    <div class="filter-container">
    <section class="email-header">
        <email-search @setSearch="setSearch"></email-search>
        <email-sort @setSort="sortEmails"></email-sort>
    </section>

    <div class="info-btns">
        <side-bar v-bind:emails="emails" 
            v-bind:all="all" v-bind:read="read" v-bind:unread="unread"
        @setFilter="setFilter">
        </side-bar>
        <email-compose></email-compose>
    </div>
    <email-list v-bind:emails="emails"></email-list>
    <email-status v-bind:status="readEmailsStatus"></email-status>
    </div>
    </section>
   
</section>
    `,

    data() {
        return {
            all:0,
            read:0,
            unread:0,
            searchTxt:'',
            emails: [],
            filter: null,
            selectedEmail: 0
        }
    },
    created() {
        eventBus.$emit('usr-msg-display',
        { txt: 'Your Email', type: 'success' });

        //ask emails from server and update the var email in data()
        emailService.emailQuery().then(
            emails => {
                this.emails = emails;
                console.log('emails from misterEmail', this.emails);
                this.getEmailsAll();
            }).catch(err => console.log('try clearing the localstorage & refresh the page', err));
           
    },
    methods: {
        setFilter(filter) {
            this.filter = filter;
            emailService.emailQuery(filter)
                .then(emails => this.emails = emails);
        },
        setSearch(searchTxt){
            emailService.emailQuery(this.filter)
                .then(emails => 
                    this.emails = emailService.emailSearchQuery(emails,searchTxt));
        },
        sortEmails(sortBy){
            if(sortBy === 'date'){
                console.log('To be sorted by date ',sortBy);
                console.log('this emails',this.emails);
                // this.emails
                 this.emails.sort((email1,email2)=>{
                    return +email2.sentAt - +email1.sentAt;
                });

            }else if(sortBy === 'subject'){
                console.log('To be sorted by subject ',sortBy);
                this.emails.sort((email1,email2)=>{
                    return (email1.subject > email2.subject) ? 1 : ((email2.subject > email1.subject) ? -1 : 0)

                });
            }
            
        }
    },
    computed: {
        getEmailsAll() {

            emailService.emailQuery().then(
                emails => {
                    this.all = emails.length
                    this.read = emails.reduce(
                        (acc, curreEmail) => acc + (+curreEmail.isRead), 0)

                    this.unread =  emails.reduce(
                        (acc, curreEmail) => acc + (+!curreEmail.isRead), 0)
                })
                
        },
        readEmailsStatus() {
            return parseInt(this.read/this.all * 100) + '%';
        },
    },
    components: {
        emailCompose,
        emailSearch,
        emailList,
        emailStatus,
        sideBar,
        emailSort
    }
}