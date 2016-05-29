var sumName = "";
var APIKEY = "";

function summonerLookUp() {
    sumName = $("#summonerName").val();
    APIKEY = "17262afa-d800-4837-85a7-d8f5192131d2";


    if (sumName !== "") {

        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + sumName + '?api_key=' + APIKEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {
                var sumNamenospace = sumName.replace(" ", "");

                sumNamenospace = sumNamenospace.toLowerCase().trim();

                summonerLevel = json[sumNamenospace].summonerLevel;
                summonerID = json[sumNamenospace].id;

                document.getElementById("sLevel").innerHTML = summonerLevel;
                document.getElementById("sID").innerHTML = summonerID;

                // NEW FUNCTION!
                letsGetMasteries(summonerID);
                letsGetMatchers(summonerID);

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting Summoner data 1!");
            }
        });
    } else {}

}

function letsGetMasteries(summonerID) {
    $.ajax({

        url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + summonerID + "/masteries?api_key=" + APIKEY,
        type: 'GET',
        dataType: 'json',
        data: {

        },
        success: function (resp) {
            numberOfPages = resp[summonerID].pages.length;
            numberOfPage1 = resp[summonerID].pages[0].name;

            document.getElementById("masteryPageCount").innerHTML = numberOfPages;
            document.getElementById("masteryPages1st").innerHTML = numberOfPage1;
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("error getting Summoner data 2!");
        }
    });
}

function letsGetMatchers(summonerID) {
    $.ajax({
              /*https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/38619888/recent?api_key=17262afa-d800-4837-85a7-d8f5192131d2*
              https://developer.riotgames.com/api/methods#!/1060/3659 */
        url: "https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/" + summonerID + "/recent?api_key=" + APIKEY,
        type: 'GET',
        dataType: 'json',
        data: {

        },
        success: function (resp) {
          var gamesArray = resp.games;
          a = gamesArray.length;

          var numberofRequests = 0;

          for (var i = 0; i < a; i++){
            gameIdentity = resp.games[i].gameId;
            for (var v = 0; v < 9; v++){
              var playeridentity = resp.games[i].fellowPlayers[v].summonerId;
               console.log(playeridentity);
               /*document.getElementById("players").innerHTML = playeridentity;*/


                if(numberofRequests == 8){

                       var start = new Date().getTime();
                       while (new Date().getTime() < start + 10000);

                       numberofRequests = 0;
                }
                       numberofRequests = numberofRequests + 1;

               search(playeridentity)
    }

    function search(playeridentity){


                    $.ajax({
                    url: "https://na.api.pvp.net/api/lol/na/v1.4/summoner/" + playeridentity + "/?api_key=" + APIKEY,
                    type: 'GET',
                    dataType: 'json',
                    data: {

                    },
                    success: function (resp) {
                      var playernames = resp.playeridentity.name;
                      console.log(playernames);
                      console.log(resp.playeridentity);

                    },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert("Number of Request to the Server has reached");
                        }
                      });
                    }
                  }
                  },
                  error: function (XMLHttpRequest, textStatus, errorThrown) {
                      alert("error getting Summoner data 2!");
                  }
              });

    }
