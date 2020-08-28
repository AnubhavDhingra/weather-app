<template>
  <div :class="[{hover: isHovering}]"
    class="box"
      @mouseover="isHovering = true" 
      @mouseout="isHovering = false" >
      <h6>{{transformedDay}}</h6>
      <h6>{{temp.day.toFixed()}}&deg;C <span style="fontWeight: lighter">{{temp.night.toFixed()}}&deg;C</span></h6>
      <thunderstorm-svg class="svgIcon"  v-if="weather[0].main === 'Thunderstorm'"></thunderstorm-svg>
      <raining-svg class="svgIcon"  v-else-if="weather[0].main === 'Rain'"></raining-svg>
      <cloud-svg class="svgIcon"  v-else-if="weather[0].main === 'Clouds'" ></cloud-svg>
      <snow-svg class="svgIcon"  v-else-if="weather[0].main === 'Snow'"></snow-svg>
      <sun-svg class="svgIcon" v-else-if="weather[0].main === 'Clear'"></sun-svg>
      <fog-svg class="svgIcon" v-else-if="weather[0].main === 'Fog'"></fog-svg>
      <weather-svg class="svgIcon" v-else></weather-svg>
      <h6>{{weather[0].main}}</h6>
  </div>
</template>

<script>
import cloudSvg from '../assets/cloud.svg';
import rainingSvg from '../assets/raining.svg';
import sunSvg from '../assets/sun.svg';
import weatherSvg from '../assets/weather.svg';
import thunderstormSvg from '../assets/thunderstorm.svg';
import snowSvg from '../assets/snow.svg';
import fogSvg from '../assets/fog.svg';
export default {
    props: ['day', 'temp', 'svg', 'weather'],
    components: {
      cloudSvg,
      rainingSvg,
      sunSvg,
      weatherSvg,
      thunderstormSvg,
      snowSvg,
      fogSvg
    },
    data () {
        return {
            isHovering: false,
            today: ''

        }
    },
    computed: {
        transformedDay () {
            let cloneDay = this.day;
            cloneDay = new Date(cloneDay*1000).toDateString().slice(0,3);
            console.log(typeof cloneDay);
            return cloneDay
        }
    }
}
</script>

<style scoped>
.box{
    border: 1px solid white;
    width: auto;
    height: auto;
    padding: 0px 8px;
    font-size: x-large;
    margin: 2px;
    display: inline-block;
    text-align: center;
    max-width: -webkit-fill-available;
    flex: 0 0 60px;
    cursor: pointer;
}
.svgIcon {
    height: 20px;
    width: 20px;
}
.hover {
    border-color: lightskyblue;
}
</style>