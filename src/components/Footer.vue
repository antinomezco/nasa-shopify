<template>
  <div class="footer">
    <div class="footer-container">
      <div class="upper">
        <div class="about">
          <strong>About</strong>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
            commodo nulla facilisi nullam vehicula. Sodales ut eu sem integer
            vitae justo. Mauris ultrices eros in cursus turpis massa tincidunt
            dui ut.
          </p>

          <p>
            Lectus urna duis convallis convallis tellus id interdum. Iaculis at
            erat pellentesque adipiscing commodo elit at. Proin sed libero enim
            sed faucibus turpis in. Gravida dictum fusce ut placerat. Tincidunt
            arcu non sodales neque sodales ut etiam. Id aliquet lectus proin
            nibh nisl condimentum id venenatis a.
          </p>
        </div>
        <div class="linksSite">
          <div class="links">
            <div><strong>Links</strong></div>
            <ul>
              <li>Stats</li>
              <li>Contact</li>
              <li>Privacy</li>
              <li>Favorites</li>
            </ul>
          </div>
          <div class="site">
            <div><strong>Site</strong></div>
            <ul>
              <li>Categories</li>
              <li>Cuisines</li>
              <li>Chefs</li>
              <li>Meals</li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div class="downer">
        <p>Website design inspired by <a href="theskullery.net">theskullery.net</a></p>
        <p>Constantino Saldana, at <a href="csaldana.xyz">csaldana.xyz</a></p>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.footer
  border-top: solid 2px darkred
  padding: 1rem 0 .1rem 0
  .footer-container
    width: 40%
    margin-left: auto
    margin-right: auto
    .upper
      display: flex
      .about
        width: 60%
        position: relative
        p 
          position: relative
        &::before
          content: ''
          position: absolute
          top: 0
          right: 0
          bottom: 0
          left: 0
          opacity: 0.3
          background-image: url("../assets/chef.png")
          background-repeat: no-repeat
          background-position: center
          background-size: 100px 100px
      .linksSite
        padding-left: 1rem
        display: flex
        .links, .site
          padding-right: 7rem
          text-align: left

li
  list-style: none
  list-style-position: outside
  margin-top: .3rem
  text-transform: uppercase
  letter-spacing: 1px
  font-size: small
  font-weight: 700
  color: gray
ul
  padding: 0

.downer, p, li
  text-align: left
  font-size: .8rem
</style>
