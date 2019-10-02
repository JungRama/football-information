<template>
    <vs-card class="cardx" fixedHeight>
        <div slot="header">
            <img :src="data.crestUrl" alt="" height="50px">
            <h3 class="header-name">
                {{data.name}}
            </h3>
        </div>
        <div>
           <table>
                <tr>
                    <td>Address</td><td> : </td>
                    <td><b>{{data.address}}</b></td>
                </tr>
                <tr>
                    <td>Web</td><td> : </td>
                    <td><b><a :href="data.website" target="_blank" rel="noopener noreferrer">{{data.website}}</a></b></td>
                </tr>
                <tr>
                    <td>Venue</td><td> : </td>
                    <td><b>{{data.venue}}</b></td>
                </tr>
            </table>
        </div>
        <div slot="footer">
            <vs-row vs-justify="flex-end">
                <vs-button v-if="!fav" :class="{favorited : fav}" type="gradient" color="primary" icon="favorite" @click="addToFavorite"></vs-button>
                <vs-button v-if="fav" :class="{favorited : fav}" type="gradient" color="primary" icon="favorite" @click="removeFromFavorite"></vs-button>
            </vs-row>
        </div>
    </vs-card>
</template>

<style>
.header-name{
    display: inline-block;
    vertical-align:top;
    margin-top:10px;
    margin-left: 15px;
}
.vs-icon{
    margin-top: -2px !important;
}
tr td, tr td b{
    text-transform: uppercase;
}
.text-center{
    text-align: center;
}
.score span{
    background-color: #2268ff;
    padding: 5px 15px;
    border-radius: 5px;
    color: #fff;
    display: inline-block;
}
.favorited i{
    color: red;
}
</style>

<script>
import moment from 'moment'
import {HTTP} from '@/http-request';
export default {
    name: 'TeamCard',
    props: {
        data: Object,
        index: {
            type: Number
        }
    },
     data(){
        return{
            fav : false
        }
    },
    methods:{
        checkFavorite(){
            let itemFavorite = localStorage.getItem('TEAM_FAVORITE')
            // CHECK IF FAVORITE IS AVAILABLE
            itemFavorite = itemFavorite ? itemFavorite.split(',') : []
            // FIND ID ON itemFavorite
            let result = itemFavorite.includes(this.data.id.toString())

            return result
        },
        async addToFavorite(){
            let self = this
            const data = {
                type : "TEAM",
                favoriteID : self.data.id
            }

            await this.$store.dispatch('addFavorite', data)

            this.fav = this.checkFavorite()
        },
        async removeFromFavorite(){
            let item = await localStorage.getItem('TEAM_FAVORITE').split(',')
            await item.splice(item.findIndex(id => id==this.data.id), 1)

            localStorage.setItem('TEAM_FAVORITE', item.toString())

            this.fav = this.checkFavorite()

            // EMIT TO PARENT
            this.$emit('removed', this.index)
        }
    },
    mounted(){
        this.fav = this.checkFavorite()
    }
}
</script>
