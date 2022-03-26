const gridBox = document.getElementById("display-grid");
const pageTitleEl = document.getElementById("page-title-display");

const numbRows = 16;

// initiating grid
const grid = GridStack.init(
  {
    acceptWidgets: true,
    alwaysShowResizeHandle:
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
    margin: ".5rem",
    oneColumnModeDomSort: false,
    row: numbRows,
    minWidth: 0,
    float: true,
  },
  "#display-grid"
);

const pageTitle = "The Best Page in the World";
const widgets = [
  {
    w: 6,
    h: 2,
    x: 3,
    y: 0,
    content: '<div class="title display-only">Title</div>',
    noResize: true,
    noMove: true,
    locked: true,
  },
  {
    w: 3,
    h: 4,
    x: 6,
    y: 3,
    content: '<div class="img display-only">Img</div>',
    noResize: true,
    noMove: true,
    locked: true,
  },
  {
    w: 2,
    h: 2,
    x: 2,
    y: 4,
    content: '<div class="our-text display-only">Text</div>',
    noResize: true,
    noMove: true,
    locked: true,
  },
  {
    x: 3,
    y: 15,
    w: 6,
    h: 1,
    noResize: true,
    noMove: true,
    locked: true,
    content: '<div class="signature display-only">Made using jakl</div>',
  },
];

// widgets = fetch

function gridResize() {
  grid.cellHeight(gridBox.offsetHeight / numbRows);
}

function init() {
  pageTitleEl.innerHTML = pageTitle;
  grid.load(widgets);
  gridResize();
}

init();

// resizes grid so that the height of the grid stays in view
window.addEventListener("resize", gridResize);
