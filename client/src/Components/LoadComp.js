import Loader from 'react-js-loader';
const LoaderComp = (props)=>{
    return(
        <div id="loader">
        <Loader type="spinner-circle" visible={props.loading} bgColor={"#000000"}  title={"spinner-circle"} size={100} />
      </div>
    );
}
export default LoaderComp;