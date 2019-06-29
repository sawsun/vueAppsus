export default{
    template:`<section class="search-container">
    <input class="inputSearch" v-model="str"  
    @input="filterMail" type="text" placeholder="🔍 
    Search" name="search">
  </section>`
  ,
  data(){
    return {
      str:''
    }
  },
  methods:{
    filterMail(){
      this.$emit('setSearch',this.str);
    }
  }
}