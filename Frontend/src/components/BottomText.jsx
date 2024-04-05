/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const BottomText = ({text, to, label}) => {
    return <div className="text-center mb-4">
        {text}
        <Link className='pl-1  underline cursor-pointer' to={to}>{label}</Link>
    </div>
}
export default BottomText;