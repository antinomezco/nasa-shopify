<template>
  <div class="home">
    <div class="recipe-hero">
      <div class="bg-back"></div>
      <div
        class="bg"
        style="background-image: url('https://www.foodserviceandhospitality.com/wp-content/uploads/2014/08/placeholder-003.jpg'); width: 100%; height: 500px;"
      >
        <div class="ui">
          <div class="header">
            <ul v-if="!Loggedin">
              <li>
                Log in
              </li>
            </ul>
            <ul v-else v-for="link in links" :key="link.name"></ul>
          </div>
          <div class="main-hero">
            <p class="title">
              La calavería
            </p>
            <p class="desc">
              This page was inspired by theSkullery, a simple recupe website I'm
              very much a fan of.
            </p>
            <div>
              <a href="" class="login" v-if="!Loggein">
                Login
              </a>
              <a href="" class="login" v-else>
                Submit Recipe
              </a>
              <a href="" class="random">
                Random
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [{ name: "Favorites" }, { name: "About" }, { name: "Tags" }],
    };
  },
};
</script>

<style lang="sass">

.main-hero
  display: flex
  flex-direction: column
  text-align: left
  padding-left: 2rem

.ui
  display: inline-block
  width: 100%

.header
  text-align: right
  padding: 0 1rem

.bg
  background-repeat: no-repeat
  background-attachment: center
  background-position: center
  background-size: cover
  top: 0
  left: 0
  width: 100%
  height: 100%
  mix-blend-mode: multiply
  // filter: grayscale(100%)
  z-index: -1

.title
  font-weight: 100
  font-size: 2.25rem
  // max-width: 25rem
  line-height: 1.2
  width: 100%
  margin-top: 0
  margin-bottom: 1rem
  outline: 0
  box-sizing: border-box

.title, .desc
  color: white
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000

.login
  padding: .675rem 2rem
  border-radius: 5px
  text-decoration: none
  font-weight: 500
  margin-top: .5rem
  display: inline-block
  color: black
  background-image: linear-gradient(yellow)
  background: -moz-linear-gradient(top,yellow 0,darkyellow 100%)
</style>
