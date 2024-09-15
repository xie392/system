import { useParams } from 'react-router-dom'

const InfoPage = () => {
    const { id } = useParams()

    console.log(id)

    return <div>Info Page {id}</div>
}
export default InfoPage
