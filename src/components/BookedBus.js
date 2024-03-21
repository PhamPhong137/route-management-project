import React, { useEffect, useState } from "react";
import NavbarCustom from "./NavbarCustom";
import { Container, Table } from "react-bootstrap";
import axios from "axios";

function BookedBus() {
  const [buses, setBuses] = useState([]);
  const [slots, setSlots] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [slotBusRelationships, setSlotBusRelationships] = useState([]);
  const [routeRegistrations, setRouteRegistrations] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const busRes = await axios.get("http://localhost:3000/buses");
      const slotRes = await axios.get("http://localhost:3000/slots");
      const routeRes = await axios.get("http://localhost:3000/routes");
      const slotBusRes = await axios.get("http://localhost:3000/slot_bus");
      const routeRegistraionsRes = await axios.get(
        "http://localhost:3000/route_registrations?user_id=" + user.id
      );
      console.log(routeRegistraionsRes.data);
      setBuses(busRes.data);
      setSlots(slotRes.data);
      setRoutes(routeRes.data);
      setSlotBusRelationships(slotBusRes.data);
      setRouteRegistrations(routeRegistraionsRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const getBus = (id) => {
    return buses.find((bus) => bus.id === id);
  };

  const getSlot = (id) => {
    return slots.find((slot) => slot.id === id);
  };

  const getRoute = (id) => {
    return routes.find((route) => route.id === id);
  };

  const getSlotBus = (id) => {
    return slotBusRelationships.find((slot_bus) => slot_bus.id === id);
  };

  return (
    <div>
      <div style={{ height: "70px" }}>
        <NavbarCustom />
      </div>
      <Container>
        <h1 className="text-center mb-4">History of BookedBus</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Week day</th>
              <th>Period</th>
              <th>Route name</th>
              <th>Start location</th>
              <th>End location</th>
              <th>License plate</th>
              <th>Capacity Bus</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Time booked</th>
            </tr>
          </thead>
          <tbody>
            {routeRegistrations.map((registration) => (
              <tr key={registration.id}>
                <td>
                  {getSlot(getSlotBus(registration.slot_bus).slot_id).week_day}
                </td>
                <td>
                  {getSlot(getSlotBus(registration.slot_bus).slot_id).period}
                </td>
                <td>
                  {
                    getRoute(getSlotBus(registration.slot_bus).route_id)
                      .route_name
                  }
                </td>
                <td>
                  {
                    getRoute(getSlotBus(registration.slot_bus).route_id)
                      .start_location
                  }
                </td>
                <td>
                  {
                    getRoute(getSlotBus(registration.slot_bus).route_id)
                      .end_location
                  }
                </td>
                <td>
                  {
                    getBus(getSlotBus(registration.slot_bus).bus_id)
                      .license_plate
                  }
                </td>
                <td>
                  {getBus(getSlotBus(registration.slot_bus).bus_id).capacity}
                </td>
                <td>
                  {
                    getSlot(getSlotBus(registration.slot_bus).slot_id)
                      .departure_time
                  }
                </td>
                <td>
                  {
                    getSlot(getSlotBus(registration.slot_bus).slot_id)
                      .arrival_time
                  }
                </td>
                <td>{registration.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default BookedBus;
