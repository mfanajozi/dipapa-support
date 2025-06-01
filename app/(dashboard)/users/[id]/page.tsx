'use client';
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'
);

export default function UserDetailsPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const { data, error } = await supabase.from('students').select('student_id, first_name, middle_name, surname, id_number, date_of_birth, gender, race, email, phone, program, trade, sdp_match, final_selection, initiated_registration_process, start_date, african_bank_account_number, comment, medical_fitness').eq('id', id).single();
        if (error) {
          console.error("Error fetching user:", error);
        } else {
          setUser(data);
        }
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    if (user) {
      const { error } = await supabase
        .from('students')
        .update({
          first_name: user.first_name,
          surname: user.surname,
          email: user.email,
        })
        .eq('id', user.id);

      if (error) {
        console.error("Error updating user:", error);
      } else {
        alert("User updated successfully!");
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Details</h1>
      {/* More Details Modal */}
      <dialog id="more_details_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">More Details</h3>
          <Tabs defaultValue="personal" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <div>
                <label>Student ID:</label>
                <input type="text" value={user.student_id} readOnly />
              </div>
              <div>
                <label>First Name:</label>
                <input type="text" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} />
              </div>
              <div>
                <label>Middle Name:</label>
                <input type="text" value={user.middle_name || ""} onChange={(e) => setUser({ ...user, middle_name: e.target.value })} />
              </div>
              <div>
                <label>Surname:</label>
                <input type="text" value={user.surname} onChange={(e) => setUser({ ...user, surname: e.target.value })} />
              </div>
              <div>
                <label>ID Number:</label>
                <input type="text" value={user.id_number || ""} onChange={(e) => setUser({ ...user, id_number: e.target.value })} />
              </div>
              <div>
                <label>Date of Birth:</label>
                <input type="text" value={user.date_of_birth || ""} onChange={(e) => setUser({ ...user, date_of_birth: e.target.value })} />
              </div>
              <div>
                <label>Gender:</label>
                <input type="text" value={user.gender || ""} onChange={(e) => setUser({ ...user, gender: e.target.value })} />
              </div>
            </TabsContent>
            <TabsContent value="academic">
              <div>
                <label>Email:</label>
                <input type="email" value={user.email || ""} onChange={(e) => setUser({ ...user, email: e.target.value })} />
              </div>
              <div>
                <label>Phone:</label>
                <input type="text" value={user.phone || ""} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
              </div>
              <div>
                <label>Program:</label>
                <input type="text" value={user.program || ""} onChange={(e) => setUser({ ...user, program: e.target.value })} />
              </div>
              <div>
                <label>Trade:</label>
                <input type="text" value={user.trade || ""} onChange={(e) => setUser({ ...user, trade: e.target.value })} />
              </div>
              <div>
                <label>SDP Match:</label>
                <input type="text" value={user.sdp_match || ""} onChange={(e) => setUser({ ...user, sdp_match: e.target.value })} />
              </div>
              <div>
                <label>Final Selection:</label>
                <input type="text" value={user.final_selection || ""} onChange={(e) => setUser({ ...user, final_selection: e.target.value })} />
              </div>
              <div>
                <label>Initiated Registration Process:</label>
                <input type="text" value={user.initiated_registration_process || ""} onChange={(e) => setUser({ ...user, initiated_registration_process: e.target.value })} />
              </div>
              <div>
                <label>Start Date:</label>
                <input type="text" value={user.start_date || ""} onChange={(e) => setUser({ ...user, start_date: e.target.value })} />
              </div>
            </TabsContent>
            <TabsContent value="other">
              <div>
                <label>African Bank Account Number:</label>
                <input type="text" value={user.african_bank_account_number || ""} onChange={(e) => setUser({ ...user, african_bank_account_number: e.target.value })} />
              </div>
              <div>
                <label>Comment:</label>
                <input type="text" value={user.comment || ""} onChange={(e) => setUser({ ...user, comment: e.target.value })} />
              </div>
              <div>
                <label>Medical Fitness:</label>
                <input type="text" value={user.medical_fitness || ""} onChange={(e) => setUser({ ...user, medical_fitness: e.target.value })} />
              </div>
            </TabsContent>
          </Tabs>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Button className="btn">Close</Button>
            </form>
          </div>
        </div>
      </dialog>
      <Button onClick={() => {
        const modal = document.getElementById('more_details_modal') as HTMLDialogElement | null;
        modal?.showModal();
      }}>
        More Details
      </Button>
    </div>
  );
}
