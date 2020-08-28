<template>
    <v-main>
      <v-text-field
        :append-icon="'mdi-magnify'"
        filled
        autofocus
        solo
        class="searchBar"
        color="black"
        prepend-inner-icon="mdi-map-marker"
        @input="userInput"
        v-model="city"
        style="fontWeight: bold"
      ></v-text-field>
    </v-main>
</template>
<script>
export default {
  props: ['location'],
  data() {
    return {
      input: ''
    }
  },
  methods: {
    userInput() {
      // console.log(this.input);
      this.$emit('userInput', this.input);
    }
  },
  computed: {
    city :{
      get() {
        return this.location;
      },
      set(value) {
        this.input = value;
      }      
    }
  },
  mounted() {
    console.log(this.location, 'City');
  },
  updated() {
    console.log(this.location, 'City Updated');
  }
}
</script>
<style scoped>
.searchBar {
    margin-top: 5px;
    width: 96%;
    margin: auto;
    border-radius: 10px;
}
</style>