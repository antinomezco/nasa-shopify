<template>
  <div class="home">
    <Header />
    <Pagination />
  </div>
</template>

<script>
// @ is an alias to /src
import Pagination from '@/components//Pagination.vue'
import Header from '@/components//Header.vue'

export default {
  name: 'Home',
  components: {
    Pagination,
    Header,
  }
}
</script>

<style lang="sass" scoped>
</style>