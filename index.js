const levenshtein = require('js-levenshtein');
const randomWords = require('random-words');
const FoobarIpsum = require('foobar-ipsum');
const fs = require('fs');

const getDistanceString = (firstString, secondString, cppStyle = false) => {
  const distance = levenshtein(firstString, secondString);
  if (cppStyle) {
    return `assertDistance(f, "${firstString}", "${secondString}", ${distance});\n`;
  } else {
    return `"${firstString}" - "${secondString}" - ${distance}\n`;
  }
}

const generateWordDistances = (numWordPairs) => {
  let wordPairStrings = '';

  for (let i = 0; i < numWordPairs; i++) {
    const [firstWord, secondWord] = randomWords(2);
    wordPairStrings += getDistanceString(firstWord, secondWord);
  }

  return wordPairStrings;
}

const generateSentenceDistances = (numSentencePairs) => {
  let sentencePairStrings = '';

  const generator = new FoobarIpsum({
    size: {
      sentence: 5
    }
  })

  for (let i = 0; i < numSentencePairs; i++) {
    const firstSentence = generator.sentence();
    const secondSentence = generator.sentence();
    sentencePairStrings += getDistanceString(firstSentence, secondSentence);
  }

  return sentencePairStrings;
}

const main = () => {
  let outputString = '';
  outputString += generateWordDistances(500);
  outputString += generateSentenceDistances(500)
  fs.writeFileSync(__dirname + '/output.txt', outputString);
}

main();
