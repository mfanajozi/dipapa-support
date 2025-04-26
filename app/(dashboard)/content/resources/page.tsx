'use client'
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react"; // Importing Dialog for modal
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { supabase } from '@/lib/supabase/client'; // Corrected import path
import ArticleModal from '../news/ArticleModal'; // Import the ArticleModal component

export default function ResourcesPage() {
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [resources, setResources] = useState<any[]>([]); // Define type for resources
  const [showModal, setShowModal] = useState(false); // Added state for modal visibility
  const [showForm, setShowForm] = useState(false); // Added state for form visibility
  const [selectedArticle, setSelectedArticle] = useState<{ title: string; content: string } | null>(null); // State for the selected article

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*');

      if (error) {
        console.error('Error fetching resources:', error);
        return;
      }

      setResources(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const handleViewArticle = (article: { title: string; content: string }) => {
    setSelectedArticle(article);
    setShowModal(true); // Show the modal when an article is selected
  };

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "article", // Changed from description to article
      header: "Article",
    },
    {
      accessorKey: "date", // Assuming you want to display the date as well
      header: "Date",
    },
    {
      accessorKey: "time", // Assuming you want to display the time as well
      header: "Time",
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const resource = row.original;

        return (
          <div className="flex justify-end">
            <Button asChild variant="ghost" size="sm" onClick={() => handleViewArticle(resource)}>
              View
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Resources</h1>
        <Button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Resource
        </Button>
      </div>

      <DataTable columns={columns} data={resources} />

      {showModal && selectedArticle && selectedArticle.title && selectedArticle.content && (
        <ArticleModal 
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          article={{
            title: selectedArticle.title,
            content: selectedArticle.content,
          }}
        />
      )}
    </div>
  );
}
