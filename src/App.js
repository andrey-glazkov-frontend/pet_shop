import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { Autorization } from './components/Autorization/Autorization'
import { Main } from './components/Main/Main'
import { Modal } from './components/Modal/Modal'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true)

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <div className="App">
      <Main>
        <Outlet />
      </Main>
      <Modal closeHandler={closeModal} isOpen={isModalOpen}>
        <Autorization submitAdditionAction={closeModal} />
      </Modal>
    </div>
  )
}

export default App
