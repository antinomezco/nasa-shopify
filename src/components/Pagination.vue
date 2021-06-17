<template>
  <div class="pagination-container">
    <!-- <h1>Pagination</h1> -->
    <div class="input-container">
      <input v-model="recipeName" placeholder="Search titles, ingredients or categories"/>
    </div>
    <DataLoader
      :endpoint="`${web}?recipe_name=${recipeName}`"
      :authToken="authToken"
    >
      <template #loaded="{data}">
        <VSPagination :totalItems="data.count">
          <template #data="{pageNumber, itemsPerPage}">
            <DataLoader
              :endpoint="`${web}?page=${pageNumber}&size=${itemsPerPage}&recipe_name=${recipeName}`"
              :authToken="authToken"
            >
              <template #loading-message>
                <h3>Loading your recipes</h3>
              </template>
              <template #error>
                We could not find recipes containing
                <strong>{{ recipeName }}</strong>
              </template>
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
      projects: [],
      authToken: "",
      web: "http://cookingdb.herokuapp.com/filterrecipes"
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
  width: 40%
  margin-left: auto
  margin-right: auto
  input
    border-radius: 5px
    border: 2px solid lightgray
    margin: 0 auto
    width: 95%
    padding: 1rem
  // input:active
  //   border: 2px solid red
</style>
