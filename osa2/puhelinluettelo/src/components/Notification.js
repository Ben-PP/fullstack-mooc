const Notification = ({notification}) => {
    if (notification === null) return null
    if (notification.className === undefined) notification.className = 'info'
    return (
        <div className={notification.className}>
            {notification.message}
        </div>
    )
}

export default Notification