<template>
  <div class="pagination-container">
    <div class="input-container">
      <input v-model="recipeName" placeholder="Search titles, ingredients or categories"/>
    </div>
    <!-- Sends recipeName string to the database through DataLoader to query for the total amount of items returned -->
    <DataLoader
      :endpoint="`${web}?recipe_name=${recipeName}`"
      :authToken="authToken"
    >
      <template #loaded="{data}">
        <!-- Once the database information from the DataLoader template slot has been loaded, in theory, its total amount is sent as a prop to VSPagination -->
        <VSPagination :totalItems="data.count">
          <!-- From the data slot in VSPagination, the following props are obtained -->
          <template #data="{pageNumber, itemsPerPage}">
            <!-- The aforementioned props above are used to query the DataLoader :endpoint and obtain the data once again -->
            <DataLoader
              :endpoint="`${web}?page=${pageNumber}&size=${itemsPerPage}&recipe_name=${recipeName}`"
              :authToken="authToken"
            > 
              <!-- The loading-messages template would be temporarily active, before an error timeout or data being loaded -->
              <template #loading-message>
                <h3>Loading your recipes</h3>
              </template>
              <template #error>
                We could not find recipes containing
                <strong>{{ recipeName }}</strong>
              </template>
              <!-- Data requested from the database will be sent as a prop to VSCards as :items="data.results -->
              <template #loaded="{data}">
                <VSCards :items="data.results || []">
                </VSCards>
              </template>
            </DataLoader>
          </template>
        </VSPagination>
      </template>
    </DataLoader>
  </div>
</template>

<script>
import VSCards from "@/components/VSCards.vue";
import DataLoader from "@/components/DataLoader.vue";
import VSPagination from "@/components/VSPagination.vue";

export default {
  components: {
    DataLoader,
    VSPagination,
    VSCards,
  },
  data() {
    return {
      recipeName: this.$route.query.recipeName || "",
      authToken: "", // authToken is pending future usage with Django auth
      web: "https://cookingdb.herokuapp.com/filterrecipes"
      // web: "http://127.0.0.1:8000/filterrecipes"
    };
  },
  watch: {
    recipeName(newrecipeName) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          recipe_name: newrecipeName,
          pageNumber: 1,
        },
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.pagination-container
  padding-top: 1rem

.input-container
  max-width: 50%
  margin-left: auto
  margin-right: auto
  input
    border-radius: 5px
    border: 2px solid lightgray
    margin: 0 auto
    width: 80%
    padding: 1rem
    font-size: 1rem
    text-overflow: ellipsis
    overflow: hidden
  input:focus
    border: 2px solid red
    outline: 0

@media screen and (max-width: 1088px)
  .input-container
    max-width: 90%
</style>
