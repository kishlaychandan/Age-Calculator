let main = document.getElementsByClassName("main")[0];
let dateinput = document.querySelector(".dateinput");
let btn = document.querySelector(".btn");
let year = document.querySelector(".year");
let month = document.querySelector(".month");
let day = document.querySelector(".day");
let section2 = document.querySelector(".section2");
let factTitle = document.querySelector(".fact-title");
let fact = document.querySelector(".fact");

let date = new Date();

btn.addEventListener("click", () => {
    let dob = dateinput.value;
    if (!dob) {
        alert("Please enter a date of birth");
        return;
    }

    let curdd = date.getDate();
    let curmm = date.getMonth() + 1;
    let curyyyy = date.getFullYear();

    let dobyyyy = parseInt(dob.slice(0, 4));
    let dobmm = parseInt(dob.slice(5, 7));
    let dobdd = parseInt(dob.slice(8));

    let totalyyyy = curyyyy - dobyyyy;
    let totalmm = curmm - dobmm;
    let totaldd = curdd - dobdd;

    if (totaldd < 0) {
        totalmm--;
        let tempDate = new Date(curyyyy, curmm - 1, 0);
        totaldd += tempDate.getDate();
    }
    if (totalmm < 0) {
        totalyyyy--;
        totalmm += 12;
    }

    if (totalyyyy < 0 || (totalyyyy === 0 && totalmm < 0) || (totalyyyy === 0 && totalmm === 0 && totaldd < 0)) {
        alert("Invalid date of birth");
        year.innerText = "...";
        month.innerText = "...";
        day.innerText = "...";
        section2.style.color = "red";
        return;
    } else {
        year.innerText = totalyyyy;
        month.innerText = totalmm;
        day.innerText = totaldd;
        section2.style.color = "green";
    }

    fetch(`https://numbersapi.com/${dobmm}/${dobdd}/date`)
        .then(response => response.text())
        .then(data => {
            fact.innerText = data;
        })
        .catch(error => {
            fact.innerText = "Sorry, we couldn't fetch a fun fact.";
            console.error('Error fetching the fun fact:', error);
        });
});

let colors = ["#fedcba", "#ffbf00", "#0000ff", "#3f3fff", "#abcdef", "#181716", "#009c4a", "#ff0000", "#451800", "#cbff00", "#849974", "#cbff00", "#c0ff00", "#c6e2ff", "#ff00ff", "#fbc6da"];
setInterval(changebackground, 1000);

function changebackground() {
    let random = colors[Math.floor(Math.random() * colors.length)];
    main.style.backgroundColor = random;
    main.style.transition = "all 0.5s linear";
}
