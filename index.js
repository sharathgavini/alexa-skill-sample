const port = 5000;
var express = require('express');
var verifier = require('alexa-verifier-middleware');
var app = express();
var alexaRouter = express.Router();
app.use('/', alexaRouter);
alexaRouter.use(verifier);
var outputMessage = [
    'Your conscience is the measure of the honesty of your selfishness. Listen to it carefully. Richard Bach',
    "All tyranny needs to gain a foothold is for people of good conscience to remain silent.",
    "A clear conscience is usually the sign of a bad memory",
    "No fundamental social change occurs merely because government acts. It's because civil society, the conscience of a country begins to rise up and demand-demand-demand change. Joe Biden.",
    "Every judgement of conscience, be it right or wrong, be it about things evil in themselves or morally indifferent, is obligatory, in such wise that he who acts against his conscience always sins.",
    "I love those who can smile in trouble, who can gather strength from distress, and grow brave by reflection. 'Tis the business of little minds to shrink, but they whose heart is firm, and whose conscience approves their conduct, will pursue their principles unto death. Leonardo da Vinci.",
    "Never do anything against conscience even if the state demands it. Albert Einstein.",
    "Conscience is the inner voice that warns us that someone might be looking. H L Mencken.",
    "Fear nothing but your conscience. Suzy Kassem.",
    "There is no witness so terrible and no accuser so powerful as conscience which dwells within us. Sophocles.",
    "Reason often makes mistakes, but conscience never does. Josh Billings.",
    "Conscience defined by the elders, passed on to the next generations. Toba beta",
    "Conscience was chiefly fear of society, or fear of oneself. D. H. Lawrence."
];
// Routes that handle alexa traffic are now attached here.
// Since this is attached to a router mounted at /alexa,
// this endpoint will be accessible at /alexa/weather_info
alexaRouter.post('/quoteMe', function (req, res) {
    var request = req.body.request;
    // console.log(request);
    var intent = request.intent;
    var randomInt = Math.floor(Math.random() * Math.floor(13));
    var response = {
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "PlainText",
                "text": outputMessage[randomInt],
            },

        },
        "shouldEndSession": true
    };


    if (intent != undefined && intent.hasOwnProperty('name')) {
        if (intent.name == 'CommandSkill') {
            var responseMessage;
            responseMessage = outputMessage[randomInt];
            response.response.outputSpeech.text = responseMessage;
        }
    }
    res.status(200).json(response)
});

app.listen(process.env.PORT || port);