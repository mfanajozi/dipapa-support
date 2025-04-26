'use client';
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

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
        const { data, error } = await supabase.from('students').select('*').eq('id', id).single();
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
      {user && (
        <div>
          <div>
            <label>Student ID:</label>
            <input type="text" value={user.student_id} readOnly />
          </div>
          <div>
            <label>First Name:</label>
            <input type="text" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} />
          </div>
          <div>
            <label>Surname:</label>
            <input type="text" value={user.surname} onChange={(e) => setUser({ ...user, surname: e.target.value })} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </div>
          <Button onClick={handleUpdate}>Update User</Button>
        </div>
      )}
    </div>
  );
}
