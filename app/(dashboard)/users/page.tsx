'use client'
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/lib/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddUserForm from "@/components/AddUserForm";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [student_id, setStudentId] = useState("");
  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alt_phone, setAltPhone] = useState("");
  const [id_number, setIdNumber] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [start_date, setStartDate] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [home_address, setHomeAddress] = useState("");
  const [province, setProvince] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [locality, setLocality] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [disability, setDisability] = useState("");
  const [employment_status, setEmploymentStatus] = useState("");
  const [sassa_grant, setSassaGrant] = useState("");
  const [highest_education, setHighestEducation] = useState("");
  const [institution, setInstitution] = useState("");
  const [education_mark, setEducationMark] = useState("");
  const [year_completed, setYearCompleted] = useState("");
  const [program, setProgram] = useState("");
  const [trade, setTrade] = useState("");

  const fetchUsers = async () => {
    let { data, error } = await supabase
      .from('students')
      .select('student_id, email, phone, sdp_match, id_number, first_name, middle_name, surname, start_date, date_of_birth, gender, race, comment, program, trade, bio, final_selection, initiated_registration_process, african_bank_account_number, medical_fitness, user_id, auth_user_id');

    if (error) {
      console.error("Error fetching users:", error);
    } else {
      setUsers(data || []);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRowClick = async (user: any) => {
    setSelectedUser(user);
    setIsEditMode(true);

    // Fetch user data from the students table
    let { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error("Error fetching user details:", error);
      alert("Error fetching user details!");
    } else {
      // Populate the form fields with the fetched data
      setStudentId(data.student_id || "");
      setFirstName(data.first_name || "");
      setMiddleName(data.middle_name || "");
      setSurname(data.surname || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setAltPhone(data.alt_phone || "");
      setIdNumber(data.id_number || "");
      setDateOfBirth(data.date_of_birth || "");
      setStartDate(data.start_date || "");
      setGender(data.gender || "");
      setRace(data.race || "");
      setHomeAddress(data.home_address || "");
      setProvince(data.province || "");
      setMunicipality(data.municipality || "");
      setLocality(data.locality || "");
      setCitizenship(data.citizenship || "");
      setDisability(data.disability || "");
      setEmploymentStatus(data.employment_status || "");
      setSassaGrant(data.sassa_grant || "");
      setHighestEducation(data.highest_education || "");
      setInstitution(data.institution || "");
      setEducationMark(data.education_mark || "");
      setYearCompleted(data.year_completed || "");
      setProgram(data.program || "");
      setTrade(data.trade || "");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('students')
      .update({
        student_id,
        first_name,
        middle_name,
        surname,
        email,
        phone,
        alt_phone,
        id_number,
        date_of_birth,
        start_date,
        gender,
        race,
        home_address,
        province,
        municipality,
        locality,
        citizenship,
        disability,
        employment_status,
        sassa_grant,
        highest_education,
        institution,
        education_mark,
        year_completed,
        program,
        trade,
      })
      .eq('id', selectedUser.id);

    if (error) {
      console.error("Error updating user:", error);
      alert("Error updating user!");
    } else {
      alert("User updated successfully!");
      // Refresh the user list
      fetchUsers();
      setIsEditMode(false);
    }
  };

  const handleSearch = async () => {
    let { data, error } = await supabase
      .from('students')
      .select('*')
      .or(`email.ilike.%${searchTerm}%,first_name.ilike.%${searchTerm}%,surname.ilike.%${searchTerm}%,student_id.ilike.%${searchTerm}%`);

    if (error) {
      console.error("Error searching users:", error);
    } else {
      setUsers(data || []);
    }
  };

  const columns = [
    {
      accessorKey: "student_id",
      header: "Student ID",
    },
    {
      accessorKey: "first_name",
      header: "First Name",
    },
    {
      accessorKey: "surname",
      header: "Surname",
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const user = row.original;
        return (
          <div className="flex justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="hover:shadow-md transition-shadow duration-300" onClick={() => handleRowClick(user)}>
                  More Details
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>User Details</DialogTitle>
                  <Button variant="default" size="sm" onClick={() => setIsEditMode(!isEditMode)}>
                    {isEditMode ? "Cancel Edit" : "Edit"}
                  </Button>
                </DialogHeader>
                <form className="p-4 border rounded-md" onSubmit={handleSubmit}>
                  <Label htmlFor="student_id">Student ID</Label>
                  <Input
                    id="student_id"
                    value={student_id}
                    onChange={(e) => setStudentId(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="middle_name">Middle Name</Label>
                  <Input
                    id="middle_name"
                    value={middle_name}
                    onChange={(e) => setMiddleName(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    id="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="alt_phone">Alt Phone</Label>
                  <Input
                    id="alt_phone"
                    value={alt_phone}
                    onChange={(e) => setAltPhone(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="id_number">ID Number</Label>
                  <Input
                    id="id_number"
                    value={id_number}
                    onChange={(e) => setIdNumber(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="date_of_birth">Date of Birth</Label>
                  <Input
                    id="date_of_birth"
                    value={date_of_birth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    value={start_date}
                    onChange={(e) => setStartDate(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="gender">Gender</Label>
                  <Input
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="race">Race</Label>
                  <Input
                    id="race"
                    value={race}
                    onChange={(e) => setRace(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="home_address">Home Address</Label>
                  <Input
                    id="home_address"
                    value={home_address}
                    onChange={(e) => setHomeAddress(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="province">Province</Label>
                  <Input
                    id="province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="municipality">Municipality</Label>
                  <Input
                    id="municipality"
                    value={municipality}
                    onChange={(e) => setMunicipality(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="locality">Locality</Label>
                  <Input
                    id="locality"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="citizenship">Citizenship</Label>
                  <Input
                    id="citizenship"
                    value={citizenship}
                    onChange={(e) => setCitizenship(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="disability">Disability</Label>
                  <Input
                    id="disability"
                    value={disability}
                    onChange={(e) => setDisability(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="employment_status">Employment Status</Label>
                  <Input
                    id="employment_status"
                    value={employment_status}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="sassa_grant">Sassa Grant</Label>
                  <Input
                    id="sassa_grant"
                    value={sassa_grant}
                    onChange={(e) => setSassaGrant(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="highest_education">Highest Education</Label>
                  <Input
                    id="highest_education"
                    value={highest_education}
                    onChange={(e) => setHighestEducation(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="education_mark">Education Mark</Label>
                  <Input
                    id="education_mark"
                    value={education_mark}
                    onChange={(e) => setEducationMark(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="year_completed">Year Completed</Label>
                  <Input
                    id="year_completed"
                    value={year_completed}
                    onChange={(e) => setYearCompleted(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="program">Program</Label>
                  <Input
                    id="program"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Label htmlFor="trade">Trade</Label>
                  <Input
                    id="trade"
                    value={trade}
                    onChange={(e) => setTrade(e.target.value)}
                    disabled={!isEditMode}
                  />
                  <Button type="submit" disabled={!isEditMode}>
                    Save Changes
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex items-center space-x-2">
          <Input
            type="search"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add User</DialogTitle>
              </DialogHeader>
              <AddUserForm onSubmit={() => {}}/>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
