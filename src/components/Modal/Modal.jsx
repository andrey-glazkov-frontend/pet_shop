/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import modalStyles from './modal.module.css'

function ModalContent({ children, closeHandler }) {
  useEffect(() => {
    const listenerHandler = (e) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    }

    document.addEventListener('keydown', listenerHandler)

    return () => {
      document.removeEventListener('keydown', listenerHandler)
    }
  }, [closeHandler])

  return (
    <div className={modalStyles.modalContent}>
      <button onClick={closeHandler} type="submit">
        close
      </button>
      {children}
    </div>
  )
}

export function Modal({ closeHandler, isOpen = true, children }) {
  if (!isOpen) return null

  const clickHandler = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="modalWr" onClick={clickHandler}>
      <ModalContent closeHandler={closeHandler}>
        {children}
      </ModalContent>
    </div>,
    document.getElementById('modal-root'),
  )
}
