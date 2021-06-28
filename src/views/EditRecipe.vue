<template>
  <div class="one-recipe-hero">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form
        @submit.prevent="handleSubmit(onUpload)"
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
              <div class="added-by">
                <span class="recipe-minutia-title">Added by: </span
                >{{ addedBy.username }}
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
                        placeholder="number of servings"
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
        <button :disabled="correctUserCheck" type="submit">Submit</button>
        <button :disabled="correctUserCheck" @click="deleteRecipe">Delete</button><br>
        <progress max="100" :value.prop="uploadValue" v-show="uploadValue"></progress>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    slug: { required: true },
  },
  data() {
    return {
      oneRecipe: "https://cookingdb.herokuapp.com",
      // oneRecipe: "http://127.0.0.1:8000",
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
      foodCategoryList: [],
      cuisineList: [],
      addedBy: "",
      imageAdded: false,
      imageTemp: null,
      uploadValue: 0,
      correctUser: "",
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
      this.addedBy = this.data.user;
      // 
      this.formData = results.data;
      let imageTemp = this.formData.image;
      this.imageTemp = imageTemp;
      let correctUser = this.formData.user.sub;
      this.correctUser = correctUser
      this.formData.cuisine = this.data.cuisine.id;
      this.formData.food_category = this.data.food_category.id;
      this.formData.course = this.data.course.id;
      this.formData.user = this.data.user.id;
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
    this.foodCategoryList = preFoodCategory;

    // this.ingredientList = ingredients

    let preCourses = await this.axios.get(this.oneRecipe + "/allcourses", {
      // in case there's headers needed, like for Django authentication
      // headers: {
      //   'Authorization': `token ${this.authToken}`
      // }
    });
    this.courseList = preCourses;

    console.log("this.formData.image: ", this.formData.image);
    console.log("this.imageTemp: ", this.imageTemp);
  },
  methods: {
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
    async putRecipe() {
      if (!this.imageAdded) {
        this.formData.image = this.imageTemp;
      }
      console.log(this.formData);
      await this.axios.put(
        this.oneRecipe + "/edit/recipe/" + this.formData.slug + "/",
        this.formData
      );
      setTimeout(this.redirect, 2000);
    },
    previewImage(event) {
      this.imageAdded = true;
      this.imageData = event.target.files[0];
    },
    onUpload() {
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
          this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log("ERROR: ", error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.formData.image = url;
            console.log("url: ", url);
            console.log("this.formData.image: ", this.formData.image);
            this.putRecipe();
          });
        }
      );
    },
    async deleteRecipe() {
      // if(this.CryptoJS.SHA1(this.$auth.user.sub).toString() != this.correctUser){
      // return alert("Cannot edit other user's recipes")
      // }
      console.log("oneRecipe + /edit/recipe/" + this.formData.slug + "/");
      await this.axios.delete(
        this.oneRecipe + "/edit/recipe/" + this.formData.slug + "/"
      );
      setTimeout(this.$router.replace({ path: "/" }), 2000);
    },
  },
  computed: {
    correctUserCheck() {
      return this.CryptoJS.SHA1(this.$auth.user.sub).toString() != this.correctUser
    }
  }
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

.imagePreviewWrapper
  width: 100%
  height: 300px
  display: block
  cursor: pointer
  border-radius: 5px
  margin: 0 auto 30px
  background-size: cover
  background-position: center center

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
  appearance:none
  -webkit-appearance:none

  /* button styles */
  padding:10px
  margin: 0 5px
  border:none
  background-color: darkred
  color:#fff
  font-weight:600
  border-radius:5px
  width:25%
button[disabled]
  background-color: gray
  opacity: .30

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
