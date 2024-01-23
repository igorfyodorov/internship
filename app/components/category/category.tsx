'use client'
import { useEffect, useState } from 'react';
import Buttons from './buttons/buttons';
import styles from './category.module.css'

interface Props {
    ml: number,
    operationCategoryId: number,
    title: string,
    updated: () => void,
    chosenForCreation: (id: number) => void,
    parentId?: number,
    activityType?: string,
    parentOperationCategoryType?: string,
}

export default function Category(props: Props) {
    const [device, setDevice] = useState('')
    const [editOpened, setEditOpened] = useState(false)

    const changeEditVisibility = (now: boolean) => { setEditOpened(now) }

    useEffect(() => {
        if (window.innerWidth <= 600) setDevice('Phone')
        else setDevice('PC')
    }, [])

    return (
        <div className={styles.category} style={{marginLeft: `${props.ml * 15}px`, width: `calc(100% - ${props.ml*15}px)`}}>
            <p onClick={() => props.chosenForCreation(props.operationCategoryId)}>{ editOpened && device == 'Phone'? '' : props.title}</p>

            <Buttons opened={changeEditVisibility} id={props.operationCategoryId} updated={props.updated} title={props.title} parentId={props.parentId} parentActivityType={props.activityType}
            parentOperationCategoryType={props.parentOperationCategoryType}/>
        </div>
    )
}