let arr = [10, 20, 30, 40];

const container = document.getElementById("arrayContainer");

const logArea = document.getElementById("logArea");

render();

function render() {
  container.innerHTML = "";

  arr.forEach((item, index) => {
    let div = document.createElement("div");

    div.className = "array-item";

    div.innerHTML = item;

    div.dataset.index = index;

    container.appendChild(div);
  });
}

function log(text, type) {
  let div = document.createElement("div");

  div.className = "step";

    if(type === "error"){
    div.style.background = "#ff4d4d";
    }
    else if(type === "success"){
    div.style.background = "#28a745";
    }
    else if(type === "prosses"){
    div.style.background = "#007bff";
    }

  div.innerHTML = text;

  logArea.prepend(div);
}

function resetArray() {
  arr = [10, 20, 30, 40];

  logArea.innerHTML = "";

  render();
}

function insertFirst() {
  let value = parseInt(valueInput.value);

  if (isNaN(value)) {
    log("الرجاء إدخال قيمة صحيحة.", "error");
    return;
  }

  //   arr.unshift(value);

  for (let i = arr.length; i > 0; --i) {
    arr[i] = arr[i - 1];
  }
  arr[0] = value;

  render();

  container.firstChild.classList.add("insert");

  log("تمت إضافة العنصر في بداية المصفوفة", "success");
}

function insertMiddle() {
  let value = parseInt(valueInput.value);

  let index = parseInt(indexInput.value);

  if (isNaN(value)) {
    log("الرجاء إدخال قيمة صحيحة." , "error");
    return;
  }

  if (isNaN(index)) {
    log("الرجاء إدخال فهرس." , "error");
    return;
  }

  if (index < 0 || index > arr.length) {
    log("الفهرس خارج حدود المصفوفة." , "error");
    return;
  }

  //   arr.splice(index, 0, value);

  for (let i = arr.length; i > index; --i) {
    arr[i] = arr[i - 1];
  }

  arr[index] = value;

  render();

  container.children[index].classList.add("insert");

  log("تمت إضافة العنصر عند الفهرس " + index , "success");
}

function insertLast() {
  let value = parseInt(valueInput.value);

  if (isNaN(value)) {
    log("الرجاء إدخال قيمة صحيحة." , "error");
    return;
  }

  //   arr.push(value);

  arr[arr.length] = value;

  render();

  container.lastChild.classList.add("insert");

  log("تمت إضافة العنصر في نهاية المصفوفة" , "success");
}

function deleteFirst() {
  if (arr.length === 0) {
    log("لا يمكن الحذف، المصفوفة فارغة." , "error");
    return;
  }

  //   arr.shift();

  for (let i = 0; i < arr.length - 1; ++i) {
    arr[i] = arr[i + 1];
  }
  arr.length--;
  render();

  log("تم حذف أول عنصر" , "success");
}

function deleteMiddle() {
  let index = parseInt(indexInput.value);

  if (index < 0 || index >= arr.length) {
    log("الفهرس خارج حدود المصفوفة." , "error");
    return;
  }

  if (arr.length === 0) {
    log(" المصفوفة فارغة." , "error");
    return;
  }

  if (isNaN(index)) {
    log("الرجاء إدخال فهرس." , "error");
    return;
  }

  //   arr.splice(index, 1);

  for (let i = index; i < arr.length - 1; ++i) {
    arr[i] = arr[i + 1];
  }
  arr.length--;

  render();

  log("تم حذف العنصر عند الفهرس " + index , "success");
}

function deleteLast() {
  if (arr.length === 0) {
    log("لا يمكن الحذف، المصفوفة فارغة." , "error");
    return;
  }

  //   arr.pop();

  arr.length--;
  render();

  log("تم حذف آخر عنصر" , "success");
}

async function linearSearch() {
  let value = parseInt(valueInput.value);

  if (arr.length === 0) {
    log("لا يمكن البحث، المصفوفة فارغة." , "error");
    return;
  }

  if (isNaN(value)) {
    log("الرجاء إدخال قيمة للبحث." , "error");
    return;
  }
  
  let items = document.querySelectorAll(".array-item");

  for (let i = 0; i < arr.length; i++) {
    items[i].classList.add("highlight");

    log("فحص العنصر " + arr[i] , "prosses");

    await sleep(800);

    if (arr[i] === value) {
      items[i].classList.remove("highlight");

      items[i].classList.add("found");

      log(`تم العثور على العنصر ${value} عند الفهرس ${i}` , "success");

      return;
    }

    items[i].classList.remove("highlight");
  }

  log("العنصر غير موجود" , "error");
}

async function binarySearch() {
  arr.sort((a, b) => a - b);

  render();

  let value = parseInt(valueInput.value);

  let low = 0;

  let high = arr.length - 1;

  if (arr.length === 0) {
    log("لا يمكن البحث، المصفوفة فارغة." , "error");
    return;
  }

  if (isNaN(value)) {
    log("الرجاء إدخال قيمة للبحث." , "error");
    return;
  }

  while (low <= high) {
    let items = document.querySelectorAll(".array-item");

    let mid = Math.floor((low + high) / 2);

    items[mid].classList.add("highlight");

    log("فحص العنصر " + arr[mid] , "prosses");

    await sleep(1000);

    if (arr[mid] === value) {
      items[mid].classList.remove("highlight");

      items[mid].classList.add("found");

      log("تم العثور على العنصر" , "success");

      return;
    }

    if (arr[mid] < value) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }

    items[mid].classList.remove("highlight");
  }

  log("العنصر غير موجود" , "error");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
