<template>
  <div class="one-recipe-hero">
    <div class="one-recipe-container">
      <div class="image-container">
        <img :src="`${this.data.image}`" alt="" />
      </div>
      <div class="recipe-container">
        <div class="recipe-title">
          <h1>{{ this.data.recipe_name }}</h1>
        </div>
        <hr />
        <div class="recipe-minutia">minutia</div>
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
                v-for="ing in data.ingredients_text.split('\r\n')"
                :key="ing"
                class="ingredients-text"
              >
                {{ ing }}
              </p>
            </div>
            <div class="recipe-directions" v-if="!loading">
              <p class="directions-title">Directions</p>
              <p
                v-for="dir in data.recipe_steps.split('\r\n')"
                :key="dir"
                class="recipe-steps"
              >
                {{ dir }}
              </p>
            </div>
          </div>
          <div class="recipe-notes" v-if="!loading">
            <p class="notes-title">Notes</p>
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slug: { required: true },
  },
  data() {
    return {
      oneRecipe: "https://cookingdb.herokuapp.com/recipe/",
      data: [],
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
};
</script>

<style lang="sass">
// .one-recipe-hero


.one-recipe-container
  padding: .5rem 2rem
  max-width: 64em
  margin-left: auto
  margin-right: auto
  font-family: Inter
  line-height: 1.5

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
