'use client';

import Link from 'next/link';

interface FooterProps {
  variant?: 'default' | 'detail';
}

export default function Footer({ variant = 'default' }: FooterProps) {
  const handleNewsletterClick = () => {
    alert('We are preparing something thoughtful for you. Our newsletter will be available shortly.');
  };

  return (
    <footer className={variant === 'detail' ? 'footer footer-detail' : 'footer'}>
      <div className="footer-brand">Korean Moment</div>
      <div className="footer-links">
        <Link href="/about">About</Link>
        <a
          href="https://www.youtube.com/@koreanmoment-kr"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>
        <button onClick={handleNewsletterClick}>Newsletter</button>
      </div>
    </footer>
  );
}
