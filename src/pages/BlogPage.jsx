import React from 'react';
import { Sparkles, Clock, ChevronRight, BookOpen, Gift, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BLOG_POSTS } from '../data/products';

export const BlogPage = () => {
  const { navigateTo } = useApp();

  const additionalArticles = [
    {
      id: 'post-4',
      title: 'Unique Handcrafted Gifts Under ₹1,000 That Don’t Look Cheap',
      snippet: 'Affordable luxury gifting is an art. Discover our top curated wooden photo plaques, custom mugs, and mini indoor green gardens that impress without breaking the bank.',
      readTime: '3 min read',
      category: 'Budget Friendly',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'post-5',
      title: 'Last-Minute Gifting Guide: Same-Day Delivery Hacks That Save Celebrations',
      snippet: 'Forgot an anniversary or friend’s birthday? Learn how our 2-hour express delivery network gets fresh designer cakes and hand-tied blooms to the doorstep in record time.',
      readTime: '4 min read',
      category: 'Express Delivery',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'post-6',
      title: 'The Psychology of Personalized Gifting: Why Custom Keepsakes Last a Lifetime',
      snippet: 'Engraved names, intimate dates, and shared photographs transform everyday objects into deeply emotional treasures. Here is the science behind heartfelt surprises.',
      readTime: '5 min read',
      category: 'Personalization',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const allArticles = [...BLOG_POSTS, ...additionalArticles];

  return (
    <div style={{ backgroundColor: '#fcfbf9', minHeight: '85vh', padding: '3.5rem 0 6rem' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag" style={{ background: '#fdf2f8', color: 'var(--primary)' }}>
            <BookOpen size={14} />
            <span>STEP IN GIFT MART INSPIRATION & GUIDES</span>
          </div>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 800, color: 'var(--charcoal-dark)', marginBottom: '0.75rem' }}>
            Celebration Ideas & Gifting Guides
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--charcoal-muted)', maxWidth: 640, margin: '0 auto' }}>
            Discover expert curation tips, flower care secrets, and heartwarming gift inspiration for every loved one.
          </p>
        </div>

        {/* Featured Main Post */}
        <div style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '2rem',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '3.5rem',
          alignItems: 'center'
        }} className="featured-blog-grid">
          <div style={{ height: '100%', minHeight: 320 }}>
            <img 
              src={allArticles[0].image} 
              alt={allArticles[0].title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ padding: '2.5rem 2rem 2.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 800, marginBottom: 8 }}>
              <span>FEATURED GUIDE</span>
              <span>•</span>
              <span>{allArticles[0].category}</span>
              <span>•</span>
              <span>{allArticles[0].readTime}</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--charcoal-dark)', lineHeight: 1.3, marginBottom: '1rem' }}>
              {allArticles[0].title}
            </h2>
            <p style={{ fontSize: '0.94rem', color: 'var(--charcoal-body)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {allArticles[0].snippet}
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => navigateTo('shop', { occasion: 'anniversary' })}
              style={{ gap: 6 }}
            >
              <span>Explore Anniversary Gifts</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* All Blog Articles Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {allArticles.slice(1).map(post => (
            <div
              key={post.id}
              className="card"
              style={{ display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}
              onClick={() => navigateTo('shop')}
            >
              <div style={{ height: 210, overflow: 'hidden' }}>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 300ms ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--charcoal-muted)', marginBottom: 6 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--charcoal-dark)', lineHeight: 1.35, marginBottom: '0.65rem' }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--charcoal-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {post.snippet}
                </p>
                <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 4, color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }}>
                  <span>Read Full Article</span>
                  <ChevronRight size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 820px) {
          .featured-blog-grid { grid-template-columns: 1fr !important; }
          .featured-blog-grid div:nth-child(2) { padding: 1.5rem !important; }
        }
      `}</style>
    </div>
  );
};
