import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const url = process.env.VUE_APP_URL;
const headers = {
  Accept: "application/json",
  Authorization: process.env.VUE_APP_TOKEN,
};

export default new Vuex.Store({
  state: {
    artists: [],
    songs: [],
  },
  mutations: {
    setArtists(state, payload) {
      state.artists = payload;
    },
    setSongs(state, payload) {
      state.songs = [...state.songs, payload];
    },
    clearSongs(state) {
      state.songs = [];
    },
  },
  getters: {
    getArtists: (state) => state.artists,
    getSongs: (state) => state.songs,
  },
  actions: {
    getArtists(state) {
      fetch(url + "artists?_page=1&_sort=name&_order=asc", {
        headers,
      })
        .then((artistsResp) => {
          return artistsResp.json();
        })
        .then((artists) => {
          state.commit("setArtists", artists);
        });
    },
    async getAlbums(state, data) {
      fetch(
        url + `albums?artist_id=${data.artistId}&_page=1&_sort=id&_order=asc`,
        {
          headers,
        }
      )
        .then((albumsResp) => {
          return albumsResp.json();
        })
        .then((albums) => {
          state.commit("clearSongs");
          albums.forEach(async (album) => {
            fetch(url + `songs?album_id=${album.id}`, {
              headers,
            })
              .then((songsResp) => {
                return songsResp.json();
              })
              .then((songs) => {
                songs.map((song) => {
                  song.artist_name = data.artistName;
                  song.album_name = album.name;
                  song.year_released = album.year_released;
                  state.commit("setSongs", song);
                });
              });
          });
        });
    },
    clearSongs(state) {
      state.commit("clearSongs");
    },
  },
});
