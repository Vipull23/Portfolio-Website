import { Link } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

interface NotFoundProps {
  message?: string;
}

export default function NotFound({
  message = "Sorry, we can't find that page. You'll find lots to explore on the home page.",
}: NotFoundProps) {
  useDocumentTitle('Page Not Found');
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(229,9,20,0.15),transparent_60%)]" />
      <div className="relative z-10 max-w-xl text-center">
        <h1 className="mb-5 text-4xl font-bold text-white sm:text-6xl">Lost your way?</h1>
        <p className="mb-8 text-lg text-nf-text sm:text-xl">{message}</p>
        <Link
          to="/"
          className="inline-block rounded bg-white px-6 py-3 text-base font-semibold text-black transition-colors hover:bg-white/80"
        >
          Back to Home
        </Link>
        <p className="mt-10 text-sm text-nf-dim">
          Error Code <span className="font-semibold text-nf-muted">NSES-404</span>
        </p>
      </div>
    </div>
  );
}
