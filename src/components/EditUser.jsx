import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { modifyUserProfile } from "../app/middlewares"


export default function EditUser() {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [ isOpen, setIsOpen ] = useState(false)
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')

    const resetDialog = () => {
        setIsOpen(false)
        setFirstName('')
        setLastName('')
    }
    const handleEditButtonClick = () => {
        setIsOpen(true)
    }
    const handleCancelButtonClick = () => {
        resetDialog()
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }
    const handleSaveButtonClick = () => {
        dispatch(modifyUserProfile({firstName, lastName}))
        resetDialog()
    }
    return (
        <div className='user-edit'>
            {isOpen && <div>
                <div className='user-edit-input-container'>
                   <input 
                        type="text"
                        placeholder={user.firstName}
                        onChange={handleFirstNameChange}
                        value={firstName} 
                    />
                    <input 
                        type="text"
                        placeholder={user.lastName}
                        onChange={handleLastNameChange}
                        value={lastName}
                    /> 
                </div>
                <div className='user-edit-submit-container'>
                    <button
                        onClick={handleSaveButtonClick}
                    >Save</button>
                    <button
                        onClick={handleCancelButtonClick}
                    >Cancel</button> 
                </div>
               
            </div>}
           {!isOpen && <button 
                            className="user-edit-button"
                            onClick={handleEditButtonClick}
                        >Edit Name</button>} 
        </div>
        
    )
}