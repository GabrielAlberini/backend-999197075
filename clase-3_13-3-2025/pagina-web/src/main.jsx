import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Variables from './Variables.jsx'
import TemplateString from './TemplateString.jsx'
import Destructuring from './Destructuring.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Variables /> */}
    {/* <TemplateString /> */}
    <Destructuring nombre="Nicolás" apellido="Giménez" />
  </StrictMode>,
)
