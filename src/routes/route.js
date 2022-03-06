const express = require('express');
const router = express.Router();

// router.get('/students/:name', function(req, res) {
//     let studentName = req.params.name
//     console.log(studentName)
//     res.send(studentName)
// })

// let players =
//    [
//        {
//            "name": "manish",
//            "dob": "1/1/1995",
//            "gender": "male",
//            "city": "jallandhar",
//            "sports": [
//                "swimming"
//            ],
//            "bookings": [
//             {
//                 "bookingNumber": 1,
//                 "sportId": "",
//                 "centerId": "",
//                 "type": "private",
//                 "slot": '16286598000000',
//                 "bookedOn": '31/08/2021',
//                 "bookedFor": '01/09/2021'
//             },
//             {
//                 "bookingNumber": 2,
//                 "sportId": "",
//                 "centerId": "",
//                 "type": "private",
//                 "slot": '16286518000000',
//                 "bookedOn": '31/08/2001',
//                 "bookedFor": '01/09/2001'
//             },
//         ]
//     },
//     {
//         "name": "gopal",
//         "dob": "1/09/1995",
//         "gender": "male",
//         "city": "delhi",
//         "sports": [
//             "soccer"
//         ],
//         "bookings": []
//     },
//     {
//         "name": "lokesh",
//         "dob": "1/1/1990",
//         "gender": "male",
//         "city": "mumbai",
//         "sports": [
//             "soccer"
//         ],
//         "bookings": []
//     },
// ]
let players=[];
router.post("/players", function(req, res){
    let player = req.body;
    let playerName =player.name;
    for( let i=0; i< player.length; i++){
        if(players[i].name == playerName){
            res.send('player alreay exist')
        }
    }
    players.push(player)
    console.log("here is the player array",players);
    res.send(players);

});
    

router.post('/players/:playerName/bookings/:bookingId', function(req, res){
    let name = req.params.playerName;
    let isPlayerPresent= false;// boolean is variable is written as 'is' or quetion formate
    for (let i= 0; i<players.length; i++ ){
        if(player[i].name == name){
            isPlayerPresent = true;
        }
    }
    if (!isPlayerPresent){
      return  res.send('player not present')
    }
    let booking = req.body;
    let bookingId = req.params.bookingId
        for(let i=0;i<players.length; i++){
    if(players[i].name === name){
       
        let isbookingPresent=false;
        for(let j=0; j<players[i].booking.length; j++){
            if(player[i].bookings[i].bookingNumber== bookingId){
                return res.send('booking with this id already present for player')
            }
        }
        players[i].bookings.push(booking)
    }
}
    res.send(players )
})




module.exports = router;
