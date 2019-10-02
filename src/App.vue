<template>
  <div>
    <Navbar/>
    <div class="content-web">
        <router-view></router-view>
    </div>
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  *{
    font-family: 'Roboto', sans-serif;
    line-height: 25px;
  }
  .content-web{
    padding: 0px 30px;
    padding-top: 80px;
  }
  @media screen and (max-width: 426px) {
    .content-web{
      padding: 0px 10px;
      padding-top: 80px;
    }    
  }
  .vs-col{
    padding: 15px;
  }
  .mb-50{
    margin-bottom: 50px;
  }
</style>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data(){
    return{

    }
  }
};
</script>
