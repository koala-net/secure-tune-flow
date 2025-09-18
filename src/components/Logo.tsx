const Logo = () => {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 rounded-lg">
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        className="text-white"
      >
        {/* Music Note Icon */}
        <path d="M8 18C8 19.1046 8.89543 20 10 20C11.1046 20 12 19.1046 12 18C12 16.8954 11.1046 16 10 16C8.89543 16 8 16.8954 8 18Z" fill="currentColor"/>
        <path d="M20 18C20 19.1046 20.8954 20 22 20C23.1046 20 24 19.1046 24 18C24 16.8954 23.1046 16 22 16C20.8954 16 20 16.8954 20 18Z" fill="currentColor"/>
        <path d="M12 18V6L24 4V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 18V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Decorative elements */}
        <circle cx="6" cy="8" r="1" fill="currentColor" opacity="0.6"/>
        <circle cx="18" cy="6" r="1" fill="currentColor" opacity="0.6"/>
      </svg>
    </div>
  );
};

export default Logo;