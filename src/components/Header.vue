<template>
  <header class="header">
    <div class="hero-container">
      <!-- b-back, bg and ui are in 3 separate, but combined layers, on top of each other, check css for details  -->
      <div class="bg-back"></div>
      <div
        class="bg"
        style="background-image: url('https://images.unsplash.com/photo-1456154875099-97a3a56074d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80');"
      ></div>
      <div class="ui-container">
        <div class="main-hero">
          <img class="nasa" src="../assets/nasa.png"/>
          <div class="text-and-buttons">
            <p class="title">
              NASA - Shopify test
            </p>
            <p class="desc">
              Coding exercise webpage that can pull images, and allow the user to “like” and “unlike” their favourite images.
            </p>
            <p class="desc">
              Base features: 
            </p>
            <ul>
              <li>Fetch data from one of NASA’s APIs and display the resulting images</li>
              <li>Display descriptive data for each image (for example: title, date, description, etc.)</li>
              <li>Like an image</li>
              <li>Unlike an image</li>
            </ul>
            <p class="desc">
              Extras: 
            </p>
            <ul>
              <li>Save likes if the user leaves or reloads the page</li>
              <li>Add a loading state while we wait for NASA’s API to return data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="sass" scoped>
// Main component css

.hero-container
  position: relative

// Layered image and color transparency

a
  color: white

.bg
  background-repeat: no-repeat
  background-attachment: fixed
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
  background: orange
  width: 100%
  height: 100%
  top: 0
  left: 0
  position: absolute

// Images and text in header

.ui-container
  display: inline-block
  width: 100%
  position: relative

.main-hero
  display: flex
  flex-direction: column
  text-align: left
  padding-left: 1rem
  .nasa
    padding: 0rem 0 0 .5rem
    height: 160px
    width: 175px
  .text-and-buttons
    margin: 1.25rem 1rem
    max-width: 600px
    line-height: 1.5rem
    ul
      color: white
      padding: 0 1rem
      font-size: 90%
      margin: 1.6rem .5rem
      display: flex
      flex-direction: column
      justify-content: flex-end
    .title
      font-weight: 100
      font-size: 2rem
      line-height: 1.2
      width: 100%
      margin-top: 0
      margin-bottom: 1rem
      outline: 0
      box-sizing: border-box
    .title, .desc
      color: white
      text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000

@media screen and (max-width: 1088px)
  .main-hero
    padding-left: 0
</style>
