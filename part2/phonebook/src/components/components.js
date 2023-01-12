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

const Notification = ({ notification }) => {
    if (notification === '') {
        return null
    }

    const notificationStyle = {
        color: notification === 'alert' ? 'red' : 'green',
        backgroundColor: 'lightgrey',
        border: 'solid',
        borderColor: 'green',
        borderRadius: 8,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        marginBottom: 10
    }

    return (
        <div style={notificationStyle}>
            {notification}
        </div>
    )
}

export { Filter, Person, Notification }