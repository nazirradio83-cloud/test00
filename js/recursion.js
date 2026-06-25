AOS.init();

const visualArea = document.getElementById("visualArea");
const logArea = document.getElementById("logArea");

function addLog(text){

    const div=document.createElement("div");

    div.className="step-item";
    div.innerHTML=text;

    logArea.appendChild(div);
}

function resetPage(){

    visualArea.innerHTML="";
    logArea.innerHTML="";
}

function runAlgorithm(){

    resetPage();

    const type=
        document.getElementById("algorithmSelect").value;

    if(type==="fib"){
        runFibonacci();
    }

    if(type==="gcd"){
        runGCD();
    }

    if(type==="hanoi"){
        runHanoi();
    }
}

function runFibonacci(){

    let n = parseInt(
        document.getElementById("input1").value
    );

    if(isNaN(n)) n = 6;

    let sequence = [];

    function fib(num){

        if(num <= 1) return num;

        return fib(num-1) + fib(num-2);
    }

    addLog("بدء تنفيذ خوارزمية فيبوناتشي");

    for(let i=0;i<=n;i++){

        setTimeout(()=>{

            let value = fib(i);

            sequence.push(value);

            let node = document.createElement("div");

            node.className = "fib-node";

            node.innerHTML =
            `Fib(${i}) = ${value}`;

            visualArea.appendChild(node);

            addLog(
                `تم حساب Fib(${i}) = ${value}`
            );

            if(i === n){

                let result = document.createElement("div");

                result.className =
                "alert alert-success mt-4";

                result.innerHTML =
                `
                <h5>
                الناتج النهائي
                </h5>

                <strong>
                ${sequence.join(" , ")}
                </strong>
                `;

                visualArea.appendChild(result);

                addLog(
                    "اكتمل إنشاء سلسلة فيبوناتشي"
                );
            }

        }, i * 700);

    }

}
function runGCD(){

    let a = parseInt(input1.value);
    let b = parseInt(input2.value);

    if(isNaN(a)) a = 252;
    if(isNaN(b)) b = 105;

    let step = 0;

    while(b !== 0){

        let remainder = a % b;

        const currentA = a;
        const currentB = b;
        const currentR = remainder;

        setTimeout(()=>{

            let box =
            document.createElement("div");

            box.className="gcd-box";

            box.innerHTML=
            `
            <div class="equation">
                ${currentA} % ${currentB} = ${currentR}
            </div>
            `;

            visualArea.appendChild(box);

        }, step * 1000);

        addLog(
            `
            <span dir="ltr">
            ${currentA} % ${currentB} = ${currentR}
            </span>
            `
        );

        a = b;
        b = remainder;

        step++;
    }

    setTimeout(()=>{

        addLog(
        `
        <strong>
        GCD = ${a}
        </strong>
        `
        );

    }, step * 1000);
}
function runHanoi(){

    let disks = parseInt(
        document.getElementById("input1").value
    );

    if(isNaN(disks))
        disks = 4;

    visualArea.innerHTML =

    `
    <div class="tower-container">

        <div class="tower" id="towerA"></div>

        <div class="tower" id="towerB"></div>

        <div class="tower" id="towerC"></div>

    </div>
    <div class="text-container mt-3">
        <div>A</div>
        <div>B</div>
        <div>C</div>
        </div>
    `;

    const towers = {
        A: document.getElementById("towerA"),
        B: document.getElementById("towerB"),
        C: document.getElementById("towerC")
    };

    let state = {
        A: [],
        B: [],
        C: []
    };

    for(let i=disks;i>=1;i--){

        let disk = document.createElement("div");

        disk.className = "disk";

        disk.style.width =
        (40 + i*25) + "px";

        disk.style.background =
        `hsl(${i*60},70%,50%)`;

        disk.innerHTML = i;

        towers.A.appendChild(disk);

        state.A.push(disk);
    }

    let moves = [];

    function hanoi(n,from,to,aux){

        if(n===1){

            moves.push({
                from,
                to
            });

            return;
        }

        hanoi(
            n-1,
            from,
            aux,
            to
        );

        moves.push({
            from,
            to
        });

        hanoi(
            n-1,
            aux,
            to,
            from
        );
    }

    hanoi(
        disks,
        "A",
        "C",
        "B"
    );

    moves.forEach((move,index)=>{

        setTimeout(()=>{

            let disk =
            state[move.from].pop();

            state[move.to].push(disk);

            towers[move.to]
            .appendChild(disk);

            addLog(

                `نقل القرص ${disk.innerHTML}
                من البرج ${move.from}
                إلى البرج ${move.to}`

            );

        },index*1200);

    });

}