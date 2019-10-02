<template>
    <div class="con-type-example">
        <vs-navbar class="nabarx">
            <div slot="title">
                <vs-navbar-title>
                   Football
                </vs-navbar-title>
            </div>

            <vs-navbar-item 
                v-for="(menu, index) in menus" 
                :key="index">
                <router-link :to="{name : menu.routerName}">{{menu.name}}</router-link>
            </vs-navbar-item>

        </vs-navbar>
    </div>
</template>

<style scoped>
.vs-navbar{
    padding: 20px;
}
.vs-navbar .router-link-active{
    color: #fff !important;
    background: #2268ff;
    border-radius: 5px;
}
</style>

<script>
export default{
    data(){
        return{
            menus: [
                {
                    name: 'Matches',
                    routerName : 'matches'
                },
                {
                    name: 'Teams',
                    routerName : 'teams'
                },
                {
                    name: 'Favorite',
                    routerName : 'favorite'
                }
            ]
        }
    }
}
</script>