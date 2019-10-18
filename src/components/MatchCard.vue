<template>
    <vs-card class="cardx" fixedHeight>
        <div slot="header">
            <h3>
                {{data.stage.replace(/_/g, " ")}}
            </h3>
        </div>
        <div>
            <vs-row vs-justify="center">
                <vs-col vs-w="6">
                    <h3 class="text-center">{{longText(data.homeTeam.name)}}</h3>
                    <div class="score text-center">
                        <span>{{formatScore(data.score.fullTime.homeTeam)}}</span>
                    </div>
                </vs-col>
                <vs-col vs-w="6">
                    <h3 class="text-center">{{longText(data.awayTeam.name)}}</h3>
                    <div class="score text-center">
                        <span>{{formatScore(data.score.fullTime.awayTeam)}}</span>
                    </div>
                </vs-col>
            </vs-row>
            <table>
                <tr>
                    <td>Date</td><td> : </td>
                    <td><b>{{date}}</b></td>
                </tr>
                <tr>
                    <td>Time</td><td> : </td>
                    <td><b>{{time}}</b></td>
                </tr>
                <tr>
                    <td>Status</td><td> : </td>
                    <td><b>{{data.status}}</b></td>
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
    name: 'MatchCard',
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
    computed:{
        date(){
            let t = new Date(this.data.utcDate)
            return moment(t).format("dddd, DD MMMM YYYY")
        },
        time(){
            let t = new Date(this.data.utcDate)
            return moment(t).format("HH:mm A")
        },
    },
    methods:{
        formatScore(score){
            return score == null ? 0 : score
        },
        longText(text){
            return text.length>20?text.substring(0, 20) + '...' : text
        },
        checkFavorite(){
            let itemFavorite = localStorage.getItem('MATCH_FAVORITE')
            // CHECK IF FAVORITE IS AVAILABLE
            itemFavorite = itemFavorite ? itemFavorite.split(',') : []
            // FIND ID ON itemFavorite
            let result = itemFavorite.includes(this.data.id.toString())

            return result
        },
        async addToFavorite(){
            let self = this
            const data = {
                type : 'Match',
                favoriteID : self.data.id
            }

            await this.$store.dispatch('addFavorite', data)

            this.fav = this.checkFavorite()
        },
        async removeFromFavorite(){
            let item = await localStorage.getItem('MATCH_FAVORITE').split(',')
            await item.splice(item.findIndex(id => id==this.data.id), 1)

            localStorage.setItem('MATCH_FAVORITE', item.toString())

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
