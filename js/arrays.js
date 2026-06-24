let arr = [10,20,30,40];

const container =
document.getElementById("arrayContainer");

const logArea =
document.getElementById("logArea");

render();

function render(){

    container.innerHTML="";

    arr.forEach((item,index)=>{

        let div=document.createElement("div");

        div.className="array-item";

        div.innerHTML=item;

        div.dataset.index=index;

        container.appendChild(div);

    });
}

function log(text){

    let div=document.createElement("div");

    div.className="step";

    div.innerHTML=text;

    logArea.prepend(div);
}

function resetArray(){

    arr=[10,20,30,40];

    logArea.innerHTML="";

    render();
}

function insertFirst(){

    let value=
    parseInt(valueInput.value);

    if(isNaN(value)) return;

    arr.unshift(value);

    render();

    container.firstChild
    .classList.add("insert");

    log("تمت إضافة العنصر في بداية المصفوفة");
}

function insertMiddle(){

    let value=
    parseInt(valueInput.value);

    let index=
    parseInt(indexInput.value);

    if(isNaN(value)||isNaN(index))
        return;

    arr.splice(index,0,value);

    render();

    container.children[index]
    .classList.add("insert");

    log(
        "تمت إضافة العنصر عند الفهرس "
        +index
    );
}

function insertLast(){

    let value=
    parseInt(valueInput.value);

    if(isNaN(value)) return;

    arr.push(value);

    render();

    container.lastChild
    .classList.add("insert");

    log("تمت إضافة العنصر في نهاية المصفوفة");
}

function deleteFirst(){

    if(arr.length===0) return;

    arr.shift();

    render();

    log("تم حذف أول عنصر");
}

function deleteMiddle(){

    let index=
    parseInt(indexInput.value);

    if(isNaN(index)) return;

    arr.splice(index,1);

    render();

    log(
        "تم حذف العنصر عند الفهرس "
        +index
    );
}

function deleteLast(){

    arr.pop();

    render();

    log("تم حذف آخر عنصر");
}

async function linearSearch(){

    let value=
    parseInt(valueInput.value);

    if(isNaN(value)) return;

    let items=
    document.querySelectorAll(".array-item");

    for(let i=0;i<arr.length;i++){

        items[i].classList.add("highlight");

        log(
            "فحص العنصر "
            +arr[i]
        );

        await sleep(800);

        if(arr[i]===value){

            items[i].classList.remove(
                "highlight"
            );

            items[i].classList.add(
                "found"
            );

            log(
                "تم العثور على العنصر عند الفهرس "
                +i
            );

            return;
        }

        items[i].classList.remove(
            "highlight"
        );
    }

    log("العنصر غير موجود");
}

async function binarySearch(){

    arr.sort((a,b)=>a-b);

    render();

    let value=
    parseInt(valueInput.value);

    let low=0;

    let high=arr.length-1;

    while(low<=high){

        let items=
        document.querySelectorAll(".array-item");

        let mid=
        Math.floor(
            (low+high)/2
        );

        items[mid]
        .classList.add("highlight");

        log(
            "فحص العنصر "
            +arr[mid]
        );

        await sleep(1000);

        if(arr[mid]===value){

            items[mid]
            .classList.remove("highlight");

            items[mid]
            .classList.add("found");

            log(
                "تم العثور على العنصر"
            );

            return;
        }

        if(arr[mid]<value){

            low=mid+1;

        }else{

            high=mid-1;
        }

        items[mid]
        .classList.remove("highlight");
    }

    log("العنصر غير موجود");
}

function sleep(ms){

    return new Promise(
        resolve=>setTimeout(resolve,ms)
    );
}