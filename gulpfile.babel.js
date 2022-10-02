// Module
import { deleteAsync } from "del";
import Gulp from "gulp";
import GulpPug from "gulp-pug";
import GulpSass from "gulp-sass";
import NodeSass from "sass";
import GulpAutoprefixer from "gulp-autoprefixer";
import GulpCsso from "gulp-csso";
import GulpImage from "gulp-image";
import GulpWebp from "gulp-webp";
import GulpWebserver from "gulp-webserver";
import GulpGHPage from "gulp-gh-pages";

// Compiler
const Sass = GulpSass(NodeSass);

// Routes
const routes = {
  publish: "assignment11/build/**/*",
  server: "assignment11/build/",
  del: ["assignment11/build", ".publish"],
  img: {
    watch: "assignment11/src/img/**/*.{jpg,png,gif,bmp,webp,svg,ai}",
    src: "assignment11/src/img/*.{jpg,png,gif,bmp,webp,svg,ai}",
    dest: "assignment11/build/img/",
  },
  scss: {
    watch: "assignment11/src/scss/**/*.scss",
    src: "assignment11/src/scss/style.scss",
    dest: "assignment11/build/css/",
  },
  pug: {
    watch: "assignment11/src/**/*.pug",
    src: "assignment11/src/index.pug",
    dest: "assignment11/build/",
  },
};

// Task
const GHPage = () => Gulp.src(routes.publish).pipe(GulpGHPage());
const Watch = () => {
  Gulp.watch(routes.img.watch, Webp);
  Gulp.watch(routes.img.watch, Image);
  Gulp.watch(routes.scss.watch, Scss);
  Gulp.watch(routes.pug.watch, Pug);
};
const Webserver = () =>
  Gulp.src(routes.server).pipe(GulpWebserver({ livereload: true, open: true }));
const Delete = () => deleteAsync(routes.del);
const Webp = () =>
  Gulp.src(routes.img.src).pipe(GulpWebp()).pipe(Gulp.dest(routes.img.dest));
const Image = () =>
  Gulp.src(routes.img.src).pipe(GulpImage()).pipe(Gulp.dest(routes.img.dest));
const Scss = () =>
  Gulp.src(routes.scss.src)
    .pipe(Sass().on("Error", Sass.logError))
    .pipe(GulpAutoprefixer())
    .pipe(GulpCsso())
    .pipe(Gulp.dest(routes.scss.dest));
const Pug = () =>
  Gulp.src(routes.pug.src).pipe(GulpPug()).pipe(Gulp.dest(routes.pug.dest));

// Gulp cli
const prepare = Gulp.series([Delete, Image, Webp]);
const assets = Gulp.series([Pug, Scss]);
const postDev = Gulp.parallel([Webserver, Watch]);

export const build = Gulp.series([prepare, assets]);
export const dev = Gulp.series([build, postDev]);
export const deploy = Gulp.series([build, GHPage, Delete]);
