<template>
  <div class="one-recipe-hero">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        @submit.prevent="handleSubmit(onSubmit)"
        class="one-recipe-container"
      >
        <router-link to="/">
          <img class="hat" src="../assets/chef.png" />
        </router-link>
        <div class="image-container">
          <div
            class="imagePreviewWrapper"
            :style="{ 'background-image': `url(${formData.image})` }"
            @click="selectImage"
          ></div>
          <!-- <img :src="`${formData.image}`" alt="" @click="pickFile" /> -->
          <input ref="fileInput" type="file" @input="pickFile" v-show="false"/>
        </div>
        <div class="recipe-container">
          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
            <div class="recipe-title form-group">
              <h1><p>Recipe name</p></h1>
              <input
                v-model="formData.recipe_name"
                class="form-control"
                type="text"
              />
              <span>{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
          <hr />
          <div class="recipe-minutia" v-if="!loading">
            <div class="recipe-minutia-left">
              <div class="category">
                <validation-provider
                  v-slot="{ errors }"
                  name="Category"
                  rules="required"
                >
                  <span class="recipe-minutia-title">Category: </span>
                  <!-- v-model="formData.food_category" causes selected to not work anymore, find a binding workaround -->
                  <select v-model="formData.food_category">
                    <option
                      v-for="(item, index) in food_categoryList.data"
                      :key="index"
                      :value="item.id"
                      :selected="item.id === formData.food_category.id"
                    >
                      {{ item.food_category_name }}
                    </option>
                  </select>
                  <span>{{ errors[0] }}</span>
                </validation-provider>
                <!-- <span class="recipe-minutia-title">Category: </span
                >{{ formData.food_category.food_category_name }} -->
              </div>
              <div class="added-by">
                <span class="recipe-minutia-title">Added by: </span
                >{{ added_by.username }}
              </div>
            </div>
            <div class="recipe-minutia-right">
              <div class="time">
                <span class="recipe-minutia-title">Prep time: </span>
                <input v-model="formData.prep_time" /> |
                <span class="recipe-minutia-title">Cook time: </span
                ><input v-model="formData.cook_time" />
              </div>
              <validation-provider
                  v-slot="{ errors }"
                  name="Course"
                  rules="required"
                >
                  <span class="recipe-minutia-title">Course: </span>
                  <!-- v-model="formData.food_category" causes selected to not work anymore, find a binding workaround -->
                  <select v-model="formData.course">
                    <option
                      v-for="(item, index) in courseList.data"
                      :key="index"
                      :value="item.id"
                      :selected="item.id === formData.course.id"
                    >
                      {{ item.course_name }}
                    </option>
                  </select>
                  <span>{{ errors[0] }}</span>
                </validation-provider>
            </div>
          </div>
          <hr />
          <div class="recipe-details">
            <div class="recipe-ingredients-directions">
              <div class="recipe-ingredients">
                <ValidationProvider
                  name="Servings"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="form-group">
                    <p class="ingredients-title">
                      Ingredients for
                      <input
                        v-model="formData.servings"
                        class="form-control"
                        type="text"
                      />
                      servings
                    </p>
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  name="Ingredients"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="form-group">
                    <textarea
                      rows="10"
                      cols="50"
                      class="form-control"
                      type="text"
                      v-model="formData.ingredients_text"
                    />
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="recipe-directions">
                <p class="directions-title">Directions</p>
                <ValidationProvider
                  name="Steps"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="form-group">
                    <textarea
                      rows="10"
                      cols="50"
                      class="form-control"
                      type="text"
                      v-model="formData.recipe_steps"
                    />
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>
            <div class="recipe-notes" v-if="!loading">
              <p class="notes-title">Notes</p>
              <ValidationProvider
                name="Notes"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="form-group">
                  <textarea
                    rows="10"
                    cols="50"
                    class="form-control"
                    type="text"
                    v-model="formData.recipe_notes"
                  />
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  props: {
    slug: { required: true },
  },
  data() {
    return {
      // oneRecipe: "https://cookingdb.herokuapp.com/recipe/",
      oneRecipe: "http://127.0.0.1:8000",
      data: [],
      formData: {
        recipe_name: "",
        prep_time: "",
        cook_time: "",
        servings: "",
        image: "",
        recipe_description: "",
        ingredients_text: "",
        recipe_steps: "",
        recipe_notes: "",
        course: "",
        food_category: "",
        cuisine: "",
      },
      courseList: [],
      food_categoryList: [],
      cuisineList: [],
      added_by: ""
    };
  },
  async created() {
    try {
      // Using :oneRecipe + this.slug (prop from Pagination.vue)
      // and tries to load results from the database through Axios
      this.error = null;
      this.loading = true; //while true, the loading slot will be active
      let results = await this.axios.get(
        this.oneRecipe + "/recipe/" + this.slug,
        {
          // in case there's headers needed, like for Django authentication
          // headers: {
          //   'Authorization': `token ${this.authToken}`
          // }
        }
      );
      // Once results are in this.data, they're ready to use
      this.data = results.data;
      this.added_by = this.data.user;
      this.formData = results.data;
      this.formData.cuisine = this.data.cuisine.id;
      this.formData.food_category = this.data.food_category.id;
      this.formData.course = this.data.course.id;
      this.formData.user = this.data.user.id;
      // const imageTemp = this.data.image;
      // const correctUser = this.data.user.sub;
      console.log("data: ", this.data);
    } catch (e) {
      console.log(e);
      this.error = "This resource is not loading";
    }

    this.loading = false;
  },
  async mounted() {
    let preCuisine = await this.axios.get(this.oneRecipe + "/allcuisines", {
      // in case there's headers needed, like for Django authentication
      // headers: {
      //   'Authorization': `token ${this.authToken}`
      // }
    });
    console.log("preCuisine");
    console.log(preCuisine);
    this.cuisineList = preCuisine;

    let preFoodCategory = await this.axios.get(
      this.oneRecipe + "/allfoodcategories",
      {
        // in case there's headers needed, like for Django authentication
        // headers: {
        //   'Authorization': `token ${this.authToken}`
        // }
      }
    );
    console.log("preFoodCategory");
    console.log(preFoodCategory);
    this.food_categoryList = preFoodCategory;

    // this.ingredientList = ingredients

    let preCourses = await this.axios.get(this.oneRecipe + "/allcourses", {
      // in case there's headers needed, like for Django authentication
      // headers: {
      //   'Authorization': `token ${this.authToken}`
      // }
    });
    console.log("preCourses ");
    console.log(preCourses);
    this.courseList = preCourses;

    // console.log(this.formData);
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.formData.image = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    },
    async onSubmit() {
      console.log(this.formData);
      await this.axios.put(
        this.oneRecipe + "/edit/recipe/" + this.formData.slug + "/",
        this.formData
      );
    },
  },
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

.imagePreviewWrapper 
  width: 100%
  height: 300px
  display: block
  cursor: pointer
  border-radius: 5px
  margin: 0 auto 30px
  background-size: cover
  background-position: center center

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
