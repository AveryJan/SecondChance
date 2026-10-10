const natural = require("natural");

const analyzer = new natural.SentimentAnalyzer(
  "English",
  natural.PorterStemmer,
  "afinn"
);

const score = analyzer.getSentiment(["great", "helpful", "excellent", "love"]);
console.log("Sentiment score:", score);
