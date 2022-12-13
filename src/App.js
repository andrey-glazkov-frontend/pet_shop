import { useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { Autorization } from './components/Autorization/Autorization'
import { Main } from './components/Main/Main'
import { Modal } from './components/Modal/Modal'

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken'))

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem('userToken'))
    }
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!token) {
      setIsModalOpen(true)
    }
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <div className="App">
      <Main token={token}>
        <Outlet />
      </Main>
      <Modal closeHandler={closeModal} isOpen={isModalOpen}>
        <Autorization submitAdditionAction={closeModal} />
      </Modal>
    </div>
  )
}

export default App
