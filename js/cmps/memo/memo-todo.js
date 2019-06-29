import memoService from '../../../services/memo-service.js';
export default {
    props: ['memo'],
    name:'todo',
    template: `
    <div class="memo" :style="bgColor">
    <div class="title">{{memo.title}}
    <span class="pin" v-on:click="pinThisMemo">📌</span>
    </div>
    <div class="memo-details">
        <ul class="todo-list">
        <li v-for="todo in memo.todos" currTodo="todo" class="content-memo">
        <i class="fas fa-genderless"></i> {{todo.todo}}</li>
        </ul>
        <div>
        <span class="date">{{memo.createdAt}}</span>
        <div class="editors">
    <router-link :to="'/memos/todo-edit/'+memo.id"><i class="fas fa-pencil-alt"></i></router-link>
    <span @click="deleteMemo" class="delete">🗑️</span>

    </div>
        </div>
        </div>
    </div>
    
    `,
    created(){
        console.log('this memo', this.memo)
    },
    computed:{
        bgColor(){
            return {'background-color': this.memo.color}
        }
    },
    methods:{
        deleteMemo(){
            this.$emit('delete-memo',this.memo.id);
        },
        pinThisMemo(){
            console.log('i am pinthis',this.memo.id)
            this.$emit('pin-memo',this.memo.id);
        }
        
    }
}
