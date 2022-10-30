import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import Grade from '../components/Grade'
import AddButton from '../components/AddButton'
import { useNavigate } from 'react-router-dom'
import BottomNavbar from "../components/BottomNavbar";
import { getEnabledTeachers } from "../services/controllerDirector";
import uuid from 'react-uuid'

const Grades = () => {
  localStorage.removeItem("grade")
  localStorage.removeItem("teachers")
  const navigate = useNavigate()
  const [grades, setGrades] = useState([]);
  const handleClick = async () => {
    let response = await getEnabledTeachers();
    if (response.status === 200) {
      console.log(response.body);
      const teachersJSON = JSON.stringify(response.body)
      localStorage.setItem('teachers', teachersJSON)
    } else {
      console.log(response.body);
    }
    navigate('/grades/create')
  }
  useEffect(() => {
    const gradeJSON = localStorage.getItem('grades')
    const grade = JSON.parse(gradeJSON)
    setGrades(grade)
  }, []);
  const getGrades = grades.map((levelGrade) =>
    levelGrade.grades.map((grade) =>
      <div key={uuid()}>
        {grade.position === 0 ? <h1 className='h1-administracion' key={levelGrade.id}>{levelGrade.level_name}</h1> : ""}
        <Grade key={grade.id} curso={grade.grade_name} encargado={grade.teacherRef.displayName} id={grade.id} alumnos={grade.totalStudents} />
      </div>
    )
  )
  return (
    <>
      <div className='contenedor contenedor-admin mb-[80px]'>
        <SearchBar />
        {getGrades}
        <AddButton function={handleClick} />
      </div>
      <BottomNavbar />
    </>
  )
}

export default Grades