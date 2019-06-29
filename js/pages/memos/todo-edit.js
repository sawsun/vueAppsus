'use strict';

import memoService from '../../../services/memo-service.js';
import utilService from '../../../services/util.service.js';


export default {
    template: `
    <section class="memo-edit">
    <form @submit.prevent="saveMemo" class="edit-form">
        <div class="input-edit" :style="bgColor">
            <input class="input-title" type="text" v-model="memo.title"
            placeholder="Title" :style="bgColor">
            <ul class="todos-container">
            <li v-for="(todo, idx) in memo.todos">
            <div class="btn-todo-container">
                <input class="input-content input-todo" type="text" v-model="todo.todo"
                placeholder="Enter todo" :style="bgColor"/> 
                <button @click.prevent="deleteTodo(idx)" class="todo-delete">✗</button>
                </div>
                  </li>
                  <form>
                <label>
                    <input type="text" class="add-input" v-model="newTodo" placeholder="Enter todo"/>
                </label>
                <button @click.prevent="addTodo" class="add-todo"><i class="fas fa-plus"></i></button>
            </form>
                </ul>
            </div>
            <div class="edit-btns">
            <input type="color" class="color-picker" v-model="memo.color"/>
            <button type="submit" class="add-btn"><i class="far fa-save"></i></button>
            <router-link exact to="/memos" class="cancel-rl">Cancel</router-link>
            </div>
        </form>
        
    </section>
    `,
    
    data() {
        return {
            newTodo: '',
            memo: { title: '', type:'memoTodo' , color: 'lightgoldenrodyellow', todos:[]
            ,createdAt:utilService.getDate((new Date()))}
        
        }
    },
    created() {
        const memoId = this.$route.params.memoId;
        console.log('memoId', memoId);
        console.log('this.$route.params', this.$route.params);
        if (memoId) {
            memoService.getMemoById(memoId)
                .then(memo => {
                    this.memo = memo
                })
        }
    },
    methods: {
        saveMemo() {
            console.log(this.memo);
            memoService.saveMemo(this.memo)
                .then(() => {
                    console.log('Saved!');
                    this.$router.push('/memos');
                })
        },
        addTodo() {
            this.memo.todos.push({ todo: this.newTodo, isDone: false });
        },
        deleteTodo(todoIdx) {
            this.memo.todos.splice(todoIdx, 1);
        },
    },
    computed:{
        bgColor(){
            return {'background-color': this.memo.color}
        }
    }
}