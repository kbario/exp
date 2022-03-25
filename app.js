// // global vars
const save = document.getElementById("save");
// const saveMobile = document.getElementById("save-mobile");
const clear = document.getElementById("clear");
// const clearMobile = document.getElementById("clear-mobile");
const load = document.getElementById("load");
const plusBtn = document.getElementById("plus-btn");
const dragMenu = document.getElementById("drag-menu");
const bin = document.getElementById("bin");

let isMobileMenuOpen = false;

// save button function
save.addEventListener("click", () => {
  const widgetData = grid.save();
  console.log(widgetData);
  return widgetData;
});

// clear grid button function
clear.addEventListener("click", () => {
  grid.removeAll();
  grid.load(pageSignature);
});

// load saved data button function
load.addEventListener("click", (widgetsbusiness) => {
  grid.load(widgetsbusiness);
});

function toggleMobileMenu() {
  isMobileMenuOpen = !isMobileMenuOpen;
  plusBtn.children[0].classList.toggle("-rotate-45");
  plusBtn.children[1].classList.toggle("rotate-45");
  dragMenu.classList.toggle("translate-x-full");
  dragMenu.classList.toggle("-translate-x-0");
  plusBtn.classList.toggle("bg-green-300");
  plusBtn.classList.toggle("bg-rose-400");
}

// toggle mobile view item add menu
plusBtn.addEventListener("click", toggleMobileMenu);

// function to add multiple attrs at once
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function editTextOfDropBox(e) {
  //   console.log(e.target.parentNode.parentNode.children[0].children[0]);
  const myText = prompt("What do you want this box to say?");
  if (myText) {
    e.target.parentNode.parentNode.children[0].children[0].textContent = myText;
  }
  //   e.target.parentNode.children[0].textContent = myText;
}

// creates edit and delete buttons
function createBtns(elType) {
  // create Btns div and set its class
  const Btns = document.createElement("div");
  Btns.setAttribute(
    "class",
    "absolute top-2 right-2 hidden group-hover:flex gap-1"
  );

  //  add edit btn if element is a title or text
  if (elType === "Title" || elType === "Text") {
    // create edit button, set it's class and text content
    const editBtn = document.createElement("button");
    setAttributes(editBtn, {
      class:
        "rounded-sm bg-slate-100 px-2 mt-1 hover:bg-slate-200 active:bg-slate-300",
      onclick: "editTextOfDropBox(event)",
    });
    editBtn.innerHTML = "E";

    Btns.appendChild(editBtn);
  }

  // create delete button, set it's class, onclick and text content
  const deleteBtn = document.createElement("button");
  setAttributes(deleteBtn, {
    class:
      "rounded-sm bg-rose-600 text-white px-2 mt-1 mr-1 hover:bg-rose-500 active:bg-rose-600",
    onclick: "grid.removeWidget(this.parentNode.parentNode)",
  });
  deleteBtn.innerHTML = "X";

  // add delete btn to Btns
  Btns.appendChild(deleteBtn);

  return Btns;
}

// initiating grid
var grid = GridStack.init(
  {
    alwaysShowResizeHandle:
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
    column: 12,
    acceptWidgets: true,
    dragIn: ".newWidget",
    dragInOptions: {
      revert: "invalid",
      scroll: false,
      appendTo: "body",
      helper: "clone",
      handle: ".grid-stack-item-content",
    },
    margin: ".5rem",
    removable: "#bin",
    removeTimeout: 100,
    cellHeight: "3rem",
    row: 16,
    resizable: {
      handles: "n,ne,e,se,s,sw,w,nw",
    },
    minW: 500,
    float: true,
  },
  "#first-grid"
);

const pageSignature = [
  {
    x: 4,
    y: 15,
    w: 4,
    h: 1,
    noResize: true,
    noMove: true,
    locked: true,
    content:
      '<div class="flex justify-center items-center signature h-full">Made using jakl</div>',
  },
];

// const defaultWidgets = [
//   {
//     w: 6,
//     h: 2,
//     x: 3,
//     y: 0,
//     content: "\n            <div>Title</div>\n          ",
//   },
//   {
//     w: 4,
//     h: 14,
//     x: 0,
//     y: 2,
//     content: "\n            <div>Text</div>\n          ",
//   },
//   {
//     x: 4,
//     y: 2,
//     w: 4,
//     h: 13,
//     content: "\n            <div>Text</div>\n          ",
//   },
//   {
//     w: 4,
//     h: 6,
//     x: 8,
//     y: 2,
//     content: "\n            <div>Img</div>\n          ",
//   },
//   {
//     x: 8,
//     y: 8,
//     w: 4,
//     h: 8,
//     content: "\n            <div>Text</div>\n          ",
//   },
//   {
//     x: 4,
//     y: 15,
//     w: 4,
//     h: 1,
//     noResize: true,
//     noMove: true,
//     locked: true,
//     content:
//       '<div class="flex justify-center items-center signature h-full">Made using jakl</div>',
//   },
// ];

grid.load(pageSignature);
// grid.load(defaultWidgets);

// when a title, text or img element is added, functional buttons are added to delete and update their content
grid.on("dropped", function (event, previousWidget, newWidget) {
  //   const Btns = createBtns(newWidget.el.children[0].children[0].textContent);
  const Btns = createBtns(newWidget.el.children[0].textContent.trim());
  //   newWidget.el.children[0].appendChild(Btns);
  console.log(newWidget.el.children[0].parentNode.appendChild(Btns));
  newWidget.el.children[0].parentNode.appendChild(Btns);
  toggleMobileMenu();
  // newWidget.el.children[0].parentNode.children[0].addEventListener(
  //   "dblclick",
  //   (e) => {
  //     console.log("click worked");
  //     if (screen.width <= 500) {
  //       prompt("hello");
  //       e.target.parentNode.children[0].textContent = myText;
  //     }
  //   }
  // );
});

// move bin into view while dragging
grid.on("dragstart", (e, el) => {
  if (screen.width < 640) {
    bin.classList.toggle("-translate-x-20");
    bin.classList.toggle("translate-y-20");
  }
});

// remove bin from view when drag done
grid.on("dragstop", (e, el) => {
  if (screen.width < 640) {
    bin.classList.toggle("-translate-x-20");
    bin.classList.toggle("translate-y-20");
  }
});
