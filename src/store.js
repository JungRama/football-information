import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favoriteMatch: [],
    favoriteTeam: []
  },
  getters: {
  },
  mutations: {
    ADD_FAVORITE: async(state, payload)=>{
      if(payload.type=='MATCH'){
        // GET ITEM FROM LOCAL STORAGE
        state.favoriteMatch = localStorage.getItem('MATCH_FAVORITE')
        // CHECK IF FAVORITE IS AVAILABLE
        state.favoriteMatch = state.favoriteMatch ? state.favoriteMatch.split(',') : []
        // PUSH TO STATE
        await state.favoriteMatch.push(payload.favoriteID)
        // SET TO LOCAL STORAGE
        localStorage.setItem('MATCH_FAVORITE', state.favoriteMatch.toString())
      }else{
        // GET ITEM FROM LOCAL STORAGE
        state.favoriteTeam = localStorage.getItem('TEAM_FAVORITE')
        // CHECK IF FAVORITE IS AVAILABLE
        state.favoriteTeam = state.favoriteTeam ? state.favoriteTeam.split(',') : []
        // PUSH TO STATE
        await state.favoriteTeam.push(payload.favoriteID)
        // SET TO LOCAL STORAGE
        localStorage.setItem('TEAM_FAVORITE', state.favoriteTeam.toString())
      }
    },
  },
  actions: {
    addFavorite: ({commit}, payload) =>{
      commit('ADD_FAVORITE', payload)
    },
  }
})
