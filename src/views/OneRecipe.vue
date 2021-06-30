<template>
  <div class="one-recipe-hero" v-if="loading">
    <slot name="loading">
      <Spinner />
    </slot>
  </div>
  <div v-else class="one-recipe-hero">
    <div class="one-recipe-container">
      <router-link to="/">
        <img class="hat" src="../assets/chef.png" />
      </router-link>
      <div class="image-container">
        <img :src="`${this.data.image}`" alt="" />
      </div>
      <div class="recipe-container">
        <div class="recipe-title">
          <h1>{{ this.data.recipe_name }}</h1>
        </div>
        <hr />
        <div class="recipe-minutia" v-if="!loading">
          <div class="recipe-minutia-left">
            <div class="category">
              <span class="recipe-minutia-title">Category: </span
              >{{ this.data.food_category.food_category_name }}
            </div>
            <div class="cuisine">
              <span class="recipe-minutia-title">Cuisine: </span
              >{{ this.data.cuisine.cuisine_name }}
            </div>
            <div class="added-by">
              <span class="recipe-minutia-title">Added by: </span
              >{{ this.data.first_name }}
            </div>
          </div>
          <div class="recipe-minutia-right">
            <div class="time">
              <div >
                <span class="recipe-minutia-title">Prep time:</span> {{ this.data.prep_time }}
              </div>
              <div>
                 <span class="recipe-minutia-title">Cook time:</span> {{ this.data.cook_time }}
              </div>
            </div>
            <div class="meal">
              <span class="recipe-minutia-title">Meal: </span
              >{{ this.data.course.course_name }}
            </div>
          </div>
        </div>
        <hr />
        <div class="recipe-details">
          <div class="recipe-ingredients-directions">
            <!-- added v-if="!loading" to prevent v-for from trigerring an error 
            before there's any data to iterate -->
            <div class="recipe-ingredients" v-if="!loading">
              <p class="ingredients-title">
                Ingredients for {{ data.servings }} servings
              </p>
              <p
                v-for="(ing, index) in data.ingredients_text.split('\n')"
                :key="index"
                class="ingredients-text"
              >
                {{ ing }}
              </p>
            </div>
            <div class="recipe-directions" v-if="!loading">
              <p class="directions-title">Directions</p>
              <p
                v-for="(dir, index) in data.recipe_steps.split('\n\n')"
                :key="index"
                class="recipe-steps"
              >
                {{ dir }}
              </p>
            </div>
          </div>
          <div class="recipe-notes" v-if="!loading">
            <p class="notes-title" v-if="data.recipe_notes">Notes</p>
            <p
              v-for="note in data.recipe_notes.split('\r\n')"
              :key="note"
              class="notes-steps"
            >
              {{ note }}
            </p>
          </div>
        </div>
      </div>
      <button @click="editPageGo">Edit Recipe</button>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
export default {
  components: {
    Spinner,
  },
  props: {
    slug: { required: true },
  },
  data() {
    return {
      // oneRecipe: "https://cookingdb.herokuapp.com/recipe/",
      oneRecipe: process.env.VUE_APP_LOCAL_DB + "/recipe/",
      data: [],
      loading: null,
      errorMessage: false,
    };
  },
  async created() {
    try {
      // Using :oneRecipe + this.slug (prop from Pagination.vue)
      // and tries to load results from the database through Axios
      this.error = null;
      this.loading = true; //while true, the loading slot will be active
      let results = await this.axios.get(this.oneRecipe + this.slug, {
        // in case there's headers needed, like for Django authentication
        // headers: {
        //   'Authorization': `token ${this.authToken}`
        // }
      });
      // Once results are in this.data, they're ready to use
      this.data = results.data;
      console.log("data: ", this.data);
    } catch (e) {
      console.log(e);
      this.error = "This resource is not loading";
    }

    this.loading = false;
  },
  methods: {
    editPageGo() {
      this.$router.push("/recipe/edit/" + this.data.slug)
    }
  }
};
</script>

<style lang="sass" scoped>
// .one-recipe-hero


.one-recipe-container
  padding: .5rem 2rem
  max-width: 64em
  margin-left: auto
  margin-right: auto
  font-family: Inter
  line-height: 1.5

a
  position: absolute
  top: 2rem // adds padding on the top
  display: block //makes it align to the left
  .hat
    height: 75px
    width: 75px
    background: #efeeee
    border-radius: 0 5px 5px 0
    padding: .5rem .5rem .5rem 2rem
    margin-right: auto

.image-container
  img
    object-fit: cover
    width: 100%
    height: 300px
    border-radius: 5px

.recipe-title
  margin: 2rem 0

hr
  margin: 1rem 0

// .recipe-minutia

.recipe-minutia-left
  float: left
  text-align: left

.recipe-minutia-right
  text-align: right

.recipe-minutia-title
  font-weight: 700

.recipe-details
  margin: 2rem 0
  text-align: left

.recipe-ingredients-directions
  display: flex

.recipe-ingredients
  background-color: #F3F1D6
  padding: 1rem
  border: 1px solid #F0F0F0
  box-shadow: 0 2px 3px 0 rgba(0,0,0,.075)
  width: 50%
  cursor: default
  .ingredients-title
    color: #ba9d1cff
    font-weight: 700

.recipe-directions
  padding: 1rem
  width: 50%


.directions-title, .notes-title
  color: red
  font-weight: 700

.recipe-notes
  padding: 1rem

button
  /* remove default button behavior */
  appearance: none
  -webkit-appearance: none

  /* button styles */
  padding: 10px
  margin: 0 5px
  border: none
  background-color: darkred
  color: #fff
  font-weight: 600
  border-radius: 5px
  width: 25%
button[disabled]
  background-color: gray
  opacity: .30
button:active
  box-shadow: 0 5px gray
  transform: translateY(2px)

@media screen and (max-width: 760px)
  .one-recipe-container
    padding: .5rem
  .recipe-ingredients-directions
    flex-direction: column
  .recipe-directions, .recipe-ingredients, .recipe-notes
    padding: 1rem
    width: 90%
    margin: 0 auto
</style>
