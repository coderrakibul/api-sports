const allPlayers = () => {
    const playerContainer = document.getElementById("player-container");
    playerContainer.textContent = "";
    document.getElementById("spinner").style.display = "block";
    const searchText = document.getElementById("search-box").value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.player == null){
            document.getElementById("spinner").style.display = "block";
        }
        else{
            displayPlayer(data.player);
            document.getElementById("spinner").style.display = "none";
        }
    })
}

const displayPlayer = players => {
    if(players){
        document.getElementById("spinner").style.display = "none";
    }
    else{
        document.getElementById("spinner").style.display = "block";
    }
    const playerContainer = document.getElementById("player-container");
   for(const player of players){
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card mt-3 p-3">
    <div>
      <img class="w-50" src="${player.strThumb}" alt="">
      <h2>Name: ${player.strPlayer}</h2>
      <h4>Country: ${player.strNationality}</h4>
      <p></p>
      <button class="btn btn-danger">Delete</button>
      <button onclick="playerDetails('${player.idPlayer}')" class="btn btn-success">Details</button>
    </div>
  </div>
    `;
    playerContainer.appendChild(div);
   }
   const searchText = document.getElementById("search-box");
   searchText.value = "";
}


const playerDetails = (id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDetails(data.players[0]))
}

const displayDetails = info => {
    if(info.strGender == "Male"){
        document.getElementById("male").style.display = "block";
    }
    else{
        document.getElementById("female").style.display = "block";
    }
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
    <div>
    <img class="w-75" src="${info.strCutout}" alt="">
    <h3>Name: ${info.strPlayer}</h3>
    <span class="d-block"> Team Name: ${info.strTeam} </span>
    <span class="d-block"> Weight: ${info.strWeight} </span>
    <span class="d-block"> Height: ${info.strHeight} </span>
    <span class="d-block"> Gender: ${info.strGender} </span>
    <span class="d-block"> Position: ${info.strPosition} </span>
    <span class="d-block"> Position: ${info.strNumber} </span>
  </div>
    `;
}