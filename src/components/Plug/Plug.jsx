import { useCallback, useState } from 'react'
import { Autorization } from '../Autorization/Autorization'
import { Modal } from '../Modal/Modal'

export function Plug() {
  const [buttonModel, setButtonModel] = useState(false)

  const openButtonModel = useCallback(() => {
    setButtonModel(true)
  }, [])
  const closeButtonModel = useCallback(() => {
    setButtonModel(false)
  }, [])
  return (
    <>
      <div>
        <p>Пока здесь ничего нет, но если</p>
        {' '}
        <button type="submit" onClick={openButtonModel}>авторизоваться</button>
      </div>
      <Modal closeHandler={closeButtonModel} isOpen={buttonModel}>
        <Autorization submitAdditionAction={closeButtonModel} />
      </Modal>

    </>
  )
}
