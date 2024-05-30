import { Link } from 'react-router-dom'

export const Navigation = () => {
    return (
        <div>
            <Link to={"/"}>
                <h1>Task App</h1>
            </Link>
            <Link to={"/tasks-create"}>create tasks</Link>
        </div>
    )
}