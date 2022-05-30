<template>
  <div class="hello">
    <v-app id="inspire">
      <v-main class="grey lighten-3">
        <v-container>
          <h1>Music Media 2.0</h1>
          <h2 class="mt-5">Top Artist</h2>

          <v-row>
            <v-col
              lg="2"
              md="4"
              sm="6"
              v-for="(artist, index) in artists"
              :key="index"
            >
              <v-card
                class="mt-5 d-flex justify-center align-center"
                height="100"
                @click="getAlbums(artist.id, artist.name)"
              >
                <v-card-title>
                  {{ artist.name }}
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col v-if="artist_name != ''">
              <h2 class="mt-5">{{ artist_name }}</h2>

              <v-data-table
                :headers="headers"
                :items="songs"
                :page.sync="page"
                :items-per-page="10"
                hide-default-footer
                class="elevation-2 mt-5"
                @page-count="pageCount = $event"
              >
              </v-data-table>
              <div class="text-center pt-2">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <!-- <div class="mt-5" v-if="songs != songs.lenght > 0">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <table class="table table-bordered">
                <thead class="table-light">
                  <tr>
                    <th scope="col">Artist Name</th>
                    <th scope="col">Album Name</th>
                    <th scope="col">Year Released</th>
                    <th scope="col">Song Track #</th>
                    <th scope="col">Song Name</th>
                  </tr>
                </thead>
                <tr v-for="(song, index) in songs" :key="index">
                  <td>{{ song.artist_name }}</td>
                  <td>{{ song.album_name }}</td>
                  <td>{{ song.year_released }}</td>
                  <td>{{ song.track }}</td>
                  <td>{{ song.name }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div> -->
    </v-app>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    artist_name: "",
    page: 1,
    pageCount: 0,
    headers: [
      { text: "Artist Name", value: "artist_name" },
      { text: "Album Name", value: "album_name" },
      { text: "Year Released", value: "year_released" },
      { text: "Song Track", value: "track" },
      { text: "Song Name", value: "name" },
    ],
  }),
  computed: {
    artists() {
      return this.$store.getters.getArtists;
    },
    songs() {
      return this.$store.getters.getSongs;
    },
  },
  mounted() {
    this.$store.dispatch("getArtists");
  },
  methods: {
    getAlbums(artistId, artistName) {
      this.artist_name = artistName;
      let data = { artistId, artistName };
      this.$store.dispatch("getAlbums", data);
    },
  },
};
</script>

<style></style>
