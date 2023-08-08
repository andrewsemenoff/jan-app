import { useParams } from "react-router-dom"
import { Title } from "../../App.style";

const Problem = () => {
   const {id}= useParams();
  return (
    <Title>Problem Solution for {id}</Title>
  )
}

export default Problem