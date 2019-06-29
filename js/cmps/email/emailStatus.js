export default{
    props:['status'],
    template:`<section>
        <div class="status-bar">
    <div :style="{ width: status}" class="status-inner">{{status}}</div>
    </div>
</section>
    `
}