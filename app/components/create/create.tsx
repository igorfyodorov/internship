'use client'
import { useState } from 'react'
import styles from './create.module.css'

interface Props {
    setParentListening: () => void,
    parentId?: number,
    parentTitle?: string,
    parentActivityType?: string,
    parentOperationCategoryType?: string,
    updated: () => void
}

export default function Create(props: Props) {
    const token = 'z8aAJDmdkZOGY4v1uSW_gdAa3NwAdVilQRToRGMLQcyH6pHRdVpEjtyyK6fCtajL5yGzoCXfI7kk5Ow5G9TwHkh_iEjAEEl_5EyP54BdEHeZ8whoiA6jrXSqg_F-tmB5Ubktv9reqn7u6MepgoNeElmhWStIG6sOQzPu4M9odzGhrLMN5EinujiJZHeeVd2ZjmrYi_XYW0nuIPzXlSD0f0Enmr6qkt-P8JkZtP-f0FyKEFFcu5NcgSQdwyaQs0t0xFkFJAKsYVdiLy1YmJpPOBxC6h4H-Jy5jAW_CJQ-4MzaTd0NA54E0Wl_okxNY9kFRPhQg4geOJ2J_pIA95mw8vNnex4q9W3UubBx-_lkGtomObVvaul0249ewxQUmbEy0mrhG3Zvxgf-kLI_rpmCKHJ4VJlBth0nN5XyE6B8YSOdNUXmWPVP8rkC9xjKt3v7lNuTuqKA6Av-IFJeUGWtm4Um4_4LGJE54r8PhlfnIWAwI9Xx';

    const [stage, setStage] = useState(0)
    const [listening, setListening] = useState(false)
    const stageClasses = [styles.stage0, styles.stage1]
    var classnames = `${styles.add} ${stageClasses[stage]}`
    const [title, setTitle] = useState('')

    const cancelSVG = <svg width={18} height={18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><g id="Complete"><g id="x"><g><line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="19" y1="4.8" y2="19.2"/><line fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="19" x2="5" y1="4.8" y2="19.2"/></g></g></g></svg>
  
    const admitSVG = <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 16.5858L4.70711 12.7929C4.31658 12.4024 3.68342 12.4024 3.29289 12.7929C2.90237 13.1834 2.90237 13.8166 3.29289 14.2071L7.79289 18.7071C8.18342 19.0976 8.81658 19.0976 9.20711 18.7071L20.2071 7.70711C20.5976 7.31658 20.5976 6.68342 20.2071 6.29289C19.8166 5.90237 19.1834 5.90237 18.7929 6.29289L8.5 16.5858Z" fill="#212121"/>
    </svg>
    
    async function admitCreation() {
        if (!(props.parentActivityType && props.parentOperationCategoryType && props.parentId && title.length > 0)) {
            console.log('error creating category: not enough data')
            return
        }

        let fields = {"activityType": props.parentActivityType as string,
        "operationCategoryType": props.parentOperationCategoryType as string,
        "parentOperationCategoryId": (props.parentId as number).toString(),
        "title": title}

        await fetch(`https://api.planfact.io/api/v1/operationcategories`, {
            method: 'POST',
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
            else console.log(`error creating category ${title}: ${responseJSON.errorMessage}`);

            setStage(0)
        })
    }

    return (
        <div className={classnames} onClick={ stage == 0? () => setStage(1) : undefined }>
            { stage == 1?
            <div className={styles.parent} onClick={() => { props.setParentListening(); setListening(!listening) }}>
                <p>{ listening && !props.parentTitle? '(Нажмите на название)' : props.parentTitle? props.parentTitle : 'Выберите родительскую категорию' }</p>
            </div> : null }

            { stage == 1?
            <div className={styles.title}>
                <input placeholder='Назовите новую категорию...' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/>
            </div> : null }

            { stage == 1? 
            <div className={styles.buttons}>
                <div onClick={ () => admitCreation()}> {admitSVG} </div>
                <div onClick={ () => setStage(0)}> {cancelSVG} </div>
            </div> : null }
        </div>
    )
}