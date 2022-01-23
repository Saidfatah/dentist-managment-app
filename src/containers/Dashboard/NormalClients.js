import React, { useState } from "react";
import { isNormalClient } from "../../store/models/clients/client.utils";
const NormalClients = ({ clientsVisitingToday }) => {
  const [normalClientsVisitingToday, setNormalClientsVisitingToday] = useState([
    ...clientsVisitingToday.filter(isNormalClient),
  ]);
  //[TODO_BEKRINE] make sure this returns the right array
  console.log(normalClientsVisitingToday);

  //[TODO_BEKRINE] create two diffrent arrays
  //one is clientWhoHaventAttendedYet this means clients where hasAttended === false
  //two is clientWhoHaveAttended this means clients where hasAttended === true
  return (
    <div>
      normalClients
      {/*[TODO_BEKRINE] map over clientWhoHaventAttendedYet display them in table add a button to confirmAtendence by calling confirmClientAttendence effect  */}
      {/*[TODO_BEKRINE] map over clientWhoHaveAttended display them in table */}
    </div>
  );
};

export default NormalClients;
