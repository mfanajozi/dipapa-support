"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Bus {
  id: number;
  depart_from: string;
  depart_time: string;
  destination: string;
  bus_registration: string;
  bus_driver: string;
  model: string;
}

export default function BusSchedule() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const supabase = createClientComponentClient();
  const [open, setOpen] = useState(false);
  const [newBus, setNewBus] = useState<Omit<Bus, 'id'>>({
    depart_from: "",
    depart_time: "",
    destination: "",
    bus_registration: "",
    bus_driver: "",
    model: "",
  });

  useEffect(() => {
    async function getBuses() {
      const { data } = await supabase.from("bus").select("*");
      setBuses(data as Bus[]);
    }

    getBuses();
  }, [supabase]);

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('bus')
        .insert([newBus])
        .select()
      if (error) {
        console.error('Error inserting data:', error)
      } else {
        console.log('Successfully inserted data:', data)
        setBuses([...buses, ...data as Bus[]]);
        setOpen(false);
        setNewBus({
          depart_from: "",
          depart_time: "",
          destination: "",
          bus_registration: "",
          bus_driver: "",
          model: "",
        });
      }
    } catch (error) {
      console.error('There was an error inserting data:', error)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBus(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Bus Schedule</h1>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 shadow-md shadow-orange-300">
                Add A Bus Schedule
              </Button>
            </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add A Bus Schedule</DialogTitle>
              <DialogDescription>
                Add a new bus schedule to the table.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="depart_from" className="text-right">
                  Depart From
                </Label>
                <Input id="depart_from" name="depart_from" value={newBus.depart_from} onChange={handleChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="depart_time" className="text-right">
                  Depart Time
                </Label>
                <Input id="depart_time" name="depart_time" value={newBus.depart_time} onChange={handleChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="destination" className="text-right">
                  Destination
                </Label>
                <Input id="destination" name="destination" value={newBus.destination} onChange={handleChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bus_registration" className="text-right">
                  Bus Registration
                </Label>
                <Input id="bus_registration" name="bus_registration" value={newBus.bus_registration} onChange={handleChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bus_driver" className="text-right">
                  Bus Driver
                </Label>
                <Input id="bus_driver" name="bus_driver" value={newBus.bus_driver} onChange={handleChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="model" className="text-right">
                  Model
                </Label>
                <Input id="model" name="model" value={newBus.model} onChange={handleChange} className="col-span-3" />
              </div>
            </div>
            <Button onClick={handleSubmit}>Add Bus Schedule</Button>
          </DialogContent>
        </Dialog>
      </div>
      {buses && buses.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Depart From</th>
                <th scope="col" className="px-6 py-4 font-semibold">Depart Time</th>
                <th scope="col" className="px-6 py-4 font-semibold">Destination</th>
                <th scope="col" className="px-6 py-4 font-semibold">Bus Registration</th>
                <th scope="col" className="px-6 py-4 font-semibold">Bus Driver</th>
                <th scope="col" className="px-6 py-4 font-semibold">Model</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus, index) => (
                <tr
                  key={bus.id}
                  className={`${
                    index % 2 === 0 ? "bg-orange-50" : "bg-yellow-50"
                  } hover:bg-orange-100 transition-colors duration-300`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{bus.depart_from}</td>
                  <td className="px-6 py-4 text-gray-800">{bus.depart_time}</td>
                  <td className="px-6 py-4 text-gray-800">{bus.destination}</td>
                  <td className="px-6 py-4 text-gray-800">{bus.bus_registration}</td>
                  <td className="px-6 py-4 text-gray-800">{bus.bus_driver}</td>
                  <td className="px-6 py-4 text-gray-800">{bus.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No bus schedules found.</p>
      )}
    </div>
  );
}
