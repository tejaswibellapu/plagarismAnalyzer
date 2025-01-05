function analyze() {
    var text1 = document.getElementById('text1').value.toLowerCase();
    var text2 = document.getElementById('text2').value.toLowerCase();
  
    // Tokenize the texts
    var words1 = text1.split(/\s+/);
    var words2 = text2.split(/\s+/);
  
    // Calculate similarity
    var similarity = calculateSimilarity(words1, words2);
  
    // Display the result
    var resultElement = document.getElementById('result');
    resultElement.innerHTML = 'Similarity: ' + similarity.toFixed(2) + '%';
  }
  
  function calculateSimilarity(words1, words2) {
    var commonWords = 0;
  
    // Count common words
    for (var i = 0; i < words1.length; i++) {
      for (var j = 0; j < words2.length; j++) {
        if (words1[i] === words2[j]) {
          commonWords++;
          break;
        }
      }
    }
    // Calculate similarity percentage
    var totalWords = Math.max(words1.length, words2.length);
    var similarity = (commonWords / totalWords) * 100;
  
    return similarity;
  }