<template>
  <div v-if="items">
    <div class="card-container">
      <div v-for="item in items" :key="item.id" class="card">
        <slot name="item" :item="item">
          <a>
            <div
              class="img"
              :style="`background-image: linear-gradient(0deg,rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%), url(${item.image};`"
              src="https://via.placeholder.com/350x175/0000FF/808080"
              alt=""
            >
              <div class="p-container">
                <p class="recipeMeal">{{item.course.course_name}}</p>
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
body
  background: #F0F0F0
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
.card-container
  padding: 10px
  display: flex
  flex-flow: row wrap
  justify-content: center
  // align-content: flex-start
  
  // margin-left: auto
  // margin-right: auto

.card-container:hover .card
  opacity: .7
  cursor: pointer
  filter: grayscale(1)
.card-container .card
  flex: 1 1 350px
  margin: 10px
  // min-width: 300px 
  max-width: 450px
  // min-height: 175px
  height: 225px
  border-radius: 3px
  // width: calc(100% / 5 - 20px)
  box-shadow: 0 0 2px 2px rgba(0,0,0,.05)
  background: #FFF
  -webkit-transition: .3s all ease
  transition: .15s all ease
.card-container .card:hover
  box-shadow: 0 0 8px 3px rgba(0,0,0,.15)
  transform: scale(1.025)
  opacity: 1
  filter: grayscale(0)
  transition: .35s all ease
a .img
  width: auto
  height: 100%
  padding: 0
  margin: 0
  border-radius: 3px
  // padding-top: 32%
  background-position: center center
  background-repeat: no-repeat
  background-size: cover
.card-container .card h5
  width: 95%
  font: 1.9rem 'Inter', serif
  color: white
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000
  padding: 0
  margin: 0 auto 10px
  text-align: left
  letter-spacing: -.075rem
  align-items: flex-end


.card-container .card .p-container
  display: inline-block
  display: flex
  justify-content: flex-end
  padding-right: .5rem

.title-container
  height: 85%
  display: flex
  align-items: flex-end

.p-container p
  margin-top: .5rem
  padding: 0 .5rem
  font-size: 75%
  font-weight: 500
  line-height: 1.5
  white-space: nowrap
  vertical-align: baseline
  border-radius: .25rem
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out

.recipeMeal
  width: auto
  margin: 0
  text-align: right
  background-color: white
  color: black
</style>
