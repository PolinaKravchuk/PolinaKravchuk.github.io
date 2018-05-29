function load(){
  
    
    let table = document.getElementById("table");
    let listUid = [];
    let listPuzzlesId = [];
    let total = {};


    fetch('dumps/sessions.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(sessions) {
      
      

        for(let j = 0; j < sessions.length; j++){
        //  let j = 0;
        let result;
        let puzzles = sessions[j].puzzles;
        let sessionTwo = sessions[1];
        for (let i = 0; i < puzzles.length; i++){

          let puzzle = puzzles[i];
          let puzzleName = puzzle.name;
          let div = document.createElement('div');

          div.className = "table-head";
          div.id = puzzleName;
          div.innerHTML = puzzleName;
          table.appendChild(div);

          listPuzzlesId.push(puzzleName);
        }
        

        let rounds = sessions[j].rounds;

        for (let q = 0; q < rounds.length; q++){

          let round = rounds[q];
          let roundId = q;
          if(j == 1) roundId = 10;
          let listGamers = round.solutions;
          let nameGame = listPuzzlesId[roundId];
          let elementGame = document.getElementById(nameGame);
          
          for (let value = 0; value < listUid.length; value++){
            let id = listUid[value];
            let div = document.createElement('div');
            div.className = "table-row";
            div.id = id + " " + nameGame;
            
            let objectInf;
            let code;
            if(id in listGamers){

              objectInf = listGamers[id];
              let objectTime = objectInf['time'];
              result = objectTime['$numberLong'];
              
              code = objectInf['code'];
              div.innerHTML = result;
              
            } else  {
              code = ' ';
              result = "150";
              div.innerHTML = result;
            } 
            let hover;
            div.addEventListener("mouseover",function(){
              
              div.setAttribute('title', code);
              div.style.cursor = "pointer";
            });
            div.addEventListener("mouseout",function(){
               div.removeAttribute('title');
            });

            if(total[id]) total[id] += Number(result);
            else total[id] = Number(result);

            elementGame.appendChild(div);  
          } 
          
        }
        if (j == 0){
        let totalTime = document.getElementById('Total time');
        for (let y = 0; y < listUid.length; y++){
          let id = listUid[y];
          let nameGame = 'Total time';
          let divTotal = document.createElement('div');

          divTotal.className = "table-row";
          divTotal.id = id + " " + nameGame;

          if(id in total){
            divTotal.innerHTML = total[id];
          }
          totalTime.appendChild(divTotal);

        }
      }
       }
    //  createSessions();
    //  checkSessions();
    })
    .catch( alert );
  //   function createSessions(){
  //     let label = document.createElement('label');
  //     let input = document.createElement('input');
  //     let sessions = document.getElementById("sessions");
  //     input.type = "radio";
  //     input.name = "sessions";
  //     input.id = "sessionFirst";
  //     label.for = "sessionFirst";
  //     label.innerHTML = "rsschool";
  //     sessions.appendChild(label);
  //     label.appendChild(input);

  //     label = document.createElement('label');
  //     input = document.createElement('input');
  //     sessions = document.getElementById("sessions");
  //     input.type = "radio";
  //     input.name = "sessions";
  //     input.id = "sessionSecond";
  //     label.for = "sessionSecond";
  //     label.innerHTML = "rsschool-demo";
  //     sessions.appendChild(label);
  //     label.appendChild(input);
  //   }

  //  function checkSessions(){
  //   let sessionFirst = document.getElementById("sessionFirst");
  //   let sessionSecond = document.getElementById("sessionSecond");
  //   let hidd = document.getElementById("Bits and Pieces");

  //   if(sessionFirst.checked) {
  //     hidd.style.display = "none";
  //   }
  //  } 

    fetch('dumps/users.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(users) {

      let div = document.createElement('div');
      div.className = "table-head";
      div.id = "Display Name";
      div.innerHTML = "Display Name";
      table.appendChild(div);

      div = document.createElement('div');
      div.className = "table-head";
      div.id = "Total time";
      div.innerHTML = "Total time (rsschool)";
      table.appendChild(div);

      let displayName = document.getElementById("Display Name");
      users.forEach(function(item){

        div = document.createElement('div');
        div.className = "table-row";
        div.id = item.uid;
        div.innerHTML = item.displayName;
        div.style.flexDirection = "column";
        displayName.appendChild(div);

        listUid.push(item.uid);
      });
    })
    .catch( alert );

    
   
}