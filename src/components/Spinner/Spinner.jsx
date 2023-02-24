import '../styles/spinner.css'

function Spinner(props) {
    return (
        <div class="spinner-backdrop" hidden={props.hidden}>
            <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Spinner;
