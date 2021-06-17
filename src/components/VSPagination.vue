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
    <div class="pagination-row">
      <span v-for="perPageOption in [5, 10, 25, 50]" :key="perPageOption">
        <button
          :class="['per-page-button', perPageOption == perPage ? 'active' : '']"
          @click="changePerPage(perPageOption)"
        >
          {{ perPageOption }}
        </button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNumber: Number(this.$route.query.pageNumber) || 1,
      perPage: this.$route.query.perPage || 10,
    };
  },
  computed: {
    numberPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
    paginatedItems() {
      let end = this.perPage * this.pageNumber;
      return this.items.slice(end - this.perPage, end);
    },
  },
  methods: {
    changePageNumber(newPageNumber) {
      this.pageNumber = newPageNumber;
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          pageNumber: newPageNumber,
        },
      });
    },
    changePerPage(newPerPage) {
      this.perPage = newPerPage;

      let newNumberPages = Math.ceil(this.totalItems / newPerPage);
      if (newNumberPages <= this.pageNumber) {
        this.pageNumber = newNumberPages;
      }

      this.$router.push({
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
.pagination-button, .per-page-button
  padding: 8px
  margin: 2px
  // border-radius: 3px
  font-size: 1.5em
  cursor: pointer
  color: #f08080

  &.active
    // background-color: #ccc
    cursor: auto
    color: darkred
    font-weight: 600
    // text-decoration: underline

  &:disabled
    cursor: auto
    color: gray

.pagination-row
  padding: 10px 0

button
  padding: 0
  border: none
  background: none
</style>
