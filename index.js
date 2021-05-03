exports.handler = async (event) => {
    // TODO implement
    let key = process.env.nluKey
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: key,
        }),
        serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/7188e9f2-890a-48a7-bd05-61e785967ba0',
    });

    const analyzeParams = {
        'text': event.historial_clinico,
        'features': {
            'keywords': {
                'sentiment': true,
                'emotion': true,
                'limit': 3
            }
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            return analysisResults;
        })
        .catch(err => {
            console.log('error:', err);
            return err;
        });
};