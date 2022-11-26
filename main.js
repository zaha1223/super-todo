const form = document.querySelector(".form");
const input = document.querySelector(".input");
const list = document.querySelector(".list");
//====================================================
{
  //     <li class ="item">
  //     <p>text</p>
  //     <div>
  //         <button class="edit">Edit</button>
  //         <button class="del">Delete</button>
  //     </div>
  // </li>
}

const data = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { value } = input;
  if (value) {
    data.push({ text: input.value, id: Math.round(Math.random() * 1000) });
    input.value = "";
    render(data);
  }
});

// list.addEventListener("click", (e) => {
//     const { target } = e;
//     // if(target.className === "del"){
//     //   let id = e.target.parentElement.parentElement.id;
//     //     for(let i = 0; i < data.length; i++){
//     //         if (data[i].id === +id){
//     //             data.splice(i, 1);
//     //         };
//     //     };
//     //     render(data);
//     // }
//      if(target.className === "edit"){
//         let id = e.target.parentElement.parentElement.id;

//         let newText = prompt("Text", editText(id));
//         editText(id,newText)
//         render(data);
//     }
// });

function editText(id, text) {
  for (let i of data) {
    if (i.id === +id) {
      if (!text) {
        return i.text;
      }
      i.text = text;
    }
    changeText(i);
  }
}

function render(arr) {
  list.innerHTML = "";
  data.forEach((el) => {
    let elLi = document.createElement("li");
    elLi.className = "item";
    elLi.id = el.id;
    elLi.innerHTML = `
        <p>${el.text}</p>
        <div>
            <button onclick="edit(${elLi.id})" class="edit">Edit</button>
            <button onclick="del(${elLi.id})" class="del">Delete</button>
        </div>`;
    list.prepend(elLi);
  });
}

const del = (id) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === +id) {
      data.splice(i, 1);
    }
  }
  render(data);
};

const elBtn = document.querySelector(".change-btn");
const elInpt = document.querySelector(".change-inpt");
const elCloseBtn = document.querySelector(".close");
const elModal = document.querySelector(".modal");

const elForm2 = document.querySelector(".form2");

const edit = (id) => {
  elModal.classList.add("open");
  change(id);
};

function change(id) {
  elBtn.addEventListener("click", (e) => {
    e.preventDefault();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === +id) {
        if (elInpt.value) {
          data[i].text = elInpt.value;
        }
      }
    }
    elInpt.value = "";
    render(data);
    elModal.classList.remove("open");
  });
}

elCloseBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  elModal.classList.remove("open");
});
