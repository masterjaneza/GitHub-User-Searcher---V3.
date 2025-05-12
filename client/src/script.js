
import { neonCursor } from 'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'
neonCursor({
    el: document.getElementById('app'),
    shaderPoints: 16,
    curvePoints: 80,
    curveLerp: 0.5,
    radius1: 5,
    radius2: 30,
    velocityTreshold: 10,
    sleepRadiusX: 100,
    sleepRadiusY: 100,
    sleepTimeCoefX: 0.0025,
    sleepTimeCoefY: 0.0025
  })

// take elements from html - წამოვიღეთ ელემენტები html - დან
let input = document.querySelector('#input1');
let btn = document.querySelector('#btn1');

let userNameSpan = document.querySelector('#userNameSpan');
let a = document.querySelector('a');
let img = document.querySelector('img');


let userFetch = async () => {
    let userName = input.value.trim().replace(/\s+/g, ''); // ცარიელი ადგილები ამოვშალეთ და ავტომატურად შევცვალეთ.
    if (!userName) { // გამოიტანს Alert - ს თუ მოხმარებელი მნიშვნელობას არ შეიტანს Input ში.
        let timerInterval;

        Swal.fire({
            title: 'Error',
            html: '<span style="font-family: Bruno Ace SC; color: #fec7d7;">Please Input User Name</span>',
            icon: 'error',
            timer: 3500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                  timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
            customClass: {
                popup: 'custom-popup',
                title: 'custom-title',
                confirmButton: 'custom-btn',
                timerProgressBar: 'custom-progress-bar',
                loader: 'custom-loader'

            }
        })
        return;
    }
    let api = `https://api.github.com/users/${userName}`;

    try {
        let response = await fetch(api);
       
        if(!response.ok) throw new Error(`Status is not valid! Status: ${response.ok}`); // გამოიტანს შეცდომას თუ სტატუსი არ იქნება კარგი.
        let data = await response.json(); // data ცვლადში შევინახეთ response json ად გადაქცეული, რადგან მარტივად შევძლოთ ინფორმაციის ამოღება/ამოწერა.
        let {login, html_url, avatar_url} = data; // დავშალეთ ობიექტი - Destructing
        
        // წამოღებული მნიშვნელობები შევინახეთ ელემენტებში.
        
        userNameSpan.innerHTML = `<span style="color: #2cb67d; text-decoration: underline;">${login}</span>`;
        
        img.src = `${avatar_url}`;
        
        a.innerHTML =` <a style="color: #2cb67d; font-size: 22px; padding-left: 10px;" href="${html_url}" target="_blank">${html_url}</a>`;

        input.value = ''
        
        
    } catch(err) { // თუ შეცდომა დაფიქსირდა, ამუშავდება მოცემული კოდი. დარესეტდება მოცემული ელემენტები.
        console.log(`Failed: ${err}`);
        userNameSpan.innerHTML = `<span style="color: red; text-decoration: line-through;">User Not Found</span>`;
        img.src = 'github logo.png';
        a.innerHTML = '<a style="color: #e16162;">There is no Link!</a>'
        
    };
}; 

btn.addEventListener('click', userFetch); // ღილაკზე დაჭერით, ამუშავდება მთლიანი ფუნქცია.

window.addEventListener('keypress', function(e) { // Enter ზე დაჭერით, ამუშავდება მთლიანი ფუნქცია.
    if(e.key === 'Enter') {
        userFetch();
    };
});

