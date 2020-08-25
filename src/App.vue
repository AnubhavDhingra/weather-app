<template>
  <div id="app">
    <search></search>
    <div>
      <h2>Daily temperatures</h2>
    </div>
    <div class="projection">
      <projections></projections>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SearchBar from './components/SearchBar.vue';
import Projections from './components/Projections.vue';

export default {
  name: 'App',
  components: {
    'search': SearchBar,
    'projections': Projections
  },
  methods: {
    ipLookUp() {
      axios.get('http://ip-api.com/json')
        .then((res) => {
          console.log('User\'s Location Data is ', res);
          console.log('User\'s Country', res.data.city);
          this.getWeatherReport(res.data.city);
        })
    },

    getAddress(latitude, longitude) {
      axios.get('https://apis.mapmyindia.com/advancedmaps/v1/jmf1erqyncvtqg7o39z92acc4rb75a9z/rev_geocode?lng='+ longitude +'&lat='+latitude)
        .then(res => {
          console.log(res.data.results[0].city);
        })
    },
    geoLocation() {
      if ("geolocation" in navigator) {
        // check if geolocation is supported/enabled on current browser
        navigator.geolocation.getCurrentPosition((position) => {
           console.log('latitude', position.coords.latitude,'longitude', position.coords.longitude);
           this.getAddress(position.coords.latitude, position.coords.longitude);
         },
        (error_message) => {
          console.error('An error has occured while retrieving location', error_message);
          // trying another way
          this.ipLookUp();
        }
      )}
      else {
        // geolocation is not supported
        console.log('geolocation is not enabled on this browser');
        // getting your location some other way
        this.ipLookUp();
      }
    },

    getWeatherReport(city) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=33f52589d62d396f2a5c2d64efc29cb6`)
      .then(res => {
        console.log(res);
      })
    }
    
  },
  created() {
    // this.geoLocation();
  }
}
</script>

<style scoped>
.projection{
  bottom: 10%;
}
</style>
