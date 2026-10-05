import type { ReactNode } from 'react';

interface ProfileTileProps {
  label: string;
  icon: ReactNode;
  /** Tailwind background class for the avatar square. */
  colorClass: string;
  onClick: () => void;
}

export default function ProfileTile({ label, icon, colorClass, onClick }: ProfileTileProps) {
  return (
    <button onClick={onClick} className="group flex w-24 flex-col items-center sm:w-36 lg:w-40">
      <div
        className={`relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-md text-white outline outline-[3px] outline-offset-0 outline-transparent transition-all duration-200 group-hover:outline-white group-focus-visible:outline-white sm:h-36 sm:w-36 lg:h-40 lg:w-40 [&>svg]:h-1/2 [&>svg]:w-1/2 [&>svg]:stroke-[2.25] ${colorClass}`}
      >
        {/* Soft light from the top-left, so the flat colour isn't dead flat */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        {icon}
      </div>
      <span className="mt-3 text-center text-sm text-nf-muted transition-colors duration-200 group-hover:text-white group-focus-visible:text-white sm:text-lg">
        {label}
      </span>
    </button>
  );
}
