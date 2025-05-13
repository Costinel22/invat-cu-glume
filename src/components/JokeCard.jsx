import { useState } from "react";

function JokeCard({ joke }) {
    const [showExample, setShowExample] = useState(false);

    return (
        <div className="joke-card">
            <h3>{joke.formula}</h3>
            <p>{joke.description}</p>
            <blockquote>{joke.joke}</blockquote>

            <button onClick={() => setShowExample(prev => !prev)}>
                {showExample ? "Ascunde exemplul" : "Exemplu real în practică"}
            </button>

            {showExample && (
                <div className="example-box">
                    <strong>Exemplu:</strong> <p>{joke.example}</p>
                </div>
            )}
        </div>
    );
}
