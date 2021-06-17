<template>
  <div class="home">
    <div class="recipe-hero">
      <div class="bg-back"></div>
      <div
        class="bg"
        style="background-image: url('https://www.foodserviceandhospitality.com/wp-content/uploads/2014/08/placeholder-003.jpg'); width: 100%; height: 100%;"
      >
        <div class="ui">
          <div class="header">
            <ul v-for="link in links" :key="link.name">
              {{link.name}}
            </ul>
          </div>
          <div class="main-hero">
            <img src="../assets/chef.png" height="75px" width="75px" />
            <div class="textAndButtons">
              <p class="title">
                La calavería
              </p>
              <p class="desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p class="signature">
                <img src="../assets/quill-drawing-a-line.png" height="75px" width="75px">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [{ name: "About" }, { name: "Tags" }, { name: "Favorites" }],
    };
  },
};
</script>

<style lang="sass">
.main-hero
  display: flex
  // display: inline-block
  flex-direction: column
  text-align: left
  margin-top: -2rem
  margin-bottom: 2rem
  padding-left: 2rem

.header
  text-align: right
  margin-right: 1rem
  padding: 0 1rem
  ul
    margin: 1.6rem -.5rem
    display: inline-block
    li
      list-style-type: none

.ui
  display: inline-block
  width: 100%

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
  font-size: 2rem
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

.signature
  -webkit-filter: invert(1)
  filter: invert(1)

.login
  font-weight: 500
  margin-top: .5rem
  display: inline-block
  color: black
  background: linear-gradient(to bottom,#CCCC00 0,#999900 100%)

.login:hover
  background: linear-gradient(to bottom,#999900 0,#666600 100%)

.login, .random
  border-radius: 5px
  text-decoration: none
  padding: .75rem 2rem
  font-weight: 500


.random
  margin-left: 1rem
  border: 1px solid white
  color: white
  background: 0 0

.random:hover
  background: white
  color: black

.textAndButtons
  margin: 1.25rem 1rem
  max-width: 600px
  line-height: 1.5rem
</style>
