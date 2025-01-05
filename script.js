function openPage() {
    // You can specify the page to navigate to here
    window.location.href = 'text.html';
}
function openPage2() {
    // You can specify the page to navigate to here
    window.location.href = 'index.html';
}

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

function calculateCosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitude1 * magnitude2);
}

function tokenize(text) {
    return text.toLowerCase().split(/\s+/);
}

function vectorize(tokens, vocabulary) {
    return vocabulary.map(word => tokens.filter(token => token === word).length);
}

async function checkSimilarity() {
    const file1 = document.getElementById('fileInput1').files[0];
    const file2 = document.getElementById('fileInput2').files[0];

    if (!file1 || !file2) {
        alert('Please select both files');
        return;
    }

    const content1 = await readFileContent(file1);
    const content2 = await readFileContent(file2);

    const tokens1 = tokenize(content1);
    const tokens2 = tokenize(content2);
    const vocabulary = Array.from(new Set([...tokens1, ...tokens2]));

    const vector1 = vectorize(tokens1, vocabulary);
    const vector2 = vectorize(tokens2, vocabulary);

    const similarity = calculateCosineSimilarity(vector1, vector2);

    document.getElementById('result').innerText = `${(similarity * 100).toFixed(2)}%`;

}