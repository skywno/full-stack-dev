const Filter = ({ value, onChange }) => {
    return (
        <div>
            filter shown with <input value={value} onChange={onChange} />
        </div>
    )
}

const Person = ({ name, number, onDelete }) => {
    return (
        <div>
            {name} {number}
            <button onClick={onDelete}> delete </button>
        </div>

    )
}

const Notification = ({ message }) => {
    const successNotificationStyle = {
        color: 'green',
        backgroundColor: 'lightgrey',
        border: 'solid',
        borderColor: 'green',
        borderRadius: 8,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        marginBottom: 10
    }

    const failNotificationStyle = {
        color: 'red',
        backgroundColor: 'lightgrey',
        border: 'solid',
        borderColor: 'red',
        borderRadius: 8,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        marginBottom: 10
    }

    if (message === '') {
        return null
    }

    return (
        <div style={message.includes('already') ? failNotificationStyle : successNotificationStyle}>
            {message}
        </div>
    )


}

export { Filter, Person, Notification }