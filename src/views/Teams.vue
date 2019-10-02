<template>
    <section>
        <h2 class="text-center mb-50">UEFA CHAMPIONS LEAGUE TEAMS</h2>

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
            <vs-col :key="index" v-for="(team, index) in teams" vs-type="flex" vs-justify="center" vs-align="center"
                vs-lg="4"
                vs-xs="12">
                <TeamCard :data="team"></TeamCard>
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
import TeamCard from '@/components/TeamCard'
import {HTTP} from '@/http-request';
export default {
    data(){
        return{
            teams: [],
            loading: true,
        }
    },
    components:{
        TeamCard
    },
    methods:{
        getData(){
            this.loading = true
            let self = this
            HTTP.get(`competitions/CL/teams`)
            .then(response => {
                self.teams = response.data.teams
                self.loading = false
                console.log(response.data.teams);
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
