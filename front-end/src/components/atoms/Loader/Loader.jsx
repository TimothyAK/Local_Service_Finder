import './Loader.css'

export default function Loader({ isLoading }) {
    return(
        <div className="loader" style={{
            display: (!isLoading && 'none')
        }}></div> 
    )
}