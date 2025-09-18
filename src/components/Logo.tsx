const Logo = () => {
  return (
    <div className="bg-gradient-primary p-2 rounded-lg">
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        className="text-primary-foreground"
      >
        {/* Musical note combined with blockchain/crypto elements */}
        <path
          d="M12 3L22 6v6c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V6l9-3z"
          fill="currentColor"
          fillOpacity="0.1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Musical note */}
        <circle cx="8" cy="16" r="2" fill="currentColor" />
        <path d="M10 16V8l6-2v8" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="14" r="2" fill="currentColor" />
        {/* Crypto/encryption elements */}
        <path 
          d="M12 7L15 9L12 11L9 9L12 7Z" 
          fill="currentColor" 
          fillOpacity="0.3"
        />
        <circle cx="12" cy="9" r="1" fill="currentColor" />
      </svg>
    </div>
  );
};

export default Logo;