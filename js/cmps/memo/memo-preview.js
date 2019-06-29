import memoService from '../../../services/memo-service.js';
import memoEdit from '../../pages/memos/memo-edit.js';
import memoText from './memo-text.js';
import memoTodo from './memo-todo.js';



export default {
    props: ['memo'],
    template:` 

    `,
    
    data(){
    },
    created(){
        console.log('this memo', this.memo)
    },
    // computed:{
    //     bgColor(){
    //         return {'background-color': this.memo.color}
    //     }
    // },
    // methods:{
    //     deleteMemo(){
    //         console.log('deletin',this.memo.id);
    //         this.$emit('delete-memo',this.memo.id);
    //         // memoService.deleteMemo(this.memo.id).then(
    //         //     console.log('Item was deleted')            
    //         // )
    //     }
    // },
    components:{
        memoText,
        memoTodo,
        
    }
}