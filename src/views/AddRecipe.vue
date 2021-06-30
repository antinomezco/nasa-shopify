<template>
  <div class="one-recipe-hero" v-if="loading">
    <slot name="loading">
      <Spinner />
    </slot>
  </div>
  <div v-else class="one-recipe-hero">
    <!-- ValidationObserver from vee-validate used for correct form validation -->
    <ValidationObserver v-slot="{ invalid, handleSubmit }">
      <form
        @submit.prevent="handleSubmit(onUpload)"
        class="one-recipe-container"
      >
        <router-link to="/">
          <img class="hat" src="../assets/chef.png" />
        </router-link>
        <!--grabs the current default image
            if another file is chosen and submitted, it's replaced
            otherwise, it keeps the previous placeholder image -->
        <div class="image-container">
          <div
            class="image-preview-wrapper"
            :style="{ 'background-image': `url(${formData.image})` }"
            @click="selectImage"
          >
            <div class="inside-image-preview-wrapper">
              Click here to add or replace an image
            </div>
          </div>
          <input
            ref="fileInput"
            type="file"
            @change="previewImage"
            @input="pickFile"
            v-show="false"
          />
        </div>
        <div class="recipe-container">
          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
            <div class="recipe-title form-group">
              <input
                v-model="formData.recipe_name"
                class="form-control"
                type="text"
                placeholder="Recipe name"
              />
              <p>{{ errors[0] }}</p>
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
                  <select v-model="formData.food_category">
                    <option
                      v-for="(item, index) in foodCategoryList.data"
                      :key="index"
                      :value="item.id"
                      :selected="item.id === formData.food_category.id"
                    >
                      {{ item.food_category_name }}
                    </option>
                  </select>
                  <span>{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="cuisine">
                <validation-provider
                  v-slot="{ errors }"
                  name="Cuisine"
                  rules="required"
                >
                  <span class="recipe-minutia-title">Cuisine: </span>
                  <select v-model="formData.cuisine">
                    <option
                      v-for="(item, index) in cuisineList.data"
                      :key="index"
                      :value="item.id"
                      :selected="item.id === formData.cuisine.id"
                    >
                      {{ item.cuisine_name }}
                    </option>
                  </select>
                  <span>{{ errors[0] }}</span>
                </validation-provider>
              </div>
              <div class="added-by">
                <span class="recipe-minutia-title">Added by: </span
                >{{ formData.first_name }}
              </div>
            </div>
            <div class="recipe-minutia-right">
              <div class="time">
                <ValidationProvider
                  name="Prep"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="form-group">
                    <span class="recipe-minutia-title">Prep time: </span>
                    <input
                      v-model="formData.prep_time"
                      class="form-control"
                      type="text"
                      placeholder="ex: 15 mins"
                    />
                    <p>{{ errors[0] }}</p>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  name="Cook"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="form-group">
                    <span class="recipe-minutia-title">Cook time: </span>
                    <input
                      v-model="formData.cook_time"
                      class="form-control"
                      type="text"
                      placeholder="ex: 15 mins"
                    />
                    <p>{{ errors[0] }}</p>
                  </div>
                </ValidationProvider>
              </div>
              <validation-provider
                v-slot="{ errors }"
                name="Course"
                rules="required"
              >
                <span class="recipe-minutia-title">Course: </span>
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
                        placeholder="number of"
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
                      cols="40"
                      class="form-control"
                      type="text"
                      v-model="formData.ingredients_text"
                      placeholder="one ingredient per line"
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
                      cols="40"
                      class="form-control"
                      type="text"
                      v-model="formData.recipe_steps"
                      placeholder="one direction per line"
                    />
                    <span>{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
            </div>
            <div class="recipe-notes" v-if="!loading">
              <p class="notes-title">Notes</p>
              <ValidationProvider name="Notes" v-slot="{ errors }">
                <div class="form-group">
                  <textarea
                    rows="10"
                    cols="50"
                    class="form-control"
                    type="text"
                    v-model="formData.recipe_notes"
                    placeholder="one note per line"
                  />
                  <span>{{ errors[0] }}</span>
                </div>
              </ValidationProvider>
            </div>
          </div>
        </div>
        <button type="submit" :disabled="invalid" @click="onSubmit">Submit</button>
        <button @click="clear">
          Clear</button
        ><br />
        <progress
          max="100"
          :value.prop="uploadValue"
          v-show="uploadValue"
        ></progress>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
import firebase from "firebase";
export default {
  components: {
    Spinner,
  },
  data() {
    return {
      // oneRecipe: "https://cookingdb.herokuapp.com",
      oneRecipe: process.env.VUE_APP_LOCAL_DB,
      data: [],
      formData: {
        recipe_name: "",
        prep_time: "",
        cook_time: "",
        first_name: "",
        email: "",
        servings: "",
        image: require("../assets/placeholder.png"),
        recipe_description: "",
        ingredients_text: "",
        recipe_steps: "",
        recipe_notes: "",
        course: "",
        food_category: "",
        cuisine: "",
        slug: "",
      },
      courseList: [],
      foodCategoryList: [],
      cuisineList: [],
      imageAdded: false,
      imageTemp: null,
      uploadValue: 0,
      correctUser: "",
      loading: null,
    };
  },

  async created() {
    try {
      // Using :oneRecipe + this.slug (prop from Pagination.vue)
      // and tries to load results from the database through Axios
      this.error = null;
      this.loading = true; //while true, the loading slot will be active
      // Once results are in this.data, they're ready to use
      // loads the information onto the required variables
      console.log("AddedBy: ", this.$auth.user.email);
      this.formData.first_name = this.$auth.user.given_name;
      this.formData.email = this.$auth.user.email;
      // stores the image in a separate variable in case it doesn't get changed
      // stores the user id in a separate variable in case to use in a comparison
    } catch (e) {
      console.log(e);
      this.error = "This resource is not loading";
    }

    this.loading = false;
  },
  async mounted() {
    // loads the select with the appropriate API info
    let preCuisine = await this.axios.get(this.oneRecipe + "/allcuisines", {});
    this.cuisineList = preCuisine;

    let preFoodCategory = await this.axios.get(
      this.oneRecipe + "/allfoodcategories",
      {}
    );
    this.foodCategoryList = preFoodCategory;

    let preCourses = await this.axios.get(this.oneRecipe + "/allcourses", {});
    this.courseList = preCourses;
  },
  methods: {
    onSubmit() {
      this.slugify(this.formData.recipe_name);
      this.onUpload();
    },
    slugify(str) {
      str = str.replace(/^\s+|\s+$/g, "");

      // Make the string lowercase
      str = str.toLowerCase();

      // Remove accents, swap ñ for n, etc
      var from =
        "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
      var to =
        "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
      for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      // Remove invalid chars
      str = str
        .replace(/[^a-z0-9 -]/g, "")
        // Collapse whitespace and replace by -
        .replace(/\s+/g, "-")
        // Collapse dashes
        .replace(/-+/g, "-");

      this.formData.slug = str;
    },
    clear() {
      var self = this; //you need this because *this* will refer to Object.keys below`

      //Iterate through each object field, key is name of the object field`
      Object.keys(this.formData).forEach(function(key, index) {
        self.formData[key] = "";
      });
      this.formData.image = require("../assets/placeholder.png");
    },
    redirect() {
      this.$router.replace({ path: `/recipe/${this.formData.slug}` });
    },
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
    async postRecipe() {
      if (!this.imageAdded) {
        this.formData.image = require("../assets/placeholder.png");
      }
      console.log(this.formData);
      await this.axios.post(this.oneRecipe + "/add_recipe/", this.formData);
      setTimeout(this.redirect, 2000);
    },
    previewImage(event) {
      this.imageAdded = true;
      this.imageData = event.target.files[0];
    },
    onUpload() {
      // this.image = null;
      try {
        this.postRecipe();
      } catch {
        console.log("FORMDATA ERROR");
        return;
      }
      const storageRef = firebase
        .storage()
        .ref(
          `${this.CryptoJS.SHA1(
            this.$auth.user.sub
          ).toString()}/${this.CryptoJS.SHA1(this.formData.slug).toString()}`
        )
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.formData.image = url;
            console.log(url);
            console.log(this.formData);
          });
        }
      );
    },
  },
};
</script>

<style lang="sass" scoped>

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

.image-preview-wrapper
  width: 100%
  height: 300px
  display: block
  cursor: pointer
  border-radius: 5px
  margin: 0 auto 30px
  background-size: cover
  border: 1px solid darkred
  background-position: center center
  .inside-image-preview-wrapper
    z-index: 5
    height: 100%
    display: flex
    justify-content: center
    align-items: flex-end
    color: white
    text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000
    font-weight: 700

.one-recipe-hero
  padding-bottom: .5rem

.recipe-title
  margin: 2rem 0

hr
  margin: 1rem 0

//recipe-minutia section

.recipe-minutia-left
  float: left
  text-align: left

.recipe-minutia-right
  text-align: right

.recipe-minutia-title
  font-weight: 700

//recipe details section

.recipe-details
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

// input and buttons

.recipe-details, .recipe-minutia
  input
    width:100px

input
  width: 250px
  padding:5px
  border: 2px solid #eee

input, textarea, select
  border-radius:10px
  font-family: inherit
  font-size: inherit

textarea
  resize: vertical
  width: 100%
  max-width: 500px

select
  width: 110px
  margin: 5px 0
  padding: 2px

button
  /* remove default button behavior */
  appearance: none
  -webkit-appearance: none

  /* button styles */
  padding:10px
  margin: 0 5px
  border: none
  background-color: darkred
  color:#fff
  font-weight:600
  border-radius:5px
  width:25%
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
  textarea
    max-width: 650px

@media screen and (max-width: 420px)
  .recipe-minutia
    display: flex
    flex-direction: column
  .recipe-minutia-right
    padding-top: 1rem
</style>
