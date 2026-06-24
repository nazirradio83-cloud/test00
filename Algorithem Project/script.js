let arr = [10,20,30,40];

const container = document.getElementById("arrayContainer");
const logBox = document.getElementById("log");

render();

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

function render(){

    container.innerHTML="";

    arr.forEach((item,index)=>{

        let div=document.createElement("div");

        div.className="array-item";
        div.innerHTML=item;

        container.appendChild(div);

    });

}

function log(text){
    logBox.innerHTML=text;
}

async function insertFirst(){

    let value=parseInt(
        document.getElementById("valueInput").value
    );

    if(isNaN(value)) return;

    log("1️⃣ إنشاء خانة جديدة بالبداية");

    arr.unshift(value);

    render();

    container.firstChild.classList.add("insert-animation");

    await sleep(700);

    log(`
    2️⃣ تم تحريك جميع العناصر خطوة لليمين<br>
    3️⃣ أُضيف العنصر الجديد في الفهرس 0
    `);
}

async function insertLast(){

    let value=parseInt(
        document.getElementById("valueInput").value
    );

    if(isNaN(value)) return;

    log("إضافة عنصر في آخر المصفوفة");

    arr.push(value);

    render();

    container.lastChild.classList.add("insert-animation");

    await sleep(700);

    log("تمت الإضافة في آخر موقع.");
}

async function insertMiddle(){

    let value=parseInt(
        document.getElementById("valueInput").value
    );

    let index=parseInt(
        document.getElementById("indexInput").value
    );

    if(isNaN(value) || isNaN(index)) return;

    log(`
    1️⃣ تحريك العناصر بدءاً من الفهرس ${index}
    نحو اليمين
    `);

    arr.splice(index,0,value);

    render();

    container.children[index]
        .classList.add("insert-animation");

    await sleep(700);

    log(`
    2️⃣ تم إنشاء فراغ جديد<br>
    3️⃣ إدراج العنصر بالقيمة ${value}
    `);
}

async function deleteFirst(){

    if(arr.length===0) return;

    log("1️⃣ حذف أول عنصر");

    container.firstChild
        .classList.add("delete-animation");

    await sleep(700);

    arr.shift();

    render();

    log(`
    2️⃣ تحريك جميع العناصر لليسار<br>
    3️⃣ أصبح العنصر التالي في البداية
    `);
}

async function deleteLast(){

    if(arr.length===0) return;

    log("حذف آخر عنصر");

    container.lastChild
        .classList.add("delete-animation");

    await sleep(700);

    arr.pop();

    render();

    log("تم حذف آخر عنصر.");
}

async function deleteMiddle(){

    let index=parseInt(
        document.getElementById("indexInput").value
    );

    if(isNaN(index)) return;

    if(index<0 || index>=arr.length)
        return;

    log(`
    1️⃣ حذف العنصر عند الفهرس ${index}
    `);

    container.children[index]
        .classList.add("delete-animation");

    await sleep(700);

    arr.splice(index,1);

    render();

    log(`
    2️⃣ تم إغلاق الفراغ الناتج<br>
    3️⃣ تحركت العناصر لليسار
    `);
}

function resetArray(){

    arr=[10,20,30,40];

    render();

    log("تمت إعادة ضبط المصفوفة.");
}