import React, { useState } from 'react';
import './HelpTooltip.css';

const HelpTooltip = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="help-icon"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            ?
            {visible && (
                <div className="help-tooltip">
                    <p>← → to move</p>
                    <p>Space to jump</p>
                    <p>E to interact</p>
                </div>
            )}
        </div>
    );
};

export default HelpTooltip;