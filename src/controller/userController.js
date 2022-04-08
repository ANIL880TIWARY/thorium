const userModel = require("../Model/userModel")
const shortId = require("shortid")
const validUrl = require("valid-url")



const redis = require("redis");

const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
  11282,
  "redis-11282.c212.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("ZcRqCUjklfjf8TnmwZ9DPWfeMPHM0gQ7", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);




// ### POST /url/shorten:

const urlMake = async function(req,res){
try{
    const baseUrl = "http://localhost:3000/"
    const data = req.body
    const {longUrl,shortUrl,urlCode} = data
    if(Object.keys(data)==0)return res.status(400).send({status:false,msg:"please put details in the body"})
    // VALIDATING BASE URL:
    if (!validUrl.isUri(baseUrl.trim())){return res.status(400).send({status:false,msg:"baserUrl is not valid"})}
    // VALIDATING LONG-URL:
    if(!data.longUrl) return res.status(400).send({status:false,msg:"longUrl is not present"})
    if(data.longUrl.trim().length == 0) return res.status(400).send({status:false,msg:"enter the longUrl in proper format"})
    if(!(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/).test(longUrl))return res.status(400).send({status:false,msg:"longUrl is invalid"})
    //let duplongUrl = await userModel.findOne({longUrl:data.longUrl})
    //if(duplongUrl)return res.status(400).send({status:false,msg:"shortUrl is already generated for this longUrl"})
    const duplicateUrl = await userModel.findOne({ longUrl: data.longUrl }).select({_id:0,createdAt:0,updatedAt:0,__v:0})
    if (duplicateUrl) {
        return res.status(200).send({ status:true,data:duplicateUrl })
    }
    // VALIDATING URL-CODE:
    data.urlCode = shortId.generate().toLowerCase()
    // VALIDATING SHORT-URL:
    data.shortUrl = baseUrl + `${data.urlCode}`
    console.log(data.shortUrl)
    let cahcedLongUrlData = await GET_ASYNC(`${duplicateUrl}`)
        if (cahcedLongUrlData) {
            return res.status(400).send({ status: false, message: "data is present in the catche" })
        }
        else {
            await SET_ASYNC(`${longUrl}`, (JSON.stringify(duplicateUrl)))

    const SavedUrl = await userModel.create(data)
    
    return res.status(201).send({status: true,msg:"url-shortend", data: {"longUrl": SavedUrl.longUrl,"shortUrl": SavedUrl.shortUrl,"urlCode": SavedUrl.urlCode}})
        }
}catch(error) {
    return res.status(500).send({status:false, msg: error.message})
}}

// ### GET /:urlCode:

const getUrlcode = async function(req,res){
    try{
       const urlCode = req.params.urlCode
       if(!urlCode)return res.status(400).send({status:false,msg:"params value is not present"})
       if(urlCode.length!=9)return res.status(400).send({status:false,msg:"not a valid urlCode"})
       const url = await userModel.findOne({urlCode})
       console.log(url)
       if(!url){return res.status(400).send({status:false,msg:"urlCode is not present"})}
       let cahcedLongUrlData = await GET_ASYNC(`${urlCode}`)
        if (cahcedLongUrlData) {
            res.redirect(JSON.parse(cahcedLongUrlData).longUrl)
            console.log("from caching")
        } else {
            let cache = await userModel.findOne({ urlCode });
            await SET_ASYNC(`${urlCode}`, (JSON.stringify(cache)))

       res.status(200).redirect(url.longUrl)
        }
    }catch(error) {
    return res.status(500).send({status:false, msg: error.message})
    }
}





//1. connect to the server
//2. use the commands :

//Connection setup for redis



//const createAuthor = async function (req, res) {
  //let data = req.body;
  //let authorCreated = await authorModel.create(data);
  //res.send({ data: authorCreated });
//};

// const fetchAuthorProfile = async function (req, res) {
//   let cahcedProfileData = await GET_ASYNC(`${req.params.authorId}`)
//   if(cahcedProfileData) {
//     res.send(cahcedProfileData)
//   } else {
//     let profile = await authorModel.findById(req.params.authorId);
//     await SET_ASYNC(`${req.params.authorId}`, JSON.stringify(profile))
//     res.send({ data: profile });
//   }

// };


//module.exports.fetchAuthorProfile = fetchAuthorProfile;





module.exports.urlMake = urlMake
module.exports.getUrlcode = getUrlcode