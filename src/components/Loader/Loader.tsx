import Spinner from 'react-bootstrap/Spinner';
const Loader = () => {
    return(
        <>
        <div className='Loader'>
            <Spinner animation="border" variant='info' className='Loader-Spinner'>
            </Spinner>
        </div>
        
        </>
    )
}
export default Loader;