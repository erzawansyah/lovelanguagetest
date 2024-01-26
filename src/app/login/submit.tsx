'use client'
import { useFormStatus } from 'react-dom'

export const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            className={`bg-primary hover:bg-primary-dark w-full mt-4 text-white font-bold py-2 px-4 rounded ${pending ? 'disabled:opacity-50' : ''}`}
            disabled={pending}
        >
            {pending ? 'Loading...' : 'Start Quiz'}
        </button>
    )
}