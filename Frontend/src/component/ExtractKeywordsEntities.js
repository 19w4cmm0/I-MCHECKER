import React, { useState } from 'react';
import axios from 'axios';

function ExtractKeywordsEntities() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleExtract = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/text/extract-keywords-entities', { text });
      setResult(response.data.result);
    } catch (error) {
      console.error("Error extracting keywords and entities", error);
    }
  };

  return (
    <div>
      <h2>Extract Keywords and Entities</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleExtract}>Extract</button>
      {result && <p>Result: {result}</p>}
    </div>
  );
}

export default ExtractKeywordsEntities;
