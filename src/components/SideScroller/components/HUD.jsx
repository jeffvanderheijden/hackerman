import React, { useEffect, useState } from 'react';

const HUD = ({ interaction, onSelect }) => {
    const [input, setInput] = useState("");

    useEffect(() => {
        const handleKeyPress = (e) => {
            const key = e.key;
            if (interaction?.type === 'input') { return }; // skip key press if input mode

            if (interaction && ["1", "2", "3"].includes(key)) {
                const index = parseInt(key, 10) - 1;
                if (interaction.options[index]) {
                    onSelect(interaction.options[index]);
                }
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [interaction, onSelect]);

    useEffect(() => {
        setInput("");
    }, [interaction]);

    if (!interaction) return null;

    const { line, options, type, validate } = interaction;

    const handleInputSubmit = (e) => {
        e.preventDefault();
        if (validate) {
            const nextInteraction = validate(input);
            onSelect(nextInteraction);
        }
    };

    return (
        <div style={styles.terminal}>
            <div style={styles.output}>{line}</div>

            {type === 'input' ? (
                <form onSubmit={handleInputSubmit}>
                    <input
                        autoFocus
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={styles.input}
                    />
                </form>
            ) : (
                options?.map((option, index) => (
                    <div key={index} style={styles.option}>
                        <span style={styles.prompt}>[{index + 1}]</span> {option}
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
    terminal: {
        width: 'calc(50% - 20px)',
        background: '#000',
        color: '#00FF00',
        fontFamily: 'monospace',
        padding: '10px',
        fontSize: '14px',
        borderTop: '2px solid #00FF00',
        zIndex: 10,
    },
    output: {
        marginBottom: '8px',
    },
    option: {
        marginBottom: '4px',
    },
    prompt: {
        color: '#0f0',
        marginRight: '8px',
    },
    input: {
        width: '100%',
        background: 'black',
        color: '#00FF00',
        fontFamily: 'monospace',
        border: '1px solid #00FF00',
        padding: '5px',
        fontSize: '14px'
    },
};

export default HUD;
