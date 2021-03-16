// import Main from "../views/Main.vue";
import Main from "../App.vue";
import Page1 from "../views/Page1.vue";
import Page2 from "../views/Page2.vue";
import Links from "../views/Links.vue";
import Root from "../views/Root.vue";

export default [
  {
    path: "/schedular/",
    name: "entry",
    component: Main,
    children: [
      { path: "p1", name: "pag1", component: Page1 },
      { path: "p2", name: "pag2", component: Page2 },
      { path: "links", name: "links", component: Links },
      { path: "root", name: "root", component: Root }
    ]
  }
];
