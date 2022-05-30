import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
  theme: {
    themes: {
      light: {
        primary: "#021F37",
        secondary: "#6ACADD",
        error: "#e3342f",
        success: "#39c171",
        warning: "#FF5621",
      },
    },
  },
  icons: {
    iconfont: "mdiSvg",
  },
};

export default new Vuetify(opts);
