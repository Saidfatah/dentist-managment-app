export const thootNumbers =[
    "H1",
    "H2",
    "H3",
    "H4",
]

export const sessionSchema=(toothNumber,intervention,price,received,reste)=>{
    return {
        date:new Date(),
        intervention:intervention || "NOT_ASSIGNED",
        price :price || 0 ,
        received :received || 0 ,
        reste :reste || 0 ,
        toothNumber: toothNumber || "NOT_ASSIGNED"
    }
}

export const clientSchema = (firstName,lastName,CIN,sessions)=>{
  return ({
      firstName,
      lastName,
      CIN ,
      initialBalance:0,
      sessions: sessions || [] ,
      created_at: new Date() ,//use firestor's date 
      updated_at: new Date(), //use firestor's date 
      appointments:[],

      
  })
}

