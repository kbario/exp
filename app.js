// global vars
const save = document.getElementById("save");
const clear = document.getElementById("clear");
const plusBtn = document.getElementById("plus-btn");
const dragMenu = document.getElementById("drag-menu");
const btnPanel = document.getElementById("button-panel");
const bin = document.getElementById("bin");
const pageTitleInput = document.getElementById("page-title-input");
const gridBox = document.getElementById("first-grid");

const numbRows = 16;

let isMobileMenuOpen = false;

// functions used to reformat widget data upon save
// set widget settings to true to disallow their resize and drag
function setSettingsToTrue(widgetData) {
  const updatedWidgetData = widgetData.map((item) => {
    (item.noResize = true), (item.noMove = true), (item.locked = true);
    return item;
  });
  return updatedWidgetData;
}

// update class so that it is display only also
function updateClass(objs) {
  const updatedWidgetData = objs.map((item) => {
    const regE = /class="[^]+"/.exec(item.content)[0].slice(7, -1);
    if (
      regE === "title" ||
      regE === "our-text" ||
      regE === "img" ||
      regE === "signature"
    ) {
      const classes = `class="${regE} display-only"`;
      const regex = new RegExp('class="[^]+"', "g");
      item.content = item.content.replace(regex, classes);
      return item;
    }
  });
  return updatedWidgetData;
}

// remove any formatting other than the div and classes
function reformatContent(objs) {
  const updatedWidgetData = objs.map((item) => {
    const regex = new RegExp('<div class="[^]+">[^]+</div>', "g");
    item.content = regex.exec(item.content)[0];
    return item;
  });
  return updatedWidgetData;
}

// combine the above three functions
function formatWidgets(widgets) {
  const data = setSettingsToTrue(widgets);
  const data2 = updateClass(data);
  const data3 = reformatContent(data2);
  return data3;
}

// save button function
save.addEventListener("click", () => {
  const widgetData = grid.save();

  const pageTitle = pageTitleInput.value.trim();

  if (widgetData.length === 1) {
    alert("please add a widget to the page");
  } else if (pageTitle === "") {
    alert("please fill in the title header");
  } else {
    const newWidgetData = formatWidgets(widgetData);
    console.log(newWidgetData);
    // fetch('api/pages/', () => {
    //   method = 'POST',
    // page = pageTitle
    // });
  }
});

// clear grid button function
clear.addEventListener("click", () => {
  grid.removeAll();
  grid.load(pageSignature);
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
  const myText = prompt("What do you want this box to say?");
  if (myText) {
    e.target.parentNode.parentNode.children[0].children[0].textContent = myText;
  }
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
      title: "edit",
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
    title: "delete",
  });
  deleteBtn.innerHTML = "X";

  // add delete btn to Btns
  Btns.appendChild(deleteBtn);

  return Btns;
}

const gridOptions = {
  acceptWidgets: true,
  alwaysShowResizeHandle:
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
  animate: true,
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
  oneColumnModeDomSort: false,
  row: numbRows,
  resizable: {
    handles: "all",
  },
  minWidth: 0,
  float: true,
};

const pageSignature = [
  {
    x: 3,
    y: 15,
    w: 6,
    h: 1,
    noResize: true,
    noMove: true,
    locked: true,
    content: '<div class="signature">Made using jakl</div>',
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

// grid.load(defaultWidgets);

const grid = GridStack.init(gridOptions, "#first-grid");

function gridResize() {
  grid.cellHeight(gridBox.offsetHeight / numbRows);
}

function init() {
  grid.load(pageSignature);
  // grid.load(defaultWidgets);
  gridResize();
}

init();

// when a title, text or img element is added, functional buttons are added to delete and update their content
grid.on("dropped", function (event, previousWidget, newWidget) {
  const Btns = createBtns(newWidget.el.children[0].textContent.trim());
  newWidget.el.children[0].parentNode.appendChild(Btns);
  toggleMobileMenu();
});

// move bin into view while dragging
grid.on("dragstart", (e, el) => {
  if (document.body.offsetWidth < 640) {
    bin.classList.toggle("hidden");
    bin.classList.toggle("flex");
    btnPanel.classList.toggle("hidden");
    btnPanel.classList.toggle("flex");
  }
});

// remove bin from view when drag done
grid.on("dragstop", (e, el) => {
  if (document.body.offsetWidth < 640) {
    bin.classList.toggle("hidden");
    bin.classList.toggle("flex");
    btnPanel.classList.toggle("hidden");
    btnPanel.classList.toggle("flex");
  }
});

// resizes grid so that the height of the grid stays in view
window.addEventListener("resize", gridResize);

// lezgo
