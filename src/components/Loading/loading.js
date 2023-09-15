import './loading.css';

// Function that displays a loader when loading a page
function Loading() {
    return (
        <div className="position">
            <div className="spin1" role="status">
                <span className="spin2">Loading...</span>
            </div>
        </div>
    )
}

export default Loading;