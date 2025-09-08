// app/admin/blogs/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/app/styles/admin/pages/blogs.module.css';
import BlogForm from './BlogForm';
import ConfirmModal from '@/app/components/admin/ui/ConfirmModal';

interface Blog {
  id: string;
  title: string;
  authorName: string;
  authorImage: string;
  authorDesignation: string;
  readingTime: string;
  blogImage: string;
  shortContent: string;
  longContent: string;
  metaTitle: string;
  metaDescription: string;
  readMoreUrl?: string;
  slug: string;
  focusKeywords: string[];
  tags: string[];
  altText: string;
  publishDate: string;
  updatedDate: string;
  internalLinks: string[];
  externalLinks: string[];
  canonicalUrl?: string;
  schemaMarkup?: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  status: 'draft' | 'published' | 'archived';
}

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; blogId: string | null }>({
    isOpen: false,
    blogId: null
  });

  const blogsPerPage = 10;

  // Mock data - replace with actual API calls
  const mockBlogs: Blog[] = [
    {
      id: '1',
      title: 'Best Car Rental Tips for Budget Travelers',
      authorName: 'John Doe',
      authorImage: '/authors/john-doe.jpg',
      authorDesignation: 'Travel Expert',
      readingTime: '5 min read',
      blogImage: '/blogs/car-rental-tips.jpg',
      shortContent: 'Discover amazing tips to save money on car rentals while traveling. Learn insider secrets from industry experts.',
      longContent: '<p>Full blog content here...</p>',
      metaTitle: 'Best Car Rental Tips - Save Money on Travel',
      metaDescription: 'Learn expert tips to save money on car rentals. Discover insider secrets for budget-friendly travel with Gadiyo.',
      slug: 'best-car-rental-tips-budget-travelers',
      focusKeywords: ['car rental tips', 'budget travel'],
      tags: ['Car Rental', 'Travel Tips', 'Budget'],
      altText: 'Person checking car rental options on mobile app',
      publishDate: '2025-01-15T10:00:00Z',
      updatedDate: '2025-01-20T10:00:00Z',
      internalLinks: ['/car-rentals', '/travel-guide'],
      externalLinks: ['https://example.com/travel-tips'],
      canonicalUrl: 'https://gadiyo.com/blog/best-car-rental-tips-budget-travelers',
      ogTitle: 'Best Car Rental Tips for Budget Travelers',
      ogDescription: 'Discover amazing tips to save money on car rentals while traveling.',
      twitterTitle: 'Best Car Rental Tips for Budget Travelers',
      twitterDescription: 'Discover amazing tips to save money on car rentals while traveling.',
      twitterImage: '/blogs/car-rental-tips.jpg',
      status: 'published'
    },
    {
      id: '2',
      title: 'Top 10 Destinations for Road Trips in India',
      authorName: 'Jane Smith',
      authorImage: '/authors/jane-smith.jpg',
      authorDesignation: 'Travel Writer',
      readingTime: '8 min read',
      blogImage: '/blogs/road-trips-india.jpg',
      shortContent: 'Explore the most scenic road trip destinations in India. From mountains to beaches, discover your next adventure.',
      longContent: '<p>Full blog content here...</p>',
      metaTitle: 'Top 10 Road Trip Destinations in India - Travel Guide',
      metaDescription: 'Discover the best road trip destinations in India. Scenic routes, travel tips, and must-visit places for your next adventure.',
      slug: 'top-10-road-trip-destinations-india',
      focusKeywords: ['road trips India', 'travel destinations'],
      tags: ['Road Trip', 'India Travel', 'Destinations'],
      altText: 'Scenic mountain road in India perfect for road trips',
      publishDate: '2025-01-10T10:00:00Z',
      updatedDate: '2025-01-18T10:00:00Z',
      internalLinks: ['/destinations', '/road-trip-guide'],
      externalLinks: ['https://example.com/india-travel'],
      canonicalUrl: 'https://gadiyo.com/blog/top-10-road-trip-destinations-india',
      ogTitle: 'Top 10 Destinations for Road Trips in India',
      ogDescription: 'Explore the most scenic road trip destinations in India.',
      twitterTitle: 'Top 10 Destinations for Road Trips in India',
      twitterDescription: 'Explore the most scenic road trip destinations in India.',
      twitterImage: '/blogs/road-trips-india.jpg',
      status: 'draft'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  const handleAddBlog = () => {
    setEditingBlog(null);
    setShowForm(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleDeleteBlog = (blogId: string) => {
    setDeleteModal({ isOpen: true, blogId });
  };

  const confirmDelete = () => {
    if (deleteModal.blogId) {
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== deleteModal.blogId));
      setDeleteModal({ isOpen: false, blogId: null });
    }
  };

  const handleSaveBlog = (blogData: Partial<Blog>) => {
    if (editingBlog) {
      // Update existing blog
      setBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog.id === editingBlog.id
            ? { ...blog, ...blogData, updatedDate: new Date().toISOString() }
            : blog
        )
      );
    } else {
      // Add new blog
      const newBlog: Blog = {
        id: Date.now().toString(),
        ...blogData,
        publishDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        status: 'draft'
      } as Blog;
      setBlogs(prevBlogs => [newBlog, ...prevBlogs]);
    }
    setShowForm(false);
    setEditingBlog(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return '#10b981';
      case 'draft':
        return '#f59e0b';
      case 'archived':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>Loading blogs...</div>
      </div>
    );
  }

  if (showForm) {
    return (
      <BlogForm
        blog={editingBlog}
        onSave={handleSaveBlog}
        onCancel={() => {
          setShowForm(false);
          setEditingBlog(null);
        }}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Blog Management</h1>
          <p className={styles.subtitle}>Manage your blog posts and content</p>
        </div>
        <button className={styles.addButton} onClick={handleAddBlog}>
          <span className={styles.addIcon}>+</span>
          Add New Blog
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.statusFilter}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className={styles.statusSelect}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Blog</th>
              <th>Author</th>
              <th>Status</th>
              <th>Reading Time</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBlogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <div className={styles.blogInfo}>
                    <div className={styles.blogImageContainer}>
                      <Image
                        src={blog.blogImage}
                        alt={blog.altText}
                        width={60}
                        height={40}
                        className={styles.blogImage}
                      />
                    </div>
                    <div className={styles.blogDetails}>
                      <h3 className={styles.blogTitle}>{blog.title}</h3>
                      <p className={styles.blogExcerpt}>{blog.shortContent}</p>
                      <div className={styles.blogTags}>
                        {blog.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 2 && (
                          <span className={styles.tagMore}>+{blog.tags.length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorImageContainer}>
                      <Image
                        src={blog.authorImage}
                        alt={blog.authorName}
                        width={32}
                        height={32}
                        className={styles.authorImage}
                      />
                    </div>
                    <div>
                      <div className={styles.authorName}>{blog.authorName}</div>
                      <div className={styles.authorDesignation}>{blog.authorDesignation}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={styles.status}
                    style={{ backgroundColor: getStatusColor(blog.status) }}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className={styles.readingTime}>{blog.readingTime}</td>
                <td className={styles.date}>
                  {new Date(blog.publishDate).toLocaleDateString()}
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEditBlog(blog)}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteBlog(blog.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedBlogs.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No blogs found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className={styles.paginationButton}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        type="delete"
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, blogId: null })}
      />
    </div>
  );
};

export default BlogsPage;