var cell = document.getElementById("cell");
var ui = document.getElementById("ui");
var sn = document.getElementById("searchNow");
sn.addEventListener("click", search);

let trackNumber = -1;

window.addEventListener("load", game);

let target = document.querySelector('#loader');

// Time calculator function
function timeConverter(UNIX_timestamp) {
          var a = new Date(UNIX_timestamp * 1000);
          var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time =
            date +
            " " +
            month +
            " " +
            year; 
            //+
          //  " " +
            //hour +
         //   ":" +
           // min +
         //   ":" +
           // sec;
          return time;
}

function create(D) {

        var heading = document.createElement("h3"),
          author = document.createElement("p"),
          score = document.createElement("p"),
          date = document.createElement("p"),
          link = document.createElement("a"),
          comment = document.createElement("a"),
          hrule = document.createElement("hr");

        author.innerHTML = `By : ${D.by}`;
        score.innerHTML = `Votes : ${D.score}`
        date.innerHTML = `${timeConverter(D.time)}`;
        link.href = `${D.url}`;
        link.innerHTML = `${D.title}`;
        link.target = `_blank`;
        cl = '0'
        if(D.kids){
          cl = D.kids.length
        }
        comment.innerHTML = `Comments (${cl})`
        comment.target = `_blank`;
        cell.appendChild(link);
        cell.appendChild(author);
        cell.appendChild(score);
        cell.appendChild(date);
        cell.appendChild(comment);
        cell.appendChild(hrule);
        // document.appendChild(heading);
        // console.log(D.title);
        // comment.addEventListener('click', onClick)
        // function onClick(e){
        //  console.log("hi")
        //  for (let j = 0; j < D.kids.length; j++) {
        //  console.log(D.kids.length)
        //  fetch(`https://hacker-news.firebaseio.com/v0/item/${D.kids[j]}.json`)
        // .then(res => res.json())
        // .then(dat => console.log(dat))
        // }  
        // }
        // observer.observe(target)
      }

// Search Feature
function search(e) {
  cell.innerHTML = "";
  val = ui.value;

  if(val.length<=3){
    alert("Please type atleast 3 characters");
  }else{
    fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
    .then((res) => res.json())
    .then((d) => output2(d));

    function output2(d) {


      for (let i = 0; i < d.length; i++) {
        //////////// Toggle for loop for all or 20 entries ////////////
        // for (let i = 0; i < 20; i++) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${d[i]}.json`)
          .then(res => res.json())
          .then(D => createWithFilter(D));

        function createWithFilter(D) {
          var heading = document.createElement("h3"),
            author = document.createElement("p"),
            score = document.createElement("p"),
            date = document.createElement("p"),
            link = document.createElement("a");
            comment = document.createElement("a"),
          hrule = document.createElement("hr");         

          var testreg = new RegExp(`${val}`, "gi");

          var str = D.title;
          var mat = str.match(testreg);

          if (mat) {
            author.innerHTML = `By : ${D.by}`;
            score.innerHTML = `Votes : ${D.score}`
            date.innerHTML = `${timeConverter(D.time)}`;
            link.href = `${D.url}`;
            link.innerHTML = `${D.title}`;
            link.target = `_blank`;
            cl = '0'
            if(D.kids){
              cl = D.kids.length
            }
            
            comment.innerHTML = `Comments (${cl})`
            comment.target = `_blank`;
            cell.appendChild(link);
            cell.appendChild(author);
            cell.appendChild(score);
            cell.appendChild(date);
            cell.appendChild(comment);
            cell.appendChild(hrule);
          }

          if (cell.innerHTML == "") {
            console.log("Should not come here")
            game();
          }                 
        }
      }          
    } 
  }     
}

function output(d) {
    //console.log(d[0]);
    
    totalLength = d.length;

    // for (let i = 0; i < d.length; i++) {
      //////////// Toggle for loop for all or 20 entries ////////////
    for (let i = 0; i < 5; i++) {

      trackNumber++;
      fetch(`https://hacker-news.firebaseio.com/v0/item/${d[trackNumber]}.json`)
        .then(res => res.json())
        // .then(data => console.log(data));
        .then(D => {
          // trackNumber = trackNumber + 1;
          console.log(trackNumber,i)
          create(D)
        });
      
    }
  }
function game() {
  fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`)
    .then(res => res.json())
    .then(d => {
      output(d);
    });
}

// window.onscroll = function(ev) {
//     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//         // you're at the bottom of the page
//         // alert("near bottom!");
//         game(ev);
//     }
// };

// Implementing Infinite scrolling with Intersection Observer API

let options = {
  // root: document.querySelector('#loader'),
  // rootMargin: '0px',
  threshold: 0.1
}

let callback = (entries, observer) => {
  entries.forEach(entry => {
    // Each entry describes an intersection change for one observed
    // target element:
    // observer.unobserve(target);
    game();
  });
};

let observer = new IntersectionObserver(callback, options);

observer.observe(target);

