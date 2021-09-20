<template>
  <div>
    <div v-if="loading">
      <slot name="loading">
        <Spinner />

      </slot>
      <slot name="loading-message">Loading outer space...</slot>
    </div>
    <slot name="error" v-else-if="error">{{error}}</slot>
    <slot name="loaded" v-else :data="data" />
  </div>
</template>

<script>
  import Spinner from '@/components/Spinner.vue';
  export default {
    data(){
      return {
        data: null,
        loading: false,
        error: null,
        isDebouncing: true
      }
    },
    components: {
      Spinner
    },
    created(){
      this.findData()
    },
    methods: {
      async findData(){
        try {
          // Using :endpoint="`${web}?recipe_name=${recipeName}`" prop from Pagination.vue, tries to load results from the database through Axios
          this.error = null;
          this.loading = true; //while true, the loading slot will be active
          let results = await this.axios.get(this.endpoint, {
            // in case there's headers needed, like for Django authentication
            // headers: {
            //   'Authorization': `token ${this.authToken}`
            // }
          });
          // Once results are in this.data, they're used by Pagination.vue as a slot in <template #loaded="{data}">
          this.data = results.data;
          console.log(this.data)
        } catch(e) {
          this.error = "This resource is not loading"
        }

        this.loading = false;
      }
    },
    props: {
      endpoint: {
        type: String,
        required: true
      },
      // authToken not needed at the moment
      authToken: {
        type: String,
        required: false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>