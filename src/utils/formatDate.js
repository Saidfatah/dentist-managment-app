const format=item=>item<10?`0${item}`:item
const dateFormater =(date)=>{
    const year=date.getFullYear()
    let month=date.getMonth()+1

    month=format(month)
    let day=date.getDate()
    day=format(day)

    return `${day}/${month}/${year}`
}

export default dateFormater