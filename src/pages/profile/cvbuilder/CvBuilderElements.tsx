import React from "react"
import { Employee } from "../../../../models/Employee"
import EditableWorkExperience from "./components/EditableWorkExperience"
import { Button } from "antd"
import EditableEducation from "./components/EditableEducation"
import EditablePersonalProjects from "./components/EditablePersonalProjects"
import EditableStringArray from "./components/EditableStringArray"

export const WorkExperienceCol = (user: Employee, setUser: (user: Employee) => void) => {
    return <>
        <h2>Work History</h2>
        {user?.workExperience.map((we, i) => <EditableWorkExperience workExperience={we} onChange={(we) => setUser({
            ...user,
            workExperience: [
                ...user.workExperience.slice(0, i),
                we,
                ...user.workExperience.slice(i + 1)
            ]
        })}
            onDelete={() => setUser({
                ...user,
                workExperience: [
                    ...user.workExperience.slice(0, i),
                    ...user.workExperience.slice(i + 1)
                ]
            })} />)}
        <Button type="dashed" onClick={() => {
            setUser({
                ...user,
                workExperience: [
                    ...user.workExperience,
                    {
                        companyName: "",
                        title: "",
                        description: "",
                        location: "",
                        period: [new Date().toISOString(), new Date().toISOString()]
                    }
                ]
            })
        }}>+ Add Work Experience</Button>
    </>
}

export const EducationCol = (user, setUser) => {
    return <>
        <h2>Education</h2>
        {user?.education.map((ed, i) => <EditableEducation education={ed} onChange={(ed) => setUser({
            ...user,
            education: [
                ...user.education.slice(0, i),
                ed,
                ...user.education.slice(i + 1)
            ]
        })}
            onDelete={() => setUser({
                ...user,
                education: [
                    ...user.education.slice(0, i),
                    ...user.education.slice(i + 1)
                ]
            })} />)}
        <Button type="dashed" onClick={() => {
            setUser({
                ...user,
                education: [
                    ...user.education,
                    {
                        courses: [],
                        institution: "",
                        study: "",
                        period: [new Date().toISOString(), new Date().toISOString()]
                    }
                ]
            })
        }}>+ Add Education</Button>
    </>
}

export const ProjectCol = (user, setUser) => {
    return <>
        <h2>Personal Projects</h2>

        {user?.projects.map((p, i) => <EditablePersonalProjects workProject={p} onChange={(p) => setUser({
            ...user,
            projects: [
                ...user.projects.slice(0, i),
                p,
                ...user.projects.slice(i + 1)
            ]
        })}
            onDelete={() => setUser({
                ...user,
                projects: [
                    ...user.projects.slice(0, i),
                    ...user.projects.slice(i + 1)
                ]
            })} />)}
        <Button type="dashed" onClick={() => {
            setUser({
                ...user,
                projects: [
                    ...user.projects,
                    {
                        description: "",
                        name: "",
                        link: "",
                        period: [new Date().toISOString(), new Date().toISOString()]
                    }
                ]
            })
        }}>+ Add Projects</Button>
    </>
}

export const SkillsCol = (user: Employee, setUser) => <>
    <h2>Skills</h2>
    <EditableStringArray name="skill" array={user?.skills} onChange={(skills) => {
        setUser({
            ...user,
            skills
        })
    }} />
</>

export const InterestsCol = (user: Employee, setUser) => <>
    <h2>Interest</h2>
    <EditableStringArray name="interest" array={user?.interests} onChange={(interests) => {
        setUser({
            ...user,
            interests
        })
    }} />
</>