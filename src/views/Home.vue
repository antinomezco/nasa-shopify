<template>
  <div class="home">
    <Header />
    <Pagination />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Pagination from '@/components//Pagination.vue'
import Header from '@/components//Header.vue'
import Footer from '@/components//Footer.vue'

export default {
  name: 'Home',
  components: {
    Pagination,
    Header,
    Footer
  }
}
</script>

<style lang="sass" scoped>
.home
  background-color: #efefef
</style>