'use client'

import { useEffect, useState } from 'react';
import styles from './button.module.css'

interface Props {
    id: number,
    title: string,
    parentId?: number,
    parentActivityType?: string,
    parentOperationCategoryType?: string,
    updated: () => void,
    opened: (now: boolean) => void
}

export default function Buttons(props: Props) {
    const token = 'z8aAJDmdkZOGY4v1uSW_gdAa3NwAdVilQRToRGMLQcyH6pHRdVpEjtyyK6fCtajL5yGzoCXfI7kk5Ow5G9TwHkh_iEjAEEl_5EyP54BdEHeZ8whoiA6jrXSqg_F-tmB5Ubktv9reqn7u6MepgoNeElmhWStIG6sOQzPu4M9odzGhrLMN5EinujiJZHeeVd2ZjmrYi_XYW0nuIPzXlSD0f0Enmr6qkt-P8JkZtP-f0FyKEFFcu5NcgSQdwyaQs0t0xFkFJAKsYVdiLy1YmJpPOBxC6h4H-Jy5jAW_CJQ-4MzaTd0NA54E0Wl_okxNY9kFRPhQg4geOJ2J_pIA95mw8vNnex4q9W3UubBx-_lkGtomObVvaul0249ewxQUmbEy0mrhG3Zvxgf-kLI_rpmCKHJ4VJlBth0nN5XyE6B8YSOdNUXmWPVP8rkC9xjKt3v7lNuTuqKA6Av-IFJeUGWtm4Um4_4LGJE54r8PhlfnIWAwI9Xx';
    const [editVisibility, setEditVisibility] = useState(false)
    const [title, setTitle] = useState('')

    const deleteSVG = <svg viewBox="0 0 32 32" width={18} height={18} xmlns="http://www.w3.org/2000/svg">
        <path d="M4,29a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l24-24a1,1,0,1,1,1.42,1.42l-24,24A1,1,0,0,1,4,29Z"/>
        <path d="M28,29a1,1,0,0,1-.71-.29l-24-24A1,1,0,0,1,4.71,3.29l24,24a1,1,0,0,1,0,1.42A1,1,0,0,1,28,29Z"/>
    </svg>

    const admitSVG = <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 16.5858L4.70711 12.7929C4.31658 12.4024 3.68342 12.4024 3.29289 12.7929C2.90237 13.1834 2.90237 13.8166 3.29289 14.2071L7.79289 18.7071C8.18342 19.0976 8.81658 19.0976 9.20711 18.7071L20.2071 7.70711C20.5976 7.31658 20.5976 6.68342 20.2071 6.29289C19.8166 5.90237 19.1834 5.90237 18.7929 6.29289L8.5 16.5858Z" fill="#212121"/>
    </svg>

    const editSVG = <svg viewBox="0 0 128 128" width={18} height={18} xmlns="http://www.w3.org/2000/svg">
        <path d="M64,39A25,25,0,1,0,89,64,25,25,0,0,0,64,39Zm0,44A19,19,0,1,1,83,64,19,19,0,0,1,64,83Z"/>
        <path d="M121,48h-8.93a1,1,0,0,1-.94-.68,49.9,49.9,0,0,0-2-4.85,1,1,0,0,1,.18-1.15L115.62,35a7,7,0,0,0,0-9.9L102.89,12.38a7,7,0,0,0-9.9,0l-6.31,6.31a1,1,0,0,1-1.15.18,49.76,49.76,0,0,0-4.85-2,1,1,0,0,1-.68-.94V7a7,7,0,0,0-7-7H55a7,7,0,0,0-7,7v8.93a1,1,0,0,1-.68.94,49.9,49.9,0,0,0-4.85,2,1,1,0,0,1-1.15-.18L35,12.38a7,7,0,0,0-9.9,0L12.38,25.11a7,7,0,0,0,0,9.9l6.31,6.31a1,1,0,0,1,.18,1.15,49.76,49.76,0,0,0-2,4.85,1,1,0,0,1-.94.68H7a7,7,0,0,0-7,7V73a7,7,0,0,0,7,7h8.93a1,1,0,0,1,.94.68,49.9,49.9,0,0,0,2,4.85,1,1,0,0,1-.18,1.15L12.38,93a7,7,0,0,0,0,9.9l12.73,12.73a7,7,0,0,0,9.9,0l6.31-6.31a1,1,0,0,1,1.15-.18,49.76,49.76,0,0,0,4.85,2,1,1,0,0,1,.68.94V121a7,7,0,0,0,7,7H73a7,7,0,0,0,7-7v-8.93a1,1,0,0,1,.68-.94,49.9,49.9,0,0,0,4.85-2,1,1,0,0,1,1.15.18L93,115.62a7,7,0,0,0,9.9,0l12.73-12.73a7,7,0,0,0,0-9.9l-6.31-6.31a1,1,0,0,1-.18-1.15,49.76,49.76,0,0,0,2-4.85,1,1,0,0,1,.94-.68H121a7,7,0,0,0,7-7V55A7,7,0,0,0,121,48Zm1,25a1,1,0,0,1-1,1h-8.93a7,7,0,0,0-6.6,4.69,43.9,43.9,0,0,1-1.76,4.26,7,7,0,0,0,1.35,8l6.31,6.31a1,1,0,0,1,0,1.41L98.65,111.38a1,1,0,0,1-1.41,0l-6.31-6.31a7,7,0,0,0-8-1.35,43.88,43.88,0,0,1-4.27,1.76,7,7,0,0,0-4.68,6.6V121a1,1,0,0,1-1,1H55a1,1,0,0,1-1-1v-8.93a7,7,0,0,0-4.69-6.6,43.9,43.9,0,0,1-4.26-1.76,7,7,0,0,0-8,1.35l-6.31,6.31a1,1,0,0,1-1.41,0L16.62,98.65a1,1,0,0,1,0-1.41l6.31-6.31a7,7,0,0,0,1.35-8,43.88,43.88,0,0,1-1.76-4.27A7,7,0,0,0,15.93,74H7a1,1,0,0,1-1-1V55a1,1,0,0,1,1-1h8.93a7,7,0,0,0,6.6-4.69,43.9,43.9,0,0,1,1.76-4.26,7,7,0,0,0-1.35-8l-6.31-6.31a1,1,0,0,1,0-1.41L29.35,16.62a1,1,0,0,1,1.41,0l6.31,6.31a7,7,0,0,0,8,1.35,43.88,43.88,0,0,1,4.27-1.76A7,7,0,0,0,54,15.93V7a1,1,0,0,1,1-1H73a1,1,0,0,1,1,1v8.93a7,7,0,0,0,4.69,6.6,43.9,43.9,0,0,1,4.26,1.76,7,7,0,0,0,8-1.35l6.31-6.31a1,1,0,0,1,1.41,0l12.73,12.73a1,1,0,0,1,0,1.41l-6.31,6.31a7,7,0,0,0-1.35,8,43.88,43.88,0,0,1,1.76,4.27,7,7,0,0,0,6.6,4.68H121a1,1,0,0,1,1,1Z"/>
    </svg>

    async function deleteCategory(id: number) {
        await fetch(`https://api.planfact.io/api/v1/operationcategories/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-APIKey': token,
            }
        }).then(function(response) {
            return response.json();
        }).then(function(responseJSON) {
            if (responseJSON.isSuccess) props.updated
            else console.log(`error message: ${responseJSON.errorMessage}, trying to delete category ${id}`)
        });
    }

    async function editCategory() {
        if (!(props.parentActivityType && props.parentId && props.parentOperationCategoryType && title)) {
            console.log(`error occured. not enough data`)
            return
        }

        let fields = {"activityType": props.parentActivityType as string,
        "operationCategoryType": props.parentOperationCategoryType as string,
        "parentOperationCategoryId": (props.parentId as number).toString(),
        "title": title}

        await fetch(`https://api.planfact.io/api/v1/operationcategories/${props.id}`, {
            method: 'PUT',
            body: JSON.stringify(fields),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-APIKey': token,
            }
        }).then(function(response) {
            return response.json();
        }).then(function(responseJSON) {
            if (responseJSON.isSuccess) props.updated
            else console.log(responseJSON.errorMessage)
        });
    }

    useEffect(() => props.opened(editVisibility), [editVisibility])

    return (
    <div className={styles.buttons}>
        { editVisibility? <div onClick={() => editCategory()}>{admitSVG}</div> : null}
        { editVisibility? <input placeholder={props.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/> : null }

        <div className={styles.button} onClick={ () => { setEditVisibility(!editVisibility) } }>
            {editSVG}
        </div>

        <div className={styles.button} onClick={ () => deleteCategory(props.id) }>
            {deleteSVG}
        </div>
    </div>
    )
}