<template>
  <div>
    <div v-if="loading">
      <slot name="loading">
        <Spinner />

      </slot>
      <slot name="loading-message">Loading recipes...</slot>
    </div>
    <slot name="error" v-else-if="error">{{error}}</slot>
    <slot name="loaded" v-else :data="data" />
  </div>
</template>

<script>
  import _ from 'lodash'
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
      // Instead of updating the data string sent to the database each time the string changes, 
      // it waits X amount of time before starting a function.
      // https://lodash.com/docs/#debounce
      this.updateEndpoint = _.debounce(function(){
        this.findData();
      }, 300)
    },
    watch: {
      // Monitors the query which, with debounce, resets the timer in the function if there's an additional change during the alloted time.
      endpoint: function(){
        this.updateEndpoint();
      }
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