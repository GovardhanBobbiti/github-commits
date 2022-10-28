
const Commit = ({ message, committer, date }) => {

    function getDate() {
        let [monthDate, time] = new Date(date).toLocaleString().split(', ');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];  
        const [month, day] = monthDate.split('/');
        const [timeStamp, type] = time.split(' ');

        return `${months[month  - 1]} ${day}, ${timeStamp.substring(0, 4)} ${type}`
    }

    return (
        <div className="commit">
            <div className="message">{message}</div>
            <div>
                <span className="date">{getDate()}</span>
                <span className="committer"> by {committer}</span>
            </div>
        </div>
    )
}

export default Commit;