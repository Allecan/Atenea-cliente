import React from 'react'
import ItemComboBox from './ItemComboBox'
import { useState } from 'react';
import uuid from 'react-uuid'
import DropDown from "../assets/images/drop-down.svg";
import DropUp from "../assets/images/drop-up.svg";
const ComboBox = (props) => {
    const [active, setActive] = useState("")
    const [hidden, setHidden] = useState("hidden")
    const [dropImage, setDropImage] = useState(DropDown)
    const [inputValue, setInputValue] = useState('')
    const changeInputValue = (teacher) => {
        document.getElementById('teacher').placeholder = ''
        setInputValue(teacher)
    }
    const changeState = () => {
        if (active !== 'combo-box-active') {
            setActive("combo-box-active")
            setHidden("")
            setDropImage(DropUp)
        } else {
            setActive("")
            setHidden("hidden")
            setDropImage(DropDown)
        }
    }
    const teacherList = props.teachers.map((item, index) =>
        <div key={uuid()}>
            <ItemComboBox key={uuid()} name={item} function={changeInputValue} />
            {index !== props.teachers.length - 1 ? <hr className='administracion' key={uuid()} style={{ marginTop: '0px' }} /> : <></>}
        </div>
    );
    return (
        <>
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={changeState}>
                <input className={`font-normal w-full combo-box ${active}`}
                    placeholder='Seleccionar docente'
                    readOnly
                    id='teacher'
                    required
                    value={inputValue}
                />
                <img src={dropImage} alt='More information' style={{ position: 'absolute', top: '0', bottom: '0', margin: 'auto 0', right: '20px' }} />
            </div>
            <div className={`${hidden}`}>
                <div className='combo-box-container'>
                    {teacherList}
                </div>
            </div>
        </>
    )
}

export default ComboBox
