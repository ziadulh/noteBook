import '../styles/spinner.css'

function Spinner(props) {
    return (
        <div className="spinner-backdrop" hidden={props.hidden}>
            <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Spinner;
