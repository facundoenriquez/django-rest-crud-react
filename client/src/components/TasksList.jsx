import { useEffect, useState } from "react"
import { getAllTasks } from '../api/tasks.api'
import { TaskCard } from "./TaskCard"

export const TasksList = () => {

    useEffect(() => {
        async function loadTasks() {
            const { data } = await getAllTasks()
            console.log(data)
            setTasks(data)
        }
        loadTasks()
    }, [])

    const [tasks, setTasks] = useState([])

    return (
        <div>
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}