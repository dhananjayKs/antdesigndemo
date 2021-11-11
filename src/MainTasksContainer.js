import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import  MainTask  from "./MainTask";
import { Card } from 'antd';



export default function MainTasksContainer() {
    let store=useSelector(store=>store.tasks)
    let mainTasks=Object.keys(store).map(ele=>{
        return <MainTask name ={ele} />
    })
    return (
        <Card title='Tasks'>
            {mainTasks}
        </Card>
    )
}
