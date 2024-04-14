import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ControlPanel, MainWindow, PageHeader } from './main-window'
import { Project } from '../data/models'
import { SimulacrumWindow } from '../simulacrum/window'
import { getProject } from '../data/requests'

function ViewPageControlPanel({ project }: { project: Project | null }) {
    const navigate = useNavigate()

    return (
        <ControlPanel
            buttons={[
                <button key="runButton">
                    <img src="/assets/images/icons/play-white.png" alt="Запустить проект" />
                </button>,
                <button key="editButton" onClick={() => { if (project) navigate(`/projects/${project.uid}/edit`, { state: project }) }}>
                    <img src="/assets/images/icons/pencil-white.png" alt="Редактировать проект" />
                </button>,
            ]}
        />
    )
}

export function ViewPage() {
    const { uuid } = useParams()
    const [project, setProject] = useState<Project | null>(useLocation().state)

    const loadProject = async () => {
        if (project || !uuid) return
        const projectUpdate = await getProject(uuid)
        setProject(projectUpdate)
    }

    useEffect(() => { loadProject() })

    return (
        <MainWindow
            header={
                <PageHeader
                    title={project?.name || "Project"}
                    controls={<ViewPageControlPanel project={project} />}
                />
            }
            body={<SimulacrumWindow project={ project } />}
        />
    )
}
