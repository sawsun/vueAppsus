import memoPreview from './memo-preview.js';
import memoService from '../../../services/memo-service.js';
import memoTodo from './memo-todo.js';
import memoText from './memo-text.js';

export default {
    props: ['memos'],
    // name:'memo-list',
    template: `
    <section class="memos-list" >
    <component  v-for="(memo,index) in memos" 
        :is="memo.type" 
        :memo="memo" :key="memo.id" 
        class="memo memo-preview"  
        v-on:delete-memo="deleteMemo"
        v-on:pin-memo="pinMemo" >
        </component>
    </section>

    `,
    
    data() {
        return {
            // theMemos: this.memos,
            
        }
    },
    created(){
     console.log('list was created with notes',this.memos);
    },

    computed: {
       
    },
    methods:{
        deleteMemo(memoID){
            console.log('I am in list memo memoID');
            memoService.deleteMemo(memoID).then(res =>{
                console.log('I was deleted',this.memos)
                memoService.memoQuery().then(memos => this.memos = memos);
            }
            )
        },
        pinMemo(memoID){
            console.log('I am in pin list memo memoID');
            memoService.pinMemo(memoID).then(res =>{
                console.log('I was pinned',this.memos)
                memoService.memoQuery().then(memos => this.memos = memos);
            }
            )
        }

    },
    components: {
        memoPreview,
        memoTodo,
        memoText
        
    }
}