import { useState } from "react"
import { useSelector } from "react-redux"

export default function EditUser() {
    const user = useSelector((state) => state.user)

    const [ isOpen, setIsOpen ] = useState(false)
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')

    const handleEditButtonClick = () => {
        setIsOpen(true)
    }
    const handleCancelButtonClick = () => {
        setIsOpen(false)
        setFirstName('')
        setLastName('')
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }
    const handleSaveButtonClick = () => {
        console.log(firstName, lastName)
    }
    return (
        <div className='user-edit'>
            {isOpen && <div>
                <div className='user-edit-input-container'>
                   <input 
                        type="text"
                        placeholder={user.firstName}
                        onChange={handleFirstNameChange} 
                    />
                    <input 
                        type="text"
                        placeholder={user.lastName}
                        onChange={handleLastNameChange} 
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