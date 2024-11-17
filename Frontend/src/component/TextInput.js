import React, { useState } from 'react';
import axios from 'axios';

const TextInput = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/text/process', { text });
            setResult(response.data);
        } catch (error) {
            console.error('Error processing text', error);
        }
    };

    return (
        <div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows="10"
                cols="50"
                placeholder="Enter text to process"
            ></textarea>
            <button onClick={handleSubmit}>Process Text</button>
            {result && (
                <div>
                    <h3>Results:</h3>
                    <p>Word Count: {result.wordCount}</p>
                    <p>Character Count: {result.charCount}</p>
                    <p>Paragraph Count: {result.paragraphCount}</p>
                    <p>Sentence Count: {result.sentenceCount}</p>
                </div>
            )}
        </div>
    );
};

export default TextInput;
