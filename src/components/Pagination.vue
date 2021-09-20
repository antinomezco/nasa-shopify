<template>
  <div class="pagination-container">
    <!-- Sends recipeName string to the database through DataLoader to query for the total amount of items returned -->
    <DataLoader :endpoint="web">
      <template #loaded>
        <!-- The aforementioned props above are used to query the DataLoader :endpoint and obtain the data once again -->
        <DataLoader :endpoint="web">
          <!-- The loading-messages template would be temporarily active, before an error timeout or data being loaded -->
          <template #loading-message>
            <h3>Almost done!</h3>
          </template>
          <template #error>
            We could not find recipes containing
            <strong>{{ recipeName }}</strong>
          </template>
          <!-- Data requested from the database will be sent as a prop to VSCards as :items="data.results -->
          <template #loaded="{data}">
            <VSCards :items="data || []"> </VSCards>
          </template>
        </DataLoader>
      </template>
    </DataLoader>
  </div>
</template>

<script>
import VSCards from "@/components/VSCards.vue";
import DataLoader from "@/components/DataLoader.vue";

export default {
  components: {
    DataLoader,
    VSCards,
  },
  data() {
    return {
      recipeName: "",
      web:
        "https://api.nasa.gov/planetary/apod?api_key=ZZkxti2Qz4Wh2AGIJbSB9RoIzFIwLjBng9JRmVh1&start_date=2021-09-01&thumbs=true",
    };
  },
};
</script>

<style lang="sass" scoped>
.pagination-container
  padding-top: 1rem
</style>
