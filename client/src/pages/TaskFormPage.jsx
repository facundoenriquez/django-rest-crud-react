import { useForm } from 'react-hook-form'
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const TaskFormPage = () => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const navigate = useNavigate()
    const params = useParams()

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            await updateTask(data, params.id)
        } else {
            await createTask(data)
        }
        navigate('/')
    })

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const { data } = await getTask(params.id)
                setValue('title', data.title)
                setValue('description', data.description)
            }
        }
        loadTask()
    }, [])



    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="title"
                    {...register("title", { required: true })}
                />
                {errors.title && <span>this field is required</span>}
                <textarea
                    rows={"3"}
                    placeholder="Description"
                    {...register("description", { required: true })}
                ></textarea>
                {errors.description && <span>this field is required</span>}
                <button>Save</button>
            </form>

            {
                params.id && <button onClick={async () => {
                    const accepted = window.confirm('estas seguro?')
                    if (accepted) {
                        await deleteTask(params.id)
                        navigate('/tasks')
                    }
                }}>Delete</button>
            }
        </div>
    )
}
export default TaskFormPage