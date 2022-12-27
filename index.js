const Express = require('express');
const app = Express();
const port = process.env.PORT || 3000;
const http = require("http");
const https = require("https");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;
process.setMaxListeners(Infinity);

const username = 'vijay_web_developer'; // your temp instagram username for session cookie
const password = 'Vijay@2003'; // your password for session coookie

const cookiee = 'csrftoken=pS4zlOvqTP0EeuGVq7MBMGnWoap7Ys8l; rur=VLL; ds_user_id=8961821099; sessionid=8961821099%3AeUJvrUuqSUq9kJ%3A26%3AAYf6HOxG6Yj5CRz_dRS_LcY_3qwoYEdnr8J60z60Pg';




const { igApi ,getCookie } = require("insta-fetcher");
// This Code Use insta-fetcher I respect The owner

let ig = new igApi(cookiee);

// fetchPost
app.get("/api", async(req, res) => {
  const url = req.query.url
  if(url == '' || url == null){
    return res.status(400).send({
      success: false,
      message: "Query Can't Be Empty!",
      creator: "vijay"
    });
  }
    ig.fetchPost(url).then((data) => {
  console.log(data);
  res.status(200).json({data})
});

})


// fetchUser
app.get("/profile", async(req, res) => {
  const username = req.query.username
  if(username == '' || username == null){
    return res.status(400).send({
      success: false,
      message: "Query Can't Be Empty!",
      creator: "vijay"
    });
  }
    ig.fetchUser(username).then((data) => {
  console.log(data);
  res.status(200).json({data})
});

})




// fetchHighlights
app.get("/highlight", async(req, res) => {
  const storylink = req.query.storylink
  if(storylink == '' || storylink == null){
    return res.status(400).send({
      success: false,
      message: "Query Can't Be Empty!",
      creator: "vijay"
    });
  }
    ig.fetchHighlights(storylink).then((data) => {
  console.log(data);
  res.status(200).json({data})
});

})




// fetchStories
app.get("/story", (req, res) => {
  const user = req.query.user
  res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
        if(user == '' || user == null){
          return res.status(400).send({
            success: false,
            message: "Query Can't Be Empty!",
            creator: "vijay"
          });
        }
 try {
     ig.fetchStories(user).then(data => {
  res.status(200).json({
      status: "true",
      stone: data
  })
  }).catch(err => {
      res.status(400).json({
          status: "false",
          stone: err
      })
      console.log(err);
  })
 } catch (error) {
  //    console.log(error);
 }
  
})











app.get("/session", async(req, res) => {
    // this rout for get session id Make In Private for your Account Safety Chnage Rout Adresssss
(async () => {
  try {
    const cookie = await getCookie(username, password);
    res.status(200).json({cookie})
  } catch (error) {
    res.status(400).json({error})
  }
})();
})

app.get("/", (req, res) => {
    res.setHeader("Cache-Control", "public,max-age=0");
    res.status(200).json({
        status: 'ok',
        webSite: 'vijay'
    })
})


app.listen(port, function(){
    console.log("Your App Running on", port);
/* This File Created By vijay */
});
