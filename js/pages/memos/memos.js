import memoService from '../../../services/memo-service.js';
import memoList from '../../cmps/memo/memo-list.js'
import memoFilter from '../../cmps/memo/memo-filter.js'


export default {
    template: `
    <section class="memo-container">
        <div class="memo-add">
        <router-link :to="'/memos/memo-edit'">lop<i class="fas fa-sticky-note"></i></router-link>
        <router-link :to="'/memos/todo-edit'">pol<i class="fas fa-tasks"></i></router-link>
        </div>
        <memo-filter @filtered="setFilter"></memo-filter>
        <memo-list v-bind:memos="memos"></memo-list>
    </section>
    `,
    data(){
        return{
            memos : []
        }
    },
    created(){
        memoService.memoQuery()
        .then(memos => this.memos = memos);
    },
    methods:{
        setFilter(filter){
            memoService.memoQuery(filter)
            .then(memos => this.memos = memos)
        }
    },
    components:{
        memoList,
        memoFilter,
    }
}

