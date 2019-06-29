
export default {
    props: ['memo'],
    template: `
    <div class="memo" :style="bgColor">
    <div class="memo-title title">{{memo.title}}
    <span class="pin" v-on:click="pinThisMemo">📌</span>
    </div>
<div class="memo-details">
    <div v-if="memo.content" class="content-memo">{{memo.content}}</div>
    <div>
    <div v-if="memo.imgUrl" class="content-memo">
    <img :src="memo.imgUrl" class="content-img"/>
    </div>
    <div>
    <span class="date">{{memo.createdAt}}</span>
    <div class="editors">
    <router-link :to="'/memos/memo-edit/'+memo.id"><i class="fas fa-pencil-alt"></i></router-link>
    <span @click="deleteMemo" class="delete">🗑️</span>
    </div>
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
            console.log('deletin',this.memo.id);
            this.$emit('delete-memo',this.memo.id);
            // memoService.deleteMemo(this.memo.id).then(
            //     console.log('Item was deleted')            
            // )
        },
        pinThisMemo(){
            console.log('i am pinthis',this.memo.id)
            this.$emit('pin-memo',this.memo.id);
        }
    }
}
