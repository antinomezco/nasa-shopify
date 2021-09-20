<template>
  <div v-if="items">
    <div class="card-container">
      <article v-for="item in items" :key="item.id" class="card">
        <slot name="item" :item="item">
          <!-- pseudo image component contains all the code for dynamically showing the information in the database (item in items) -->
          <div
            class="img"
            :style="item.thumbnail_url ? 
              `background-image: linear-gradient(0deg,rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%), url(${item.thumbnail_url};`
              :`background-image: linear-gradient(0deg,rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%), url(${item.url};`
              "
            alt=""
          >
            <div class="heart" @click="faveData(item.url)">
              <div v-if="!faveItems.includes(item.url)"><unfilled-heart-icon title="Not Liked!" fillColor="red"/></div>
              <div v-else><heart-icon title="Liked!" fillColor="red"/></div>
            </div>
            <div class="p-container">
              <p>{{ item.date }}</p>
            </div>
            <div class="title-container">
              <h5 class="title">
                {{ item.title }}
              </h5>
            </div>
          </div>
        </slot>
      </article>
    </div>
  </div>
</template>

<script>
import UnfilledHeartIcon from "vue-material-design-icons/HeartOutline.vue";
import HeartIcon from "vue-material-design-icons/Heart.vue";

export default {
  data() {
    return {
      faveItems: []
    };
  },
  components: {
    UnfilledHeartIcon,
    HeartIcon
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  watch: {
    faveItems() {
      localStorage.setItem('faveItems', JSON.stringify(this.faveItems));
    }
  },
  mounted() {
    if (localStorage.faveItems) {
      this.faveItems = JSON.parse(localStorage.getItem('faveItems'))
    }
  },
  methods: {
    faveData(url) {
      if (this.faveItems.includes(url)) {
        this.faveItems.splice(this.faveItems.indexOf(url), 1);
      } else {
        this.faveItems.push(url);
      }
    }
  },
};
</script>

<style lang="sass" scoped>
// Card container layout

.card-container
  padding: 10px
  display: flex
  flex-flow: row wrap
  justify-content: center
  a
    text-decoration: none
  &:hover .card // When hovering in the .card-container area, all cards go somewhat grayscale
    opacity: .9
    filter: grayscale(.01)
  .card  //Width and amount of stretching the card can do when responsive
    flex: 1 1 350px
    margin: 10px
    max-width: 450px
    height: 225px
    border-radius: 3px
    box-shadow: 0 0 2px 2px rgba(0,0,0,.05)
    background: #FFF
    -webkit-transition: .3s all ease
    transition: .15s all ease
    &:hover // When hovering in a .card area, that one card has their grayscale removed
      box-shadow: 0 0 8px 3px rgba(0,0,0,.15)
      transform: scale(1.075)
      opacity: 1
      filter: grayscale(0)
      transition: .35s all ease

// Card image
.img
  width: auto
  height: 100%
  padding: 0
  margin: 0
  border-radius: 3px
  background-position: center center
  background-repeat: no-repeat
  background-size: cover

//Card text
.title-container
  height: 85%
  display: flex
  align-items: flex-end
  .title
    width: 95%
    font: 1.5rem 'Inter', serif
    color: white
    text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000
    padding: 0
    margin: 0 auto 10px
    text-align: left
    letter-spacing: -.075rem
    align-items: flex-end

.heart
  float: left
  padding: .5rem 0 0 .5rem
  cursor: pointer

.p-container
  display: inline-block
  display: flex
  justify-content: flex-end
  padding-right: .5rem
  p
    margin-top: .5rem
    padding: 0 .5rem
    font-size: 75%
    line-height: 1.5
    border-radius: .25rem
    background-color: white
</style>
