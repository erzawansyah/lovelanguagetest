'use client'
import { QuizStoreTypes, useQuizStore } from '@/helpers/store/quiz'
import React from 'react'

type Props = {
    data: QuizStoreTypes['data'],
}

const StoreProvider = (props: Props) => {
    const { setData, setTotal } = useQuizStore()

    React.useEffect(() => {
        setData(props.data)
        setTotal(props.data.page.length)
    }, [props.data, setData, setTotal])

    return <>  </>
}

export default StoreProvider