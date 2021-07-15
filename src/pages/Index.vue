<template>

  <q-page class="flex flex-center page-container">
    <q-google-map :center="{lat: center.lat, lng: center.lng}" :style="{width: '100%', height: '100%'}" :options="mapOptions" :zoom="zoom">
      <q-google-map-marker :draggable="false" :icon="locationSVG" :position="center">
      </q-google-map-marker>
      <q-google-map-marker v-for="m in hubs" v-bind:key="m.id" @click="clickMarker(m)"  :draggable="false" 
      :clickable="true" :position="m.position" :icon="hubIcon(m)" :label="hubLabel(m)">
      </q-google-map-marker>
    </q-google-map>

    <q-list bordered separator class="hub-list border-down">
      <q-item-label header bordered separator class="text-bold text-dark">
        Hubs Near You
      </q-item-label>

      <q-item clickable tag="a" class="text-grey-7" target="_blank" v-for="(hub) in filterHubs" v-bind:key="hub.id">
        <div class="hub-item">
          <q-item-label>{{ hub.name }}</q-item-label>
          <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
            <g>
              <title>transparent</title>
              <ellipse stroke-width="4" ry="15" rx="15" cy="20" cx="20" stroke="#ffffff" fill="#c18c30" />
              <text transform="matrix(1 0 0 1 0 0)" xml:space="preserve" text-anchor="start" font-family="Open Sans"
              font-size="18" y="27" x="14" stroke-width="0" fill="#ffffff">
                {{hub.marker_text}}
              </text>
            </g>
          </svg>
        </div>
      </q-item>
    </q-list>
  </q-page>

</template>

<script>
  import hubsJson from '../assets/hubs.json';
  import axios from "axios";
  import locationSVG from '../assets/location.svg';
  import markerSVG from '../assets/marker.svg';

  export default {
    name: 'IndexPage',
    data() {
      return {
        inner_height: 0,
        center: {
          lat: 1.355366,
          lng: 103.837341
        },
        zoom: 16,
        mapOptions: {
          zoomControl: false,
          mapTypeControl: false,
          fullscreen: false,
          streetViewControl: false,
        },
        selectedHub: null,
        hubs: hubsJson['data'],
        locationSVG: locationSVG
      }
    },
    created() {
      this.inner_height = window.innerHeight - 100;
    },
    async mounted() {
      this.getCurrentPos();
    },
    computed: {
      filterHubs() {
        if (this.selectedHub) {
          return this.hubs.filter(item => item.id !== this.selectedHub.id);
        }
        return this.hubs;
      },
    },
    methods: {
      getCurrentPos() {

        navigator.geolocation.getCurrentPosition(
          position => {
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            this.updateHubData();
          },
          error => {
            console.log(error.message);
          },
        );
        
      },
      clickMarker(marker) {

        if (this.selectedHub && this.selectedHub.id === marker.id) {
          this.selectedHub = null;
        } else {
          this.selectedHub = marker;
        }

      },
      async getHubLatLng(address) {

        try {
          var { data } = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDNZb6inpHw_DSLMyDlYeC0YrDB9gqXJt4`
          );
          return data.results[0].geometry.location;
        } catch (error) {
          console.log('error = ', error);
          return null;
        }

      },
      async updateHubData() {

        for (let i = 0; i < this.hubs.length; i++) {
          const hubitem = this.hubs[i];
          hubitem.position = await this.getHubLatLng(hubitem.name);
          hubitem.distance = 0;
          if (hubitem.position) {
            hubitem.distance = Math.pow(hubitem.position.lat - this.center.lat, 2) + Math.pow(hubitem.position.lng - this.center.lng, 2);
          }
          this.hubs[i] = hubitem;
        }

        this.hubs.sort((a, b) => {
          return a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0;
        });

        for (let i = 0; i < this.hubs.length; i++) {
          this.hubs[i].marker_text = this.hubText(i);
        }
      },

      hubText(index) {
        return String.fromCharCode(65 + index);
      },

      hubIcon(marker) {
        if (this.selectedHub && this.selectedHub.id === marker.id) {
          return null;
        }
        return markerSVG;
      },

      hubLabel(marker) {
        if (this.selectedHub && this.selectedHub.id === marker.id) {
          return null;
        }
        return {
          text: marker.marker_text ?? '',
          color: 'white',
          fontSize: '14px',
        }
      }
    }
  }
</script>
<style>
  .vue-map-container {
    position: initial !important;
  }

  .hub-list {
    position: absolute;
    width: 300px;
    right: 0;
    bottom: 0;
    top: 0;
    background: white;
    overflow-y: scroll;
    border-left: 1px solid gray;
  }
  
  .hub-item {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-bottom: 10px;
    padding-top: 10px;
    justify-content: space-between;
    align-items: center;
  }

  @media only screen and (max-width: 600px) {
    .hub-list {
      width: initial;
      bottom: 0;
      left: 0;
      top: initial;
      right: 0;
      height: 180px;
      border-top: 1px solid gray;
      border-left: 0;
    }
  }
</style>
