// app/admin/blogs/BlogForm.tsx
'use client';

import React, { useState, useRef } from 'react';
import styles from '@/app/styles/admin/pages/blogForm.module.css';
import Icons from '@/app/components/shared/Icons';

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

interface BlogFormProps {
  blog?: Blog | null;
  onSave: (data: Partial<Blog>) => void;
  onCancel: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ blog, onSave, onCancel }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    authorName: blog?.authorName || '',
    authorImage: blog?.authorImage || '',
    authorDesignation: blog?.authorDesignation || '',
    readingTime: blog?.readingTime || '',
    blogImage: blog?.blogImage || '',
    shortContent: blog?.shortContent || '',
    longContent: blog?.longContent || '',
    metaTitle: blog?.metaTitle || '',
    metaDescription: blog?.metaDescription || '',
    readMoreUrl: blog?.readMoreUrl || '',
    slug: blog?.slug || '',
    focusKeywords: blog?.focusKeywords?.join(', ') || '',
    tags: blog?.tags?.join(', ') || '',
    altText: blog?.altText || '',
    internalLinks: blog?.internalLinks?.join('\n') || '',
    externalLinks: blog?.externalLinks?.join('\n') || '',
    canonicalUrl: blog?.canonicalUrl || '',
    schemaMarkup: blog?.schemaMarkup || '',
    ogTitle: blog?.ogTitle || '',
    ogDescription: blog?.ogDescription || '',
    twitterTitle: blog?.twitterTitle || '',
    twitterDescription: blog?.twitterDescription || '',
    twitterImage: blog?.twitterImage || '',
    status: blog?.status || 'draft'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const authorImageInputRef = useRef<HTMLInputElement>(null);
  const twitterImageInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: <Icons name="FileText" size={18} /> },
    { id: 'seo', label: 'SEO', icon: <Icons name="Search" size={18} /> },
    { id: 'social', label: 'Social Media', icon: <Icons name="Phone" size={18} /> },
    { id: 'advanced', label: 'Advanced', icon: <Icons name="Settings" size={18} /> }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === 'title' && !blog) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
    
    // Auto-generate meta title from title if not set
    if (field === 'title' && !formData.metaTitle) {
      setFormData(prev => ({ ...prev, metaTitle: value }));
    }
    
    // Auto-generate OG title from title if not set
    if (field === 'title' && !formData.ogTitle) {
      setFormData(prev => ({ ...prev, ogTitle: value }));
    }
    
    // Auto-generate Twitter title from title if not set
    if (field === 'title' && !formData.twitterTitle) {
      setFormData(prev => ({ ...prev, twitterTitle: value }));
    }
    
    // Clear specific field error
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.title.length > 70) newErrors.title = 'Title must be 70 characters or less';
    
    if (!formData.authorName.trim()) newErrors.authorName = 'Author name is required';
    if (!formData.authorDesignation.trim()) newErrors.authorDesignation = 'Author designation is required';
    if (!formData.readingTime.trim()) newErrors.readingTime = 'Reading time is required';
    if (!formData.blogImage.trim()) newErrors.blogImage = 'Blog image is required';
    
    if (!formData.shortContent.trim()) newErrors.shortContent = 'Short content is required';
    if (formData.shortContent.length < 150 || formData.shortContent.length > 200) {
      newErrors.shortContent = 'Short content must be between 150-200 characters';
    }
    
    if (!formData.longContent.trim()) newErrors.longContent = 'Long content is required';
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required';
    if (!formData.altText.trim()) newErrors.altText = 'Alt text is required';

    // SEO validation
    if (!formData.metaTitle.trim()) newErrors.metaTitle = 'Meta title is required';
    if (formData.metaTitle.length > 60) newErrors.metaTitle = 'Meta title must be 60 characters or less';
    
    if (!formData.metaDescription.trim()) newErrors.metaDescription = 'Meta description is required';
    if (formData.metaDescription.length > 160) newErrors.metaDescription = 'Meta description must be 160 characters or less';

    // URL validations
    const urlPattern = /^https?:\/\/.+/;
    if (formData.readMoreUrl && !urlPattern.test(formData.readMoreUrl)) {
      newErrors.readMoreUrl = 'Please enter a valid URL (starting with http:// or https://)';
    }
    if (formData.canonicalUrl && !urlPattern.test(formData.canonicalUrl)) {
      newErrors.canonicalUrl = 'Please enter a valid URL (starting with http:// or https://)';
    }

    // Social media validation
    if (!formData.ogTitle.trim()) newErrors.ogTitle = 'OG title is required';
    if (!formData.ogDescription.trim()) newErrors.ogDescription = 'OG description is required';
    if (!formData.twitterTitle.trim()) newErrors.twitterTitle = 'Twitter title is required';
    if (!formData.twitterDescription.trim()) newErrors.twitterDescription = 'Twitter description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, status?: 'draft' | 'published') => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Find first tab with errors and switch to it
      const errorFields = Object.keys(errors);
      const basicFields = ['title', 'authorName', 'authorDesignation', 'readingTime', 'blogImage', 'shortContent', 'longContent', 'slug', 'altText'];
      const seoFields = ['metaTitle', 'metaDescription', 'readMoreUrl', 'canonicalUrl', 'focusKeywords'];
      const socialFields = ['ogTitle', 'ogDescription', 'twitterTitle', 'twitterDescription', 'twitterImage'];
      
      if (errorFields.some(field => basicFields.includes(field))) {
        setActiveTab('basic');
      } else if (errorFields.some(field => seoFields.includes(field))) {
        setActiveTab('seo');
      } else if (errorFields.some(field => socialFields.includes(field))) {
        setActiveTab('social');
      }
      
      return;
    }

    setIsSubmitting(true);
    
    try {
      const blogData = {
        ...formData,
        focusKeywords: formData.focusKeywords.split(',').map(k => k.trim()).filter(k => k),
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        internalLinks: formData.internalLinks.split('\n').map(l => l.trim()).filter(l => l),
        externalLinks: formData.externalLinks.split('\n').map(l => l.trim()).filter(l => l),
        status: status || formData.status
      };
      
      await onSave(blogData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (field: string, file: File) => {
    // In a real app, you would upload to your server/cloud storage
    // For now, we'll create a mock URL
    const mockUrl = `/uploads/${Date.now()}-${file.name}`;
    handleInputChange(field, mockUrl);
  };

  const renderBasicInfo = () => (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Blog Information</h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Blog Title <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            placeholder="Enter blog title (max 70 characters)"
            maxLength={70}
          />
          <div className={styles.charCount}>{formData.title.length}/70</div>
          {errors.title && <span className={styles.errorText}>{errors.title}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Slug (URL) <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => handleInputChange('slug', e.target.value)}
            className={`${styles.input} ${errors.slug ? styles.inputError : ''}`}
            placeholder="url-friendly-slug"
          />
          {errors.slug && <span className={styles.errorText}>{errors.slug}</span>}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Reading Time <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={formData.readingTime}
              onChange={(e) => handleInputChange('readingTime', e.target.value)}
              className={`${styles.input} ${errors.readingTime ? styles.inputError : ''}`}
              placeholder="5 min read"
            />
            {errors.readingTime && <span className={styles.errorText}>{errors.readingTime}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className={styles.select}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Short Content (Preview) <span className={styles.required}>*</span>
          </label>
          <textarea
            value={formData.shortContent}
            onChange={(e) => handleInputChange('shortContent', e.target.value)}
            className={`${styles.textarea} ${errors.shortContent ? styles.inputError : ''}`}
            placeholder="Brief description for preview (150-200 characters)"
            rows={3}
            maxLength={200}
          />
          <div className={styles.charCount}>{formData.shortContent.length}/200</div>
          {errors.shortContent && <span className={styles.errorText}>{errors.shortContent}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Long Content <span className={styles.required}>*</span>
          </label>
          <textarea
            value={formData.longContent}
            onChange={(e) => handleInputChange('longContent', e.target.value)}
            className={`${styles.textarea} ${errors.longContent ? styles.inputError : ''}`}
            placeholder="Full blog content (HTML supported)"
            rows={8}
          />
          {errors.longContent && <span className={styles.errorText}>{errors.longContent}</span>}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Author Information</h3>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Author Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={formData.authorName}
              onChange={(e) => handleInputChange('authorName', e.target.value)}
              className={`${styles.input} ${errors.authorName ? styles.inputError : ''}`}
              placeholder="Author full name"
            />
            {errors.authorName && <span className={styles.errorText}>{errors.authorName}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Author Designation <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={formData.authorDesignation}
              onChange={(e) => handleInputChange('authorDesignation', e.target.value)}
              className={`${styles.input} ${errors.authorDesignation ? styles.inputError : ''}`}
              placeholder="Travel Expert, Content Writer, etc."
            />
            {errors.authorDesignation && <span className={styles.errorText}>{errors.authorDesignation}</span>}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Author Image <span className={styles.required}>*</span>
          </label>
          <div className={styles.imageUpload}>
            <input
              type="text"
              value={formData.authorImage}
              onChange={(e) => handleInputChange('authorImage', e.target.value)}
              className={styles.input}
              placeholder="Enter image URL or upload file"
            />
            <input
              type="file"
              ref={authorImageInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload('authorImage', file);
              }}
              accept="image/*"
              className={styles.fileInput}
            />
            <button
              type="button"
              onClick={() => authorImageInputRef.current?.click()}
              className={styles.uploadButton}
            >
              Upload
            </button>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Images</h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Blog Image <span className={styles.required}>*</span>
          </label>
          <div className={styles.imageUpload}>
            <input
              type="text"
              value={formData.blogImage}
              onChange={(e) => handleInputChange('blogImage', e.target.value)}
              className={`${styles.input} ${errors.blogImage ? styles.inputError : ''}`}
              placeholder="Enter image URL or upload file"
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload('blogImage', file);
              }}
              accept="image/*"
              className={styles.fileInput}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={styles.uploadButton}
            >
              Upload
            </button>
          </div>
          {errors.blogImage && <span className={styles.errorText}>{errors.blogImage}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Alt Text for Blog Image <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={formData.altText}
            onChange={(e) => handleInputChange('altText', e.target.value)}
            className={`${styles.input} ${errors.altText ? styles.inputError : ''}`}
            placeholder="Descriptive alt text for accessibility"
          />
          {errors.altText && <span className={styles.errorText}>{errors.altText}</span>}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Categories & Tags</h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Tags</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => handleInputChange('tags', e.target.value)}
            className={styles.input}
            placeholder="Travel, Car Rental, Tips (comma separated)"
          />
          <div className={styles.helpText}>Enter tags separated by commas</div>
        </div>
      </div>
    </div>
  );

  const renderSEO = () => (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>SEO Meta Tags</h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Meta Title <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={formData.metaTitle}
            onChange={(e) => handleInputChange('metaTitle', e.target.value)}
            className={`${styles.input} ${errors.metaTitle ? styles.inputError : ''}`}
            placeholder="SEO optimized title (max 60 characters)"
            maxLength={60}
          />
          <div className={styles.charCount}>{formData.metaTitle.length}/60</div>
          {errors.metaTitle && <span className={styles.errorText}>{errors.metaTitle}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Meta Description <span className={styles.required}>*</span>
          </label>
          <textarea
            value={formData.metaDescription}
            onChange={(e) => handleInputChange('metaDescription', e.target.value)}
            className={`${styles.textarea} ${errors.metaDescription ? styles.inputError : ''}`}
            placeholder="SEO meta description (max 160 characters)"
            rows={3}
            maxLength={160}
          />
          <div className={styles.charCount}>{formData.metaDescription.length}/160</div>
          {errors.metaDescription && <span className={styles.errorText}>{errors.metaDescription}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Focus Keywords</label>
          <input
            type="text"
            value={formData.focusKeywords}
            onChange={(e) => handleInputChange('focusKeywords', e.target.value)}
            className={styles.input}
            placeholder="car rental, budget travel (comma separated)"
          />
          <div className={styles.helpText}>1-2 main SEO keywords separated by commas</div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Canonical URL</label>
          <input
            type="url"
            value={formData.canonicalUrl}
            onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
            className={`${styles.input} ${errors.canonicalUrl ? styles.inputError : ''}`}
            placeholder="https://gadiyo.com/blog/your-blog-post"
          />
          {errors.canonicalUrl && <span className={styles.errorText}>{errors.canonicalUrl}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Read More URL</label>
          <input
            type="url"
            value={formData.readMoreUrl}
            onChange={(e) => handleInputChange('readMoreUrl', e.target.value)}
            className={`${styles.input} ${errors.readMoreUrl ? styles.inputError : ''}`}
            placeholder="https://example.com/full-article (if linking outside)"
          />
          {errors.readMoreUrl && <span className={styles.errorText}>{errors.readMoreUrl}</span>}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Internal & External Links</h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Internal Links</label>
          <textarea
            value={formData.internalLinks}
            onChange={(e) => handleInputChange('internalLinks', e.target.value)}
            className={styles.textarea}
            placeholder="Enter internal links (one per line)&#10;/car-rentals&#10;/travel-guide&#10;/destinations"
            rows={4}
          />
          <div className={styles.helpText}>Enter internal links to other Gadiyo pages, one per line</div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>External Links</label>
          <textarea
            value={formData.externalLinks}
            onChange={(e) => handleInputChange('externalLinks', e.target.value)}
            className={styles.textarea}
            placeholder="Enter external links (one per line)&#10;https://example.com/source1&#10;https://example.com/source2"
            rows={4}
          />
          <div className={styles.helpText}>Enter external authority sources, one per line</div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Schema Markup</h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Schema Markup (JSON-LD)</label>
          <textarea
            value={formData.schemaMarkup}
            onChange={(e) => handleInputChange('schemaMarkup', e.target.value)}
            className={styles.textarea}
            placeholder='{"@context": "https://schema.org", "@type": "BlogPosting", ...}'
            rows={6}
          />
          <div className={styles.helpText}>JSON-LD structured data for BlogPosting</div>
        </div>
      </div>
    </div>
  );

  const renderSocialMedia = () => (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Open Graph (Facebook/LinkedIn)</h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>
            OG Title <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={formData.ogTitle}
            onChange={(e) => handleInputChange('ogTitle', e.target.value)}
            className={`${styles.input} ${errors.ogTitle ? styles.inputError : ''}`}
            placeholder="Title for social media shares"
          />
          {errors.ogTitle && <span className={styles.errorText}>{errors.ogTitle}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            OG Description <span className={styles.required}>*</span>
          </label>
          <textarea
            value={formData.ogDescription}
            onChange={(e) => handleInputChange('ogDescription', e.target.value)}
            className={`${styles.textarea} ${errors.ogDescription ? styles.inputError : ''}`}
            placeholder="Description for social media preview"
            rows={3}
          />
          {errors.ogDescription && <span className={styles.errorText}>{errors.ogDescription}</span>}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Twitter Card</h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Twitter Title <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={formData.twitterTitle}
            onChange={(e) => handleInputChange('twitterTitle', e.target.value)}
            className={`${styles.input} ${errors.twitterTitle ? styles.inputError : ''}`}
            placeholder="Title for Twitter cards"
          />
          {errors.twitterTitle && <span className={styles.errorText}>{errors.twitterTitle}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Twitter Description <span className={styles.required}>*</span>
          </label>
          <textarea
            value={formData.twitterDescription}
            onChange={(e) => handleInputChange('twitterDescription', e.target.value)}
            className={`${styles.textarea} ${errors.twitterDescription ? styles.inputError : ''}`}
            placeholder="Description for Twitter preview"
            rows={3}
          />
          {errors.twitterDescription && <span className={styles.errorText}>{errors.twitterDescription}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Twitter Image</label>
          <div className={styles.imageUpload}>
            <input
              type="text"
              value={formData.twitterImage}
              onChange={(e) => handleInputChange('twitterImage', e.target.value)}
              className={styles.input}
              placeholder="Enter image URL or upload file"
            />
            <input
              type="file"
              ref={twitterImageInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload('twitterImage', file);
              }}
              accept="image/*"
              className={styles.fileInput}
            />
            <button
              type="button"
              onClick={() => twitterImageInputRef.current?.click()}
              className={styles.uploadButton}
            >
              Upload
            </button>
          </div>
          <div className={styles.helpText}>Recommended size: 1200x628 pixels</div>
        </div>
      </div>
    </div>
  );

  const renderAdvanced = () => (
    <div className={styles.tabContent}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Publishing</h3>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Publish Date</label>
            <input
              type="datetime-local"
              value={blog?.publishDate ? new Date(blog.publishDate).toISOString().slice(0, 16) : ''}
              readOnly
              className={styles.input}
            />
            <div className={styles.helpText}>Automatically set when first published</div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Last Updated</label>
            <input
              type="datetime-local"
              value={blog?.updatedDate ? new Date(blog.updatedDate).toISOString().slice(0, 16) : ''}
              readOnly
              className={styles.input}
            />
            <div className={styles.helpText}>Automatically updated on save</div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Additional Settings</h3>
        
        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.status === 'published'}
              onChange={(e) => handleInputChange('status', e.target.checked ? 'published' : 'draft')}
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>Publish immediately</span>
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              defaultChecked
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>Allow comments</span>
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              defaultChecked
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>Include in sitemap</span>
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              defaultChecked
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>Send notification to subscribers</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>
            {blog ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <p className={styles.subtitle}>
            {blog ? 'Update your blog post details' : 'Fill in the details to create a new blog post'}
          </p>
        </div>
        <button className={styles.cancelButton} onClick={onCancel}>
          ✕ Cancel
        </button>
      </div>

      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.formContent}>
          {activeTab === 'basic' && renderBasicInfo()}
          {activeTab === 'seo' && renderSEO()}
          {activeTab === 'social' && renderSocialMedia()}
          {activeTab === 'advanced' && renderAdvanced()}
        </div>

        <div className={styles.formActions}>
          <div className={styles.actionButtons}>
            <button
              type="button"
              className={styles.cancelActionButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.draftButton}
              onClick={(e) => handleSubmit(e, 'draft')}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="submit"
              className={styles.publishButton}
              onClick={(e) => handleSubmit(e, 'published')}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Now'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;