import memoService from '../../../services/memo-service.js';
import utilService from '../../../services/util.service.js';

// export default {
// }

export default {
    template: `
    <section class="memo-edit">
    <form @submit.prevent="saveMemo" class="edit-form">
        <div class="input-edit" :style="bgColor">
            <input class="input-title" type="text" v-model="memo.title"
            placeholder="Title" :style="bgColor">
            <textarea rows="5" cols="10" class="input-content" type="text" v-model="memo.content" 
            placeholder="Content" :style="bgColor"></textarea>
            <input class="new-img-input" type="text" v-model="memo.imgUrl" placeholder="Enter Image Url"/>
            </div>
            <div class="edit-btns">
            <input class="color-picker" type="color" v-model="memo.color"/>
            <button type="submit" class="add-btn"><i class="far fa-save"></i></button>
            <router-link exact to="/memos" class="cancel-rl">Cancel</router-link>
            </div>
        </form>
    </section>
    `,
    data() {
        return {
            memo: { title: '',type:'memoText', content: '', color:'lightgoldenrodyellow',imgUrl:''
            ,createdAt:utilService.getDate((new Date())) }
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
        }
    },
    computed:{
        bgColor(){
            return {'background-color': this.memo.color}
        }
    }
    
}