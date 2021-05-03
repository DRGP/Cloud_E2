const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

exports.handler = async (event) => {
    let nluKey = process.env.nluKey
    let requestJSON = JSON.parse(event.body);

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: nluKey,
        }),
        serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/16aea454-6f9a-4c9c-9233-1b5fcdbe4c07'
    });

    const analyzeParams = {
        'text': requestJSON.historial_clinico,
        'features': {
            'keywords': {
                'sentiment': true,
                'emotion': true,
                'limit': 5
            },
            'entities': {
                'sentiment': true,
                'limit': 5
            }
        }
    };
    
    analysisResults = await naturalLanguageUnderstanding.analyze(analyzeParams);
    return {
        lenguaje_texto: analysisResults.result.language,
        palabras_clave: analysisResults.result.keywords,
        entidades: analysisResults.result.entities
    };
};