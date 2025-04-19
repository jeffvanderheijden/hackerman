import React, { useEffect, useState } from 'react';

const HUD = ({ interaction, onSelect, selectedOptions }) => {
    const [input, setInput] = useState("");
    const [justSelected, setJustSelected] = useState(false);

    const isInputMode = interaction?.type === 'input';

    // Handle hotkey selection (1, 2, 3)
    useEffect(() => {
        const handleKeyPress = (e) => {
            const key = e.key;
            if (isInputMode || justSelected) return;

            if (interaction?.options && ["1", "2", "3"].includes(key)) {
                const index = parseInt(key, 10) - 1;
                const option = interaction.options[index];

                if (option) {
                    onSelect(option);
                    setJustSelected(true);
                    setTimeout(() => setJustSelected(false), 100);
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [interaction, onSelect, isInputMode, justSelected]);

    // Reset input when interaction changes
    useEffect(() => {
        setInput("");
    }, [interaction]);

    // Auto-focus the input field
    useEffect(() => {
        if (isInputMode) {
            setTimeout(() => {
                document.getElementById('hud-input')?.focus();
            }, 0);
        }
    }, [isInputMode]);

    if (!interaction) return null;

    const { line, options, validate } = interaction;

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

            {isInputMode ? (
                <form onSubmit={handleInputSubmit}>
                    <input
                        id="hud-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={styles.input}
                    />
                </form>
            ) : (
                options?.map((option, index) => {
                    const wasSelected = selectedOptions?.has(option);
                    return (
                        <div
                            key={index}
                            style={{
                                ...styles.option,
                                ...(wasSelected ? styles.optionUsed : {})
                            }}
                        >
                            <span style={styles.prompt}>[{index + 1}]</span> {option}
                        </div>
                    );
                })
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
    optionUsed: {
        opacity: 0.4,
        fontStyle: 'italic',
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
