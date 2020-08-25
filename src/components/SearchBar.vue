<template>
    <div id="search">
        <form>
            <div class="searchBar">
                <input type="text">
                <i>
                    <img class="pin" :src="gpsSvg">
                    <img class="search" :src="search">
                </i>
            </div>
        </form>
    </div>
</template>
<script>
import gpsSvg from '../assets/gps.svg';
import search from '../assets/search.svg';
export default {
    data() {
        return {
            gpsSvg,
            search
        }
    }
}
</script>
<style scoped>
.searchBar{
    box-shadow: grey 0px 0px 3px 0px;
    width: -webkit-fill-available;
    height: 39px;
    border-radius: 6px;
    border: white;
}
.pin {
    width: 18px;
    height: 70px;
    position: absolute;
    top: -7px;
    left: 16px;
}
.search {
    width: 18px;
    height: 70px;
    position: absolute;
    top: -7px;
    right: 16px;
}
</style>