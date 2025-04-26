import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface AddUserFormProps {
  onSubmit: (data: any) => void;
}

export default function AddUserForm({ onSubmit }: AddUserFormProps) {
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

  const handleSubmit = () => {
    // Collect form data
    const formData = {
      student_id: student_id,
      first_name: first_name,
      middle_name: middle_name,
      surname: surname,
      email: email,
      phone: phone,
      alt_phone: alt_phone,
      id_number: id_number,
      date_of_birth: date_of_birth,
      start_date: start_date,
      gender: gender,
      race: race,
      home_address: home_address,
      province: province,
      municipality: municipality,
      locality: locality,
      citizenship: citizenship,
      disability: disability,
      employment_status: employment_status,
      sassa_grant: sassa_grant,
      highest_education: highest_education,
      institution: institution,
      education_mark: education_mark,
      year_completed: year_completed,
      program: program,
      trade: trade,
    };

    onSubmit(formData);
  };

  return (
    <Tabs defaultValue="personal" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="address">Address</TabsTrigger>
        <TabsTrigger value="other">Other</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="student_id">Student ID</Label>
            <Input type="text" id="student_id" value={student_id} onChange={(e) => setStudentId(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="first_name">First Name</Label>
            <Input type="text" id="first_name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="middle_name">Middle Name</Label>
            <Input type="text" id="middle_name" value={middle_name} onChange={(e) => setMiddleName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="surname">Surname</Label>
            <Input type="text" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="alt_phone">Alt Phone</Label>
            <Input type="text" id="alt_phone" value={alt_phone} onChange={(e) => setAltPhone(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="id_number">ID Number</Label>
            <Input type="text" id="id_number" value={id_number} onChange={(e) => setIdNumber(e.target.value)} />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="education">
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="highest_education">Highest Education</Label>
            <Input type="text" id="highest_education" value={highest_education} onChange={(e) => setHighestEducation(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="institution">Institution</Label>
            <Input type="text" id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="education_mark">Education Mark</Label>
            <Input type="text" id="education_mark" value={education_mark} onChange={(e) => setEducationMark(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="year_completed">Year Completed</Label>
            <Input type="text" id="year_completed" value={year_completed} onChange={(e) => setYearCompleted(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="program">Program</Label>
            <Input type="text" id="program" value={program} onChange={(e) => setProgram(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="trade">Trade</Label>
            <Input type="text" id="trade" value={trade} onChange={(e) => setTrade(e.target.value)} />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="address">
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="home_address">Home Address</Label>
            <Input type="text" id="home_address" value={home_address} onChange={(e) => setHomeAddress(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="province">Province</Label>
            <Input type="text" id="province" value={province} onChange={(e) => setProvince(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="municipality">Municipality</Label>
            <Input type="text" id="municipality" value={municipality} onChange={(e) => setMunicipality(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="locality">Locality</Label>
            <Input type="text" id="locality" value={locality} onChange={(e) => setLocality(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="citizenship">Citizenship</Label>
            <Input type="text" id="citizenship" value={citizenship} onChange={(e) => setCitizenship(e.target.value)} />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="other">
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="date_of_birth">Date of Birth</Label>
            <Input type="date" id="date_of_birth" value={date_of_birth} onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="race">Race</Label>
            <Input type="text" id="race" value={race} onChange={(e) => setRace(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="disability">Disability</Label>
            <Input type="text" id="disability" value={disability} onChange={(e) => setDisability(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="employment_status">Employment Status</Label>
            <Input type="text" id="employment_status" value={employment_status} onChange={(e) => setEmploymentStatus(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="sassa_grant">Sassa Grant</Label>
            <Input type="text" id="sassa_grant" value={sassa_grant} onChange={(e) => setSassaGrant(e.target.value)} />
          </div>
        </div>
      </TabsContent>
      <Button onClick={handleSubmit}>Create User</Button>
    </Tabs>
  );
}
