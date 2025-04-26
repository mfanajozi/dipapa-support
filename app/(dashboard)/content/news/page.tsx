'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import ArticleModal from "./ArticleModal"; // Import the ArticleModal component
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase/client"; // Import the Supabase client

// Define the type for a news article
type NewsArticle = {
  category: string;
  title: string;
  user_group: string;
  article: string;
  date: string;
  time: string;
};

const columns = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "article", // Change to populate the article field
    header: "Article", // Change header to "Article"
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }: any) => {
      const news = row.original;

      return (
        <div className="flex justify-end">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/content/news/${news.id}`}>View</Link>
          </Button>
        </div>
      );
    },
  },
];

export default function NewsPage() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news') // Replace with your actual table name
      .select('category, title, user_group, article, date, time');

    if (error) {
      console.error("Error fetching news:", error);
    } else {
      setNewsArticles(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleAddNews = async (newArticle: NewsArticle) => {
    const { error } = await supabase
      .from('news') // Replace with your actual table name
      .insert([newArticle]);

    if (error) {
      console.error("Error adding news article:", error);
    } else {
      fetchNews(); // Refetch the news articles after adding a new one
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-8 px-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">News</h1>
        <p className="text-muted-foreground">Manage news articles.</p>
      </div>

      <div className="flex justify-between">
        <Button asChild>
          <Link href="/content/news/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add News
          </Link>
        </Button>
      </div>

      {loading ? (
        <Skeleton />
      ) : (
        <DataTable columns={columns} data={newsArticles} searchKey="title" searchPlaceholder="Search by title..." />
      )}
    </div>
  );
}
