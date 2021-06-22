<template>
  <div v-if="items">
    <div class="card-container">
      <div v-for="item in items" :key="item.id" class="card">
        <slot name="item" :item="item">
          <a>
            <!-- pseudo image component contains all the code for dynamically showing the information in the database (item in items) -->
            <div
              class="img"
              :style="`background-image: linear-gradient(0deg,rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%), url(${item.image};`"
              alt=""
            >
              <div class="p-container">
                <p>{{item.course.course_name}}</p>
              </div>
              <div class="title-container">
                <h5 class="title">
                  {{ item.recipe_name }}
                </h5>
              </div>
            </div>
          </a>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
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
  &:hover .card // When hovering in the .card-container area, all cards go grayscale
    opacity: .7
    cursor: pointer
    filter: grayscale(1)
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
      transform: scale(1.025)
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
    font: 1.9rem 'Inter', serif
    color: white
    text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000
    padding: 0
    margin: 0 auto 10px
    text-align: left
    letter-spacing: -.075rem
    align-items: flex-end

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
    background-color: #FF6347
</style>
