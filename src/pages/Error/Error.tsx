import { useRouteError, } from "react-router-dom";

interface ErrorObj{
    data: string,
    internal: boolean,
    status: number,
    statusText: string,
}
const Error = () => {
    
    const {data} = useRouteError() as ErrorObj;
  return <div>
    {`Ooooops! ${data}`}
  </div>;
};

export default Error;
