<template>
    <section>
        <h2 class="text-center mb-50">Favorite</h2>
        <div>
            <vs-tabs :color="colorx">
                <vs-tab @click="colorx = 'success'" label="Favorite Matches">
                    <div class="con-tab-ejemplo">
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
                        
                        <!-- <vs-row v-if="!loading"> -->
                            <transition-group class="vs-row" appear v-if="!loading"
                                enter-active-class="animated fadeIn"
                                leave-active-class="animated fadeOutLeft">
                                <vs-col :key="index" v-for="(match, index) in favoriteMatches" vs-type="flex" vs-justify="center" vs-align="center"
                                    vs-lg="4"
                                    vs-xs="12">
                                    <MatchCard :data="match" :index="index" @removed="removeMatch($event)"></MatchCard>
                                </vs-col>
                            </transition-group>
                            
                        <!-- </vs-row> -->
                    </div>
                </vs-tab>
                <vs-tab @click="colorx = 'warning'" label="Favorite Teams">
                    <div class="con-tab-ejemplo">
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
                        <!-- <vs-row v-if="!loading"> -->
                            <transition-group class="vs-row" appear v-if="!loading"
                                enter-active-class="animated fadeIn"
                                leave-active-class="animated fadeOutLeft">
                                <vs-col :key="index" v-for="(team, index) in favoriteTeams" vs-type="flex" vs-justify="center" vs-align="center"
                                    vs-lg="4"
                                    vs-xs="12">
                                    <TeamCard :data="team" :index="index" @removed="removeTeam($event)"></TeamCard>
                                </vs-col>
                            </transition-group>
                        <!-- </vs-row> -->
                    </div>
                </vs-tab>
            </vs-tabs>
        </div>
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
import TeamCard from '@/components/TeamCard'
import {HTTP} from '@/http-request';
export default {
    data(){
        return{
            loading: true,
            colorx: 'success',
            favoriteMatches: [],
            favoriteTeams: [],
            matchday: 1
        }
    },
    components:{
        MatchCard,
        TeamCard
    },
    methods:{
        async getDataTeam(){
            let self = this

            let itemFavorite = localStorage.getItem('TEAM_FAVORITE')
            itemFavorite = itemFavorite ? itemFavorite.split(',') : []

            let allTeam

            await HTTP.get(`competitions/CL/teams`)
            .then(response => {
                allTeam = response.data.teams
                self.loading = false
            })
            .catch(error => {
                console.log(error);
            })

            allTeam.forEach(item => {
                itemFavorite.forEach(favorite => {
                    if(item.id == favorite){
                        self.favoriteTeams.push(item)
                    }
                });
            });
        },
        removeTeam($event){
            this.favoriteTeams.splice($event , 1)
        },
        async getDataMatch(){
            let self = this

            let itemFavorite = localStorage.getItem('MATCH_FAVORITE')
            itemFavorite = itemFavorite ? itemFavorite.split(',') : []

            let allMatch

            await HTTP.get(`competitions/CL/matches`)
            .then(response => {
                allMatch = response.data.matches
                self.loading = false
            })
            .catch(error => {
                console.log(error);
            })

            allMatch.forEach(item => {
                itemFavorite.forEach(favorite => {
                    if(item.id == favorite){
                        self.favoriteMatches.push(item)
                    }
                });
            });
        },
        removeMatch($event){
            this.favoriteMatches.splice($event , 1)
        },

    },
    created(){
        this.getDataMatch()
        this.getDataTeam()
    }
}
</script>
