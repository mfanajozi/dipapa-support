import React from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from "@/components/ui/button";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    title: string;
    content: string;
  };
}

const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, article }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded bg-white p-6">
          <Dialog.Title className="text-2xl font-bold">{article.title}</Dialog.Title>
          <Dialog.Description className="mt-2">
            <p>{article.content}</p>
          </Dialog.Description>
          <div className="mt-4">
            <Button onClick={onClose}>Close</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ArticleModal;
