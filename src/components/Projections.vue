<template>
  <div class="card">
    <div>
      <h1 class="temperature">
        <strong>{{temperature.toFixed()}}&deg;C</strong>
      </h1>
      <thunderstorm-svg class="svgIcon" v-if="weather[0].main === 'Thunderstorm'"></thunderstorm-svg>
      <raining-svg class="svgIcon" v-else-if="weather[0].main === 'Rain'"></raining-svg>
      <cloud-svg class="svgIcon" v-else-if="weather[0].main === 'Clouds'"></cloud-svg>
      <snow-svg class="svgIcon" v-else-if="weather[0].main === 'Snow'"></snow-svg>
      <sun-svg class="svgIcon" v-else-if="weather[0].main === 'Clear'"></sun-svg>
      <fog-svg class="svgIcon" v-else-if="weather[0].main === 'Fog'"></fog-svg>
      <weather-svg class="svgIcon" v-else></weather-svg>
    </div>

    <div style="overflowX:scroll">
      <la-cartesian :bound="[0]" :width="500" :height="150" :data="hourly">
        <defs>
          <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop stop-color="#71CDFA" offset="0%" stop-opacity="0.6"></stop>
            <stop stop-color="#0076b1" offset="50%" stop-opacity="0.05"></stop>
            <stop stop-color="#0076b1" offset="100%" stop-opacity="0"></stop>
          </linearGradient>
        </defs>
        <la-area fill-color="url(#area-fill)" dot prop="pv">
          <g slot-scope="props" :fill="props.color">
            <rect
              :x="props.x - 5"
              :y="props.y - 5"
              :rx="10"
              width="10"
              style="fill:white;stroke:#41AAE8"
              height="10"
            ></rect>
          </g>
        </la-area>
        <la-x-axis prop="name" :interval="3" class="xaxis"></la-x-axis>
      </la-cartesian>
    </div>
    <div class="infoCards">
      {{weather.main}}
      <div>
        <span>Pressure</span>
        <span>{{pressure}}hpa</span>
      </div>
      <div>
        <span>Humidity</span>
        <span>{{humidity}}%</span>
      </div>
    </div>
    <div class="sunCards">
      <div>
        <span>Sunrise</span>
        <span>{{sunrise}}</span>
      </div>
      <div>
        <span>Sunset</span>
        <span>{{sunset}}</span>
      </div>
    </div>
    <div class="daylight">
      <la-cartesian :bound="[0]" autoresize :width="300" :height="70" :data="bell">
        <defs>
          <linearGradient id="area-fill-sunlight" x1="0" y1="0" x2="0" y2="1">
            <stop stop-color="#FEE7BA" offset="0%" stop-opacity="0.4"></stop>
            <stop stop-color="#FEE7BA" offset="50%" stop-opacity="0.2"></stop>
            <stop stop-color="#666667" offset="50%"  stop-opacity="1"></stop>
          </linearGradient>
        </defs>
        <la-area fill-color="url(#area-fill-sunlight)" color="#fce1ae" dot curve prop="pv"></la-area>
        <la-x-axis prop="name"></la-x-axis>
      </la-cartesian>
    </div>
    <!-- <template>
       <la-cartesian autoresize :bound="[0]" :width="80" :height="80" :data="bell">
          <defs>
            <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop stop-color="#0076b1" offset="0%" stop-opacity="0.08"></stop>
              <stop stop-color="#0076b1" offset="50%" stop-opacity="0.05"></stop>
              <stop stop-color="#0076b1" offset="100%" stop-opacity="0"></stop>
            </linearGradient>
          </defs>
          <la-area fill-color="url(#area-fill)" dot curve prop="pv"></la-area>
          <la-x-axis prop="name" :nbTicks="3"></la-x-axis>
       </la-cartesian>
    </template>-->
  </div>
</template>

<script>
import cloudSvg from "../assets/cloud.svg";
import rainingSvg from "../assets/raining.svg";
import sunSvg from "../assets/sun.svg";
import weatherSvg from "../assets/weather.svg";
import thunderstormSvg from "../assets/thunderstorm.svg";
import snowSvg from "../assets/snow.svg";
import fogSvg from "../assets/fog.svg";
import { Cartesian, Area } from "laue";
export default {
  props: [
    "weather",
    "pressure",
    "humidity",
    "sunrise",
    "sunset",
    "temperature",
    "hourly",
  ],
  components: {
    LaCartesian: Cartesian,
    LaArea: Area,
    cloudSvg,
    rainingSvg,
    sunSvg,
    weatherSvg,
    thunderstormSvg,
    snowSvg,
    fogSvg,
  },
  updated() {
    console.log(this.hourly, "Updated");
  },
  mounted() {
    console.log(this.hourly, "Created");
  },
  data: () => ({
    values: [
      { name: "12 am", pv: 32 },
      { name: "1 am", pv: 31 },
      { name: "2 am", pv: 30 },
      { name: "3 am", pv: 30 },
      { name: "4 am", pv: 30 },
      { name: "5 am", pv: 30 },
      { name: "6 am", pv: 30 },
    ],
    bell: [
      { name: "6 am", pv: -3 },
      { name: "1 pm", pv: 3 },
      { name: "8 pm", pv: -3 },
    ],
  })
};
</script>

<style scoped>
.card {
  width: 96%;
  margin: auto;
  height: 65%;
  border: 2px solid white;
  border-radius: 7px;
  box-sizing: border-box;
  box-shadow: grey 0px 1px 5px;
  top: 0;
  left: 0;
  margin-top: 10px;
  position: relative;
  padding: 10px;
  margin-bottom: 8px;
}
.infoCards {
  /* margin-top: 102px; */
  width: 100%;
  /* margin: auto; */
  display: flex;
  align-items: center;
  /* position: relative; */
  /* top: 0; */
  justify-content: center;
}
.infoCards div {
  font-size: initial;
  font-weight: bold;
  box-sizing: border-box;
  box-shadow: 0px 0px 2px lightskyblue;
  background: aliceblue;
  display: grid;
  padding: 5px;
  width: 30%;
  margin: 0 10px;
}
/* .vtc {
    transform: scale(0.8, 0.4);
    position: absolute;
    top: -4%;
    left: 5%;
} */
.temperature {
  display: inline-block;
  margin-left: 30px;
  vertical-align: middle;
}
.svgIcon {
  height: 81px;
  width: 44px;
  display: inline-block;
  margin-left: 20px;
  vertical-align: middle;
}
.vtc.curve .stroke {
  stroke: blue;
}
.daylight {
  margin: auto 5px;
}
.sunCards{
    display: flex;
    margin: 0px -13px;
    justify-content: space-between;
    padding: 0 35px;
    font-size: unset;
    font-weight: bold;
}
.sunCards div{
  display: grid;
  text-align: left;
}

@media screen and ( min-height: 600px ) {
.daylight {
  margin: 48px 10px;
}
.sunCards {
  margin: 37px 0px;
}
.card {
  margin-top: 33px;
}
.infoCards {
  margin-top: 25px;
}
}
</style>