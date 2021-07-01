<template>
  <div class="header">
    <div class="recipe-hero">
      <!-- b-back, bg and ui are in 3 separate, but combined layers, on top of each other, check css for details  -->
      <div class="bg-back"></div>
      <div
        class="bg"
        style="background-image: url('https://images.unsplash.com/photo-1523986371872-9d3ba2e2a389?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3VtbWVyJTIwZm9vZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80');"
      ></div>
      <div class="ui-container">
        <div class="header">
          <ul class="links-header">
            <li v-if="!$auth.isAuthenticated" @click="login">Log in/Sign up</li>
            <li v-else @click="logout">Log out</li>
          </ul>
        </div>
        <div class="main-hero">
          <img class="hat" src="../assets/chef.png"/>
          <div class="text-and-buttons">
            <p class="title">
              La calavería
            </p>
            <p class="desc">
              Inspired by <span><a href="http://www.theskullery.net">The Skullery</a></span>
              as to combine several of my passions, web development, photography and cooking.
            </p>
            <p class="desc">
              This is a website created to test my abilities as a web developer.
              The frontend is made with VueJS without using any component
              library, just CSS. In addition the following packages are used: firebase (for 
              storing images), auth0 (for authentication), lodash (for its 
              debounce function), vee-validate (for forms), axios (to connect 
              to my own API) and vue-router (to navigate between different pages
              and for authentication guard with auth0).
            </p>
            <p class="desc">
              The backend was made from scratch using Django, custom made for this
              particular website.
            </p>
            <p class="signature">
              <img
                src="../assets/quill-drawing-a-line.png"
                height="75px"
                width="75px"
              />
            </p>
            <div>
              <router-link to="/addrecipe" class="submit">
                Submit Recipe
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout();
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="sass" scoped>
// Main component css

.recipe-hero
  position: relative

// Layered image and color transparency

a
  color: white

.bg
  background-repeat: no-repeat
  background-attachment: center
  background-position: center
  background-size: cover
  top: 0
  left: 0
  width: 100%
  height: 100%
  position: absolute
  mix-blend-mode: multiply
  filter: grayscale(100%)
.bg-back
  background: red
  width: 100%
  height: 100%
  top: 0
  left: 0
  position: absolute

// Header links
.header
  text-align: right
  ul
    color: white
    padding: 0 1rem
    font-size: 90%
    margin: 1.6rem .5rem
    display: flex
    justify-content: flex-end
    li
      list-style-type: none
      padding: 0 1rem
      cursor: pointer
      


// Images and text in header

.ui-container
  display: inline-block
  width: 100%
  position: relative

.main-hero
  display: flex
  flex-direction: column
  text-align: left
  margin-top: -2rem
  margin-bottom: 2rem
  padding-left: 1rem
  .hat
    padding: 0 0 0 .5rem
    height: 75px
    width: 75px
  .text-and-buttons
    margin: 1.25rem 1rem
    max-width: 600px
    line-height: 1.5rem
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

@media screen and (max-width: 1088px)
  .main-hero
    padding-left: 0

// Buttons

.submit
  font-weight: 500
  margin-top: .5rem
  display: inline-block
  color: black
  background: linear-gradient(to bottom,#CCCC00 0,#999900 100%)

.submit:hover
  background: linear-gradient(to bottom,#999900 0,#666600 100%)

.submit, .random
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
</style>
