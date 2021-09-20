<template>
  <body class="card-container">
    <!-- Sends query request to DataLoader for API info-->
    <DataLoader :endpoint="web">
      <template #loading-message>
        <h3>LOADING SPACE!</h3>
      </template>
      <template #error>
        We could not find outer space, where could it be?
      </template>
      <!-- Data requested from the database will be sent as a prop to VSCards as :items="data.results -->
      <template #loaded="{data}">
        <VSCards :items="data || []"> </VSCards>
      </template>
    </DataLoader>
  </body>
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
      web:
        "https://api.nasa.gov/planetary/apod?api_key=ZZkxti2Qz4Wh2AGIJbSB9RoIzFIwLjBng9JRmVh1&start_date=2021-09-01&thumbs=true",
    };
  },
};
</script>

<style lang="sass" scoped>
.card-container
  padding-top: 1rem
</style>
