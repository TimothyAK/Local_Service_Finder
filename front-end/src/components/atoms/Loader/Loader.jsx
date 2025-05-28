import './Loader.css'

export default function Loader({ isLoading }) {
    return(
        <div id="loader" className="loader" style={{
            display: (!isLoading && 'none')
        }}></div> 
    )
}