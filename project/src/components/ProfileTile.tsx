import type { ReactNode } from 'react';

interface ProfileTileProps {
  label: string;
  icon: ReactNode;
  thumbnailClass: string;
  onClick: () => void;
}

export default function ProfileTile({
  label,
  icon,
  thumbnailClass,
  onClick,
}: ProfileTileProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center bg-transparent"
    >
      <div
        className={`flex h-32 w-32 items-center justify-center rounded-lg text-white/80 transition-all duration-200 group-hover:scale-108 group-hover:border-[3px] group-hover:border-white sm:h-40 sm:w-40 ${thumbnailClass}`}
      >
        {icon}
      </div>
      <span className="mt-3 text-lg text-nf-muted transition-all duration-200 group-hover:font-bold group-hover:text-white">
        {label}
      </span>
    </button>
  );
}
