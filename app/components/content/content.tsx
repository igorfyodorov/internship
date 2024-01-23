'use client'

import { useCallback, useEffect, useState } from 'react';
import styles from './content.module.css'
import Category from '../category/category';
import Create from '../create/create';

interface NavigationTab {
  id: number,
  text: string,
  shortenedText: string
}

interface AccountCategory {
  accountCategoryType?: string,
  actionStatus?: string,
  activityType?: string,
  canAddOrDeleteSubCategory?: boolean,
  canChangeCategory?: boolean,
  canChangeParent?: boolean,
  canUpdateOrDelete?: boolean,
  comment?: string,
  createDate?: string,
  externalId?: string,
  isFixed?: boolean,
  isVisible?: boolean,
  modifyDate?: string,
  operationCategoryBalanceType?: string,
  operationCategoryId: number,
  operationCategoryMoneyTypeId?: string,
  operationCategoryType?: string,
  outcomeClassification?: string,
  parentOperationCategoryId?: number,
  sort?: number,
  specialAttributes?: string[],
  title?: string
}

export default function Content() {
  const token = 'z8aAJDmdkZOGY4v1uSW_gdAa3NwAdVilQRToRGMLQcyH6pHRdVpEjtyyK6fCtajL5yGzoCXfI7kk5Ow5G9TwHkh_iEjAEEl_5EyP54BdEHeZ8whoiA6jrXSqg_F-tmB5Ubktv9reqn7u6MepgoNeElmhWStIG6sOQzPu4M9odzGhrLMN5EinujiJZHeeVd2ZjmrYi_XYW0nuIPzXlSD0f0Enmr6qkt-P8JkZtP-f0FyKEFFcu5NcgSQdwyaQs0t0xFkFJAKsYVdiLy1YmJpPOBxC6h4H-Jy5jAW_CJQ-4MzaTd0NA54E0Wl_okxNY9kFRPhQg4geOJ2J_pIA95mw8vNnex4q9W3UubBx-_lkGtomObVvaul0249ewxQUmbEy0mrhG3Zvxgf-kLI_rpmCKHJ4VJlBth0nN5XyE6B8YSOdNUXmWPVP8rkC9xjKt3v7lNuTuqKA6Av-IFJeUGWtm4Um4_4LGJE54r8PhlfnIWAwI9Xx';

  const [activeTab, switchTab] = useState(5899640) // активная вкладка

  const [device, setDevice] = useState('') // определение необходимости сжатия контента

  const [updated, setUpdated] = useState(false) // работа с добавлением, изменением и удалением категорий
  const [listening, setListening] = useState(false)
  const [chosenParent, setChosenParent] = useState(0)

  const listeningForCreate = () => setListening(!listening) // функции для передачи в дочерние компоненты для реализации действий с категориями
  const listWasUpdated = useCallback(() => setUpdated(true), [])
  const chooseParent = (id: number) =>  { if (listening) setChosenParent(id) }

  const [render, setRender] = useState<number[][]>([]) // создание списка категорий для отображения
  const [categories, setCategories] = useState<AccountCategory[]>([])

  async function getData() { // запрос к API для получения статей
    if (!updated && categories.length) return

    await fetch('https://api.planfact.io/api/v1/operationcategories?paging.limit=100', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-APIKey': token,
    }}).then(function(response) {
      return response.json();
    }).then(function(responseJSON) {
      if(responseJSON.isSuccess) {
        setCategories(responseJSON.data.items)
        if (updated) setUpdated(false)
      }
      else console.log(responseJSON.errorMessage);
    })
  }

  function loadCategories() { // список для рендеринга категорий
    let changed = true
    let handled: number[] = []
    let ready: number[][] = []

    let connections = categories.map(item => [item.operationCategoryId,
      ...categories.filter(obj => obj.parentOperationCategoryId == item.operationCategoryId).map(obj => obj.operationCategoryId)]).filter(item => item.length > 1)

    let sure = connections.find(item => item[0] == activeTab)
    if (sure) ready = [...ready, ...sure.slice(1).map(item => [0, item])]

    while (changed) {
      if (!ready.find(item => !handled.includes(item[1]) && connections.find(obj => obj[0] == item[1]))) changed = false

      else {
        let sure = ready.find(item => !handled.includes(item[1]) && connections.find(obj => obj[0] == item[1])) as number[]
        let sureIndex = ready.indexOf(sure)
        let sure1 = connections.find(item => item[0] == sure[1])?.slice(1)

        if (sure1) ready = [...ready.slice(0, sureIndex + 1), ...sure1.map(item => [sure[0] + 1, item]), ...ready.slice(sureIndex + 1)]
        handled.push(sure[1])
      }
    }

    setRender(ready)
  }

  useEffect(() => { getData() }, [updated])
  useEffect(() => { loadCategories() }, [activeTab, categories])
  useEffect(() => { if (!listening) setChosenParent(0) }, [listening, chosenParent])
  useEffect(() => { if (window.innerWidth <= 700) setDevice('Phone'); else setDevice('PC')})

  const navigationTabs: NavigationTab[] = [
    {id: 5899640, text: 'Активы', shortenedText: 'Активы'},
    {id: 5899680, text: 'Доходы', shortenedText: 'Доходы'},
    {id: 5899675, text: 'Капитал', shortenedText: 'Капитал'},
    {id: 5899663, text: 'Обязательства', shortenedText: 'Обяз-ва'},
    {id: 5899687, text: 'Расходы', shortenedText: 'Расходы'}];

  return (
    <div className={styles.wrapper}>
      <div className={styles.navigation}> 
        { navigationTabs.map(tab =>
        <div className={activeTab == tab.id? styles.activeTab : undefined}
            id={tab.id.toString()}
            key={tab.id}
            onClick={() => switchTab(tab.id)}>
          <p>{ device == 'PC'? tab.text : tab.shortenedText }</p>
        </div>) }
      </div>

      <div className={styles.main}>
        { render.map(item =>
        <Category ml={item[0]}
                  key={item[1]}
                  operationCategoryId={item[1]}
                  title={categories.find(obj => obj.operationCategoryId == item[1])?.title as string}
                  updated={listWasUpdated}
                  chosenForCreation={chooseParent}
                  parentId={categories.find(obj => obj.operationCategoryId == item[1])?.parentOperationCategoryId}
                  activityType={categories.find(obj => obj.operationCategoryId == item[1])?.activityType}
                  parentOperationCategoryType={categories.find(obj => obj.operationCategoryId == item[1])?.operationCategoryType}/>
        ) }
      </div>
        <Create setParentListening={listeningForCreate}
                parentId={chosenParent? chosenParent : undefined}
                parentTitle={chosenParent? categories.find(item => item.operationCategoryId == chosenParent)?.title : undefined}
                parentActivityType={chosenParent? categories.find(item => item.operationCategoryId == chosenParent)?.activityType : undefined}
                parentOperationCategoryType={chosenParent? categories.find(item => item.operationCategoryId == chosenParent)?.operationCategoryType : undefined}
                updated={listWasUpdated}/>
    </div>
  )
}