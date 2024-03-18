import React, { useState, useEffect } from "react";
import { Table, Button, Card } from "react-bootstrap";
import axios from "axios";
import NavbarCustom from "./NavbarCustom";

function LecturerPage() {
  const weekDay = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const [buses, setBuses] = useState([]);
  const [slots, setSlots] = useState([]);
  const [routes, setRoutes] = useState([]);

  const fetchData = async () => {
    try {
      const busRes = await axios.get("http://localhost:3000/buses");
      const slotRes = await axios.get("http://localhost:3000/slots");
      const routeRes = await axios.get("http://localhost:3000/routes");
      setBuses(busRes.data);
      setSlots(slotRes.data);
      setRoutes(routeRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  function checkSlot(bus, targetWeekDay, time) {
    return bus.slot.flatMap((slotId) =>
      slots.filter(
        (islot) =>
          islot.id === slotId &&
          islot.week_day === targetWeekDay &&
          islot.departure_time === time
      )
    );
  }

  const entryBus = (time) =>
    weekDay.map((day) => (
      <td key={day}>
        {buses.flatMap((bus) => {
          const validSlots = checkSlot(bus, day, time);
          return (
            validSlots.length > 0 &&
            validSlots.map((slot) => {
              const routeBus = routes.find((route) => route.id === bus.routeId);
              return (
                <Card className="m-1 p-2">
                  <div>
                    {routeBus.start_location} - {routeBus.end_location}
                  </div>
                  <div>License Plate: {bus.license_plate}</div>
                  <Button className="mt-3" variant="outline-primary">
                    Register
                  </Button>
                </Card>
              );
            })
          );
        })}
      </td>
    ));

  const times = ["7:00", "9:30", "12:00", "13:00", "14:30", "16:00", "17:40"];

  return (
    <div>
      <div style={{ height: "70px" }}>
        <NavbarCustom />
      </div>
      <Table bordered>
        <thead>
          <tr>
            <th colSpan={2}></th>
            {weekDay.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time, index) => (
            <tr key={time}>
              {index % 4 === 0 && (
                <td rowSpan={4}>{index < 4 ? "Morning" : "Afternoon"}</td>
              )}
              <td>{time}</td>
              {entryBus(time)}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default LecturerPage;
