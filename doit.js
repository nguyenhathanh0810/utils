import {AdministrativeUnits, MekongDelta} from './static.min.js';

(_ => {
    const refined = AdministrativeUnits.filter(level1 => MekongDelta.indexOf(level1.name) != -1);
    let result = refined.map(level1 => ({
        "name": level1.name,
        "districts": level1.level2s.map(level2 => ({
            "name": level2.name,
            "wards": level2.level3s.map(level3 => ({
                "name": level3.name
            }))
        }))
    }));
    let el = document.getElementById("mekong-delta") || {};
    el.textContent  = JSON.stringify(result, undefined, 2);
    let input = document.getElementById("buffer");
    input.value = JSON.stringify(result);
})();

const copyToClipboard = e => {
    let data = (document.getElementById("mekong-delta") || {}).textContent;
    let input = document.getElementById("buffer");
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    let btn = e.target;
    btn.innerHTML = "Copied!";
    setTimeout(_ => {
        btn.innerHTML = "Copy";
    }, 1500);
}

(_ => {
    let btn = document.getElementById("copy");
    btn.addEventListener("click", copyToClipboard);
})();