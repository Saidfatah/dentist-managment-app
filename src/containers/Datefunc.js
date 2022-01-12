

export const Datefunc = () => {
    
    const date=new Date()
    const year=date.getFullYear()
    let month=date.getMonth()+1
    month=format(month)
    let day=date.getDate()
    day=format(day)

    function format(item){
    return (item<10?`0${item}`:item)
}
    const newdate=`${day}/${month}/${year}`

    
    return (
           <>
            <input value={newdate} readonly />
           </>
        
    )
}


