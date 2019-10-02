<template>
    <section>
        <h2 class="text-center mb-50">UEFA CHAMPIONS LEAGUE</h2>

        <vs-row v-if="loading">
            <vs-col :key="index" v-for="(item, index) in 6" vs-type="flex" vs-justify="center" vs-align="center" 
                vs-lg="4"
                vs-xs="12">
                <vs-card class="cardx" fixedHeight>
                    <content-placeholders>
                        <content-placeholders-heading :img="true" />
                        <content-placeholders-text :lines="3" />
                    </content-placeholders>
                </vs-card>
            </vs-col>
        </vs-row>

        <vs-row v-if="!loading">
            <vs-col :key="index" v-for="(match, index) in matches" vs-type="flex" vs-justify="center" vs-align="center"
                vs-lg="4"
                vs-xs="12">
                <MatchCard :data="match"></MatchCard>
            </vs-col>
        </vs-row>
    </section>
</template>

<style>
.form-select{
    padding: 8px 10px;
    width: 200px;
}
</style>

<script>
import MatchCard from '@/components/MatchCard'
import {HTTP} from '@/http-request';
export default {
    data(){
        return{
            matches: [],
            loading: true,
        }
    },
    components:{
        MatchCard
    },
    methods:{
        getData(){
            console.log('test')
            this.loading = true
            let self = this
            HTTP.get(`competitions/CL/matches`)
            .then(response => {
                self.matches = response.data.matches
                self.loading = false
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    created(){
        this.getData()
    }
}
</script>
