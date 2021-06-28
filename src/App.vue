<template>
  <Spinner v-if="$auth.isLoading" />
  <div v-else id="app">
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components//Footer.vue'
import Spinner from '@/components//Spinner.vue'
export default {
  components: {
    Spinner,
    Footer
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex; 
  flex-direction: column; 
  height: 100%; 
}

html,body{
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #efeeee;
  // overflow-x: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
