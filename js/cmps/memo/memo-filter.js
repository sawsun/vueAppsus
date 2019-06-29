
export default {
    template: `
    <div class="filter">

    <input @input="filterMemo" placeholder="🔍 Search"
     v-model="filter.byTitle" type="text"
     class="search">

    <select v-model="filter.byType" @change="filterMemo" 
    class="search search-select select-memo">
            <option value="">All</option>
            <option>Text</option>
            <option>Todo</option>
    </select>

    </div>
    `,
    data() {
        return {
            filter: {
                byTitle: '',
                byType: ''
            }
        }
    },
    methods: {
        filterMemo() {
            this.$emit('filtered', {...this.filter})
        }
    }
}