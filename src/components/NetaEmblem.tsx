import React from 'react';

interface NetaEmblemProps {
  className?: string;
  size?: number;
  variant?: 'gold' | 'monochrome' | 'outline';
}

export const NetaEmblem: React.FC<NetaEmblemProps> = ({
  className = 'w-8 h-8',
  size = 32,
  variant = 'gold',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      aria-label="Neta Perfume Crest Emblem"
    >
      <defs>
        {/* Metallic gold linear gradient for the primary facet */}
        <linearGradient id="netaGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2C2" />
          <stop offset="45%" stopColor="#E5C34D" />
          <stop offset="100%" stopColor="#B38B1C" />
        </linearGradient>

        {/* Shaded gold for angled side facets */}
        <linearGradient id="netaGoldDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D8B52F" />
          <stop offset="70%" stopColor="#8A6715" />
          <stop offset="100%" stopColor="#5E430B" />
        </linearGradient>

        {/* Center crest reflection */}
        <linearGradient id="netaGoldCenter" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E0" />
          <stop offset="60%" stopColor="#D8B52F" />
          <stop offset="100%" stopColor="#9E781A" />
        </linearGradient>
      </defs>

      {/* Geometric Silhouette inspired by the architectural folded crest */}
      {/* Base fold / Crown band */}
      <path
        d="M10 42L18 45H46L54 42L48 48H16L10 42Z"
        fill={variant === 'monochrome' ? 'currentColor' : 'url(#netaGoldDark)'}
        opacity={variant === 'outline' ? 0 : 0.85}
        stroke={variant === 'outline' ? 'currentColor' : '#F7E7A8'}
        strokeWidth="1"
      />

      {/* Left faceted wing */}
      <polygon
        points="10,42 20,24 32,32 18,45"
        fill={variant === 'monochrome' ? 'currentColor' : 'url(#netaGoldDark)'}
        stroke={variant === 'outline' ? 'currentColor' : '#F7E7A8'}
        strokeWidth="0.8"
      />

      {/* Right faceted wing */}
      <polygon
        points="54,42 44,24 32,32 46,45"
        fill={variant === 'monochrome' ? 'currentColor' : 'url(#netaGoldLight)'}
        stroke={variant === 'outline' ? 'currentColor' : '#F7E7A8'}
        strokeWidth="0.8"
      />

      {/* Center sharp folded crest / Peak */}
      <polygon
        points="32,15 20,24 32,32 44,24"
        fill={variant === 'monochrome' ? 'currentColor' : 'url(#netaGoldCenter)'}
        stroke={variant === 'outline' ? 'currentColor' : '#FFF5D0'}
        strokeWidth="1"
      />

      {/* Subtle architectural vertical crease line */}
      <line
        x1="32"
        y1="15"
        x2="32"
        y2="45"
        stroke={variant === 'monochrome' ? 'currentColor' : '#FFF9DE'}
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Fine jewel apex point */}
      <circle
        cx="32"
        cy="15"
        r="1.8"
        fill={variant === 'monochrome' ? 'currentColor' : '#FFFDF5'}
      />
    </svg>
  );
};

export const InterlockingRingsMotif: React.FC<{ className?: string }> = ({ className = 'w-36 h-8' }) => {
  return (
    <div className={`inline-flex items-center justify-center opacity-60 ${className}`}>
      <svg width="120" height="28" viewBox="0 0 120 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="14" x2="24" y2="14" stroke="#D8B52F" strokeWidth="0.8" />
        <circle cx="1" cy="14" r="1.5" fill="#D8B52F" />
        <circle cx="42" cy="14" r="11" stroke="#D8B52F" strokeWidth="0.8" fill="none" opacity="0.6" />
        <circle cx="60" cy="14" r="13" stroke="#D8B52F" strokeWidth="1" fill="none" />
        <circle cx="78" cy="14" r="11" stroke="#D8B52F" strokeWidth="0.8" fill="none" opacity="0.6" />
        <circle cx="119" cy="14" r="1.5" fill="#D8B52F" />
        <line x1="96" y1="14" x2="120" y2="14" stroke="#D8B52F" strokeWidth="0.8" />
      </svg>
    </div>
  );
};
