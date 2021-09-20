<template>
  <div class="home">
    <Header />
    <CardContainer />
  </div>
</template>

<script>
// @ is an alias to /src
import CardContainer from '@/components//CardContainer.vue'
import Header from '@/components//Header.vue'

export default {
  name: 'Home',
  components: {
    CardContainer,
    Header,
  }
}
</script>

<style lang="sass" scoped>
.home
  flex: 1 0  
</style>