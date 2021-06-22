<template>
  <div>
    <slot
      name="data"
      :pageNumber="pageNumber"
      :itemsPerPage="perPage"
      :paginatedItems="paginatedItems"
    />
    <div class="pagination-row" v-show="numberPages > 1">
      <button
        class="pagination-button"
        :disabled="pageNumber <= 1"
        @click="changePageNumber(pageNumber - 1)"
      >
        &lt;
      </button>
      <span v-for="(item, index) in new Array(numberPages)" :key="index">
        <button
          :class="[
            'pagination-button',
            pageNumber == index + 1 ? 'active' : '',
          ]"
          @click="changePageNumber(index + 1)"
        >
          {{ index + 1 }}
        </button>
      </span>
      <button
        class="pagination-button"
        :disabled="pageNumber >= numberPages"
        @click="changePageNumber(pageNumber + 1)"
      >
        &gt;
      </button>
    </div>
    <!-- For setting the amount of items per page, disabled for aesthetic purposes -->
    <!-- <div class="pagination-row">
      <span v-for="perPageOption in [8, 16, 24]" :key="perPageOption">
        <button
          :class="['per-page-button', perPageOption == perPage ? 'active' : '']"
          @click="changePerPage(perPageOption)"
        >
          {{ perPageOption }}
        </button>
      </span>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNumber: Number(this.$route.query.pageNumber) || 1,
      perPage: this.$route.query.perPage || 16,
    };
  },
  computed: {
    numberPages() {
      // Uses the this.TotalItems prop from Pagination.vue divided between the selected amount of items per page, hardcoded to 16
      return Math.ceil(this.totalItems / this.perPage);
    },
    paginatedItems() {
      // calculates the items to show in a particular page, as an example for page 2:
      // let end = 16 * 2, so end = 32
      // return this.items.slice(32 - 16, 32), so this.items.slice(16, 32)
      let end = this.perPage * this.pageNumber;
      return this.items.slice(end - this.perPage, end);
    },
  },
  methods: {
    // When using this function, the number used, newPageNumber, would be either +1, -1 or a specific numbered page
    changePageNumber(newPageNumber) {
      this.pageNumber = newPageNumber;
      // Pushes a new current path, with the rest of the queries, 
      // using ...this.$route.query, but replacing the pageNumber value with newPageNumber
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          pageNumber: newPageNumber,
        },
      });
    },
    // When using this function, the number used, newPerPage, would be either 8, 16, 24 or whichever number
    changePerPage(newPerPage) {
      this.perPage = newPerPage;
      // as an example, if the amount is
      // let newNumberPages = Math.ceil(100 / 24), newNumberPages with Math.ceil would be 5
      let newNumberPages = Math.ceil(this.totalItems / newPerPage);
      // if the newNumberPages, 5, is equal or lower than the current this.pageNumber, let's say 8
      // then the value of this.pageNumber will now be 5, as to prevent having a page number with no items
      if (newNumberPages <= this.pageNumber) {
        this.pageNumber = newNumberPages;
      }

      this.$router.push({
        // Pushes a new current path, with the rest of the queries, 
        // using ...this.$route.query, but replacing the pageNumber value with newPageNumber and perPage with newPerPage
        path: this.$route.path,
        query: {
          ...this.$route.query,
          perPage: newPerPage,
          pageNumber: this.pageNumber,
        },
      });
    },
  },
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style lang="sass" scoped>

button //to keep the functionality of button, but without any button visuals
  padding: 0
  border: none
  background: none

.pagination-row
  padding: 10px 0
  .pagination-button, .per-page-button
    padding: 8px
    margin: 2px
    font-size: 1.5em
    cursor: pointer
    color: #f08080
    &.active
      cursor: auto
      color: darkred
      font-weight: 600
    &:disabled
      cursor: auto
      color: gray
</style>
