console.log('main js loaded')

async function getCorpusData(language, name){
    let response  = await fetch('./data/' + language + '/' + name + '.json')
    let corpus = await response.json()
    
    return corpus
}
