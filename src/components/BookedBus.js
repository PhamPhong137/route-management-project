// import React, { useEffect, useState } from "react";
// import NavbarCustom from "./NavbarCustom";
// import { Container, Table } from "react-bootstrap";
// import axios from "axios";

// function BookedBus() {
//   const [buses, setBuses] = useState([]);
//   const [slots, setSlots] = useState([]);
//   const [routes, setRoutes] = useState([]);
//   const [slotBusRelationships, setSlotBusRelationships] = useState([]);
//   const [routeRegistrations, setRouteRegistrations] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const busRes = await axios.get("http://localhost:3000/buses");
//       const slotRes = await axios.get("http://localhost:3000/slots");
//       const routeRes = await axios.get("http://localhost:3000/routes");
//       const slotBusRes = await axios.get("http://localhost:3000/slot_bus");
//       const routeRegistraionsRes = await axios.get(
//         "http://localhost:3000/route_registrations?user_id=" + user.id
//       );
//       console.log(routeRegistraionsRes.data);
//       setBuses(busRes.data);
//       setSlots(slotRes.data);
//       setRoutes(routeRes.data);
//       setSlotBusRelationships(slotBusRes.data);
//       setRouteRegistrations(routeRegistraionsRes.data);
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//     }
//   };

//   return (
//     <div>
//       <div style={{ height: "70px" }}>
//         <NavbarCustom />
//       </div>
//       <Container>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Week day</th>
//               <th>Period</th>
//               <th>Route name</th>
//               <th>Start location</th>
//               <th>End location</th>
//               <th>License plate</th>
//               <th>Capacity Bus</th>
//               <th>Departure Time</th>
//               <th>Arrival Time</th>
//               <th>Time booked</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>Mark</td>
//               <td>Otto</td>
//               <td>@mdo</td>
//               <td>1</td>
//               <td>Mark</td>
//               <td>Otto</td>
//               <td>@mdo</td>
//               <td>@mdo</td>
//             </tr>
//           </tbody>
//         </Table>
//       </Container>
//     </div>
//   );
// }

// export default BookedBus;
