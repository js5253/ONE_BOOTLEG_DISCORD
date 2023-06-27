export default function Dialog({visible, children, closeAction, title}) {
    return(
        visible &&
        <div id="dialogOverlay" className={visible ? "" : "hidden"}>
        <div className="dialog">
        <h2>{title}</h2>
        <div className="dialogInnerContent">
        {children}
        <button onClick={closeAction}>Close</button>
        </div>
        </div>
        </div>
    )
}