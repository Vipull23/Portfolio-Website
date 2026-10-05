import { useRef } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { useDialog } from '@/hooks/useDialog';

interface CertificateModalProps {
  url: string;
  title: string;
  onClose: () => void;
}

export default function CertificateModal({
  url,
  title,
  onClose,
}: CertificateModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useDialog(onClose, closeRef);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-modal-title"
        className="relative flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-white/10 bg-nf-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
          <h3 id="document-modal-title" className="truncate text-base font-semibold text-white">
            {title}
          </h3>
          <div className="flex shrink-0 items-center gap-1">
            {/* Mobile browsers often can't render PDFs inline, so offer the file directly. */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 items-center gap-1.5 rounded-full px-3 text-sm text-nf-muted transition-colors hover:bg-white/10 hover:text-white"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">Open in new tab</span>
            </a>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close document viewer"
              className="flex h-9 w-9 items-center justify-center rounded-full text-nf-muted transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <iframe src={url} title={title} className="h-full w-full flex-1 bg-white" />
      </div>
    </div>
  );
}
