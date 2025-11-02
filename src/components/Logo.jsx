function Logo({ size = 40, withText = false, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
        aria-label="React SSR logo"
        role="img"
      >
        <defs>
          {/* <linearGradient id="g1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.85" />
            <stop offset="1" stopColor="currentColor" />
          </linearGradient> */}
        </defs>
        {/* Stack */}
        <rect x="6" y="6" width="20" height="6" rx="2.5" fill="url(#g1)" opacity="0.18" />
        <rect x="6" y="12" width="20" height="6" rx="2.5" fill="url(#g1)" opacity="0.28" />
        <rect x="6" y="18" width="20" height="8" rx="2.5" fill="url(#g1)" opacity="0.38" />
        {/* Code carets */}
        <path d="M12 13.5 L9.5 16 L12 18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 13.5 L22.5 16 L20 18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Spark */}
        <path d="M17 8.5 L17.9 10.1 L19.7 10.3 L18.4 11.5 L18.7 13.3 L17 12.4 L15.3 13.3 L15.6 11.5 L14.3 10.3 L16.1 10.1 Z" fill="currentColor" opacity="0.9" />
      </svg>
      {withText && (
        <div className="leading-none select-none">
          <span className="text-base-content font-semibold text-xl tracking-tight">React</span>{' '}
          <span className="text-primary font-semibold text-xl tracking-tight">SSR</span>
        </div>
      )}
    </div>
  )
}

export default Logo

