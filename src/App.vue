<template>
  <div class="container wrapper">
    <v-app>
      <search-bar 
        @userInput="getWeatherReport" 
        :location="city"
      ></search-bar>
      <div class="inner_container">
        <daily-update
          v-for="(day,id) in daily"
          :key="id"
          :day="day.dt"
          :temp="day.temp"
          :weather="day.weather"
          @click.native="changeDay(day)"
        ></daily-update>
      </div>
      <projections
        :weather="weather"
        :pressure="pressure"
        :humidity="humidity"
        :sunrise="sunrise"
        :sunset="sunset"
        :temperature="temperature"
        :hourly="hourly"
        v-if="weather.length !== 0"
      ></projections>
      <template v-else>
        <v-sheet :color="'grey lighten-4 '" class="px-3 pt-3 pb-3">
          <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
        </v-sheet>
      </template>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import SearchBar from "./components/SearchBar.vue";
import Projections from "./components/Projections.vue";
import DailyUpdate from "./components/DailyUpdate.vue";
import { data } from "./assets/data";

export default {
  name: "App",
  components: {
    SearchBar,
    Projections,
    DailyUpdate,
  },
  methods: {
    ipLookUp() {
      axios.get("http://ip-api.com/json").then((res) => {
        console.log("User's Location Data is ", res);
        this.getGeocodeWeatherReport(res.data.lat, res.data.lon);
        this.getAddress(res.data.lat, res.data.lon);
      });
    },
    getAddress(latitude, longitude) {
      axios.get('https://apis.mapmyindia.com/advancedmaps/v1/{apiKey}/rev_geocode?lng='+ longitude +'&lat='+latitude)
        .then(res => {
          this.city = res.data.results[0].subDistrict + ', ' + res.data.results[0].state;
          
          console.log(this.city);
        })
        if (this.city == '') this.city = 'Mumbai, Maharashtra';
    },
    getWeatherReport(city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={apikey}`
        )
        .then((res) => {
          console.log(res);
            if (res.status == 200) {
                this.weather = res.data.weather;
                this.pressure = res.data.main.pressure;
                this.humidity = res.data.main.humidity;
                this.calculateDaylight(res.data.sys.sunrise,res.data.sys.sunset);
                this.temperature = res.data.main.feels_like;
                console.log(this.temperature,'updated');
            }
        });
    },
    getGeocodeWeatherReport(lat, long) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid={apikey}`
        )
        .then((res) => {
          this.data = {...res.data};
          this.daily = [...this.data.daily];
          console.log(this.data);
          this.weather = this.data.current.weather;
          this.pressure = this.data.current.pressure;
          this.humidity = this.data.current.humidity;
          this.temperature = this.data.current.temp;
          this.data.hourly.map( el => {
            this.hourly.push( {name: `${el.temp}` ,pv: el.temp})
          });
          this.calculateDaylight(this.data.current.sunrise,this.data.current.sunset);
          this.hourlyFirstDay = this.hourly.slice(0,23);
          this.hourlySecondDay = this.hourly.slice(24);
          console.log(this.hourlySecondDay.length, this.hourlyFirstDay.length);
          this.hourly = [...this.hourlyFirstDay];
        });
    },
    calculateDaylight(sunrise, sunset) {
      this.sunrise = new Date(sunrise * 1000).toLocaleTimeString("en-IN", {hour: '2-digit', minute:'2-digit'});
      this.sunset = new Date(sunset * 1000).toLocaleTimeString("en-IN", {hour: '2-digit', minute:'2-digit'});
      console.log(this.sunset, this.sunrise);
    },
    geoLocation() {
      if ("geolocation" in navigator) {
        // check if geolocation is supported/enabled on current browser
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(
              "latitude",
              position.coords.latitude,
              "longitude",
              position.coords.longitude
            );
            this.getGeocodeWeatherReport(position.coords.latitude, position.coords.longitude);
            this.getAddress(position.coords.latitude, position.coords.longitude);
          },
          (error_message) => {
            console.error(
              "An error has occured while retrieving location",
              error_message
            );
            // trying another way
            this.ipLookUp();
          }
        );
      } else {
        // geolocation is not supported
        console.log("geolocation is not enabled on this browser");
        // getting your location some other way
        this.ipLookUp();
      }
    },
    changeDay(day) {
      console.log(day, 'change day');
      this.weather = day.weather;
      this.pressure = day.pressure;
      this.humidity = day.humidity;
      this.temperature = day.temp.day;
      if (this.hourly.length === 23 || this.hourly.length === 0) {
        this.hourly = [...this.hourlySecondDay];
      } else {
        this.hourly = [...this.hourlyFirstDay];
      }
      
      this.calculateDaylight(day.sunrise, day.sunset);
    }
  },
  created() {
    this.geoLocation();
  },
  data() {
    return {
      weather: [],
      daily: [],
      pressure: 0,
      humidity: 0,
      sunrise: "",
      sunset: "",
      hourlyFirstDay: [],
      hourlySecondDay: [],
      hourly: [],
      data,
      city: ''
    };
  },
  // computed: {
  //   temperatureChange () {
  //     console.log('temp change');
  //     return this.temperature;
  //   }
  // }
};
</script>
<style scoped>
.inner_container {
      display: flex;
    padding: 0 20px;
    width: 96%;
    overflow-x: auto;
    /* font-size: 1.2rem; */
    white-space: nowrap;
}
.wrapper main.v-main {
  flex: 0;
  margin-top: 8px;
}
</style>