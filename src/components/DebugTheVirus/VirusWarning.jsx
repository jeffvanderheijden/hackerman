import Warning from '../Icons/Warning';
import "./VirusWarning.css";

const VirusWarning = () => {
    return (
        <div className="virus-warning">
            <Warning />
            <h1>System failure</h1>
        </div>
    )
}

export default VirusWarning;