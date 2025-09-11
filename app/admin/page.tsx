// app/admin/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Car, 
  Calendar, 
  TrendingUp, 
  Eye,
  Phone,
  Mail,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import type { LucideIcon } from "lucide-react";
import styles from '@/app/styles/admin/pages/dashboard.module.css';

const port = process.env.NEXT_PUBLIC_APP_URL;

// Add your ROUTES import here
// import { ROUTES } from '@/app/constants/routes'; // Adjust path as needed

interface Contact {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  subject: string;
  message: string;
  created_at: string;
  status: number;
}

interface DashboardStats {
  totalContacts: number;
  totalBlogs: number;
  totalInquiries: number;
  totalBookings: number;
  totalCars: number;
  monthlyRevenue: number;
  activeUsers: number;
  blogViews: number;
  pendingInquiries: number;
  completedBookings: number;
  averageRating: number;
  responseTime: number;
  newContacts: number; // New contacts today
  unreadContacts: number; // Unread contacts
}

interface RecentActivity {
  id: string;
  type: 'contact' | 'blog' | 'inquiry' | 'booking';
  title: string;
  time: string;
  status?: 'pending' | 'completed' | 'published' | 'draft' | 'new' | 'read';
  contactId?: number; // For contact-related activities
}

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

interface ApiResponse {
  data: {
    pagination: {
      totalRecords: number;
      currentPage: number;
      recordPerPage: number;
      previous: number | null;
      pages: number;
      next: number | null;
    };
    result: Contact[];
  };
  message: string;
  status: number;
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    totalBlogs: 0,
    totalInquiries: 0,
    totalBookings: 0,
    totalCars: 0,
    monthlyRevenue: 0,
    activeUsers: 0,
    blogViews: 0,
    pendingInquiries: 0,
    completedBookings: 0,
    averageRating: 0,
    responseTime: 0,
    newContacts: 0,
    unreadContacts: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem("adminToken");
  };

  // Fetch contacts from API
  const fetchContacts = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const response = await fetch(`${port}/admin/contact?page=1`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.status === 200) {
        const contacts = data.data.result;
        setRecentContacts(contacts.slice(0, 5)); // Get latest 5 contacts
        
        // Calculate contact stats
        const totalContacts = data.data.pagination.totalRecords;
        const today = new Date().toDateString();
        const newContactsToday = contacts.filter(contact => 
          new Date(contact.created_at).toDateString() === today
        ).length;
        const unreadContacts = contacts.filter(contact => 
          contact.status === 1 // Assuming 1 is "new" status
        ).length;

        // Update stats with real contact data
        setStats(prevStats => ({
          ...prevStats,
          totalContacts,
          newContacts: newContactsToday,
          unreadContacts,
          pendingInquiries: unreadContacts // Use unread contacts as pending inquiries
        }));

        // Generate recent activity from contacts
        const contactActivities: RecentActivity[] = contacts.slice(0, 3).map(contact => ({
          id: `contact-${contact.id}`,
          type: 'contact',
          title: `New contact from ${contact.full_name}`,
          time: getTimeAgo(contact.created_at),
          status: getContactStatus(contact.status),
          contactId: contact.id
        }));

        // Merge with existing activities (blogs, bookings, etc.)
        const otherActivities: RecentActivity[] = [
          {
            id: '2',
            type: 'blog',
            title: 'Blog post "Best Car Rental Tips" published',
            time: '15 minutes ago',
            status: 'published'
          },
          {
            id: '4',
            type: 'booking',
            title: 'Booking confirmed for Toyota Camry',
            time: '1 hour ago',
            status: 'completed'
          }
        ];

        setRecentActivity([...contactActivities, ...otherActivities]);

      } else {
        throw new Error(data.message || "Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to load dashboard data. Please try again.");
    }
  };

  // Helper function to get contact status string
  const getContactStatus = (status: number): 'new' | 'read' | 'pending' | 'completed' => {
    switch (status) {
      case 1: return 'new';
      case 2: return 'read';
      case 3: return 'completed';
      case 4: return 'completed';
      default: return 'pending';
    }
  };

  // Helper function to calculate time ago
  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Load dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Initialize with default values
      setStats({
        totalContacts: 0,
        totalBlogs: 89,
        totalInquiries: 0,
        totalBookings: 156,
        totalCars: 45,
        monthlyRevenue: 125000,
        activeUsers: 892,
        blogViews: 15420,
        pendingInquiries: 0,
        completedBookings: 133,
        averageRating: 4.7,
        responseTime: 2.3,
        newContacts: 0,
        unreadContacts: 0
      });

      // Fetch real contact data
      await fetchContacts();
      
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  // Navigation handlers
  const handleViewContacts = () => {
    // Replace with your actual route
    router.push('/admin/contacts'); // or ROUTES.ADMIN_ROUTES.contacts
  };

  const statCards: StatCard[] = [
    {
      title: 'Total Contacts',
      value: stats.totalContacts.toLocaleString(),
      change: 12.5,
      changeLabel: 'vs last month',
      icon: Users,
      color: '#3b82f6',
      bgColor: '#eff6ff'
    },
    {
      title: 'New Contacts Today',
      value: stats.newContacts,
      change: stats.newContacts > 0 ? 100 : 0,
      changeLabel: 'new today',
      icon: Phone,
      color: '#10b981',
      bgColor: '#f0fdf4'
    },
    {
      title: 'Unread Contacts',
      value: stats.unreadContacts,
      change: stats.unreadContacts > 5 ? -10 : 5,
      changeLabel: 'needs attention',
      icon: Mail,
      color: '#f59e0b',
      bgColor: '#fffbeb'
    },
    {
      title: 'Total Blogs',
      value: stats.totalBlogs,
      change: 8.2,
      changeLabel: 'vs last month',
      icon: FileText,
      color: '#8b5cf6',
      bgColor: '#faf5ff'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings.toLocaleString(),
      change: 23.1,
      changeLabel: 'vs last month',
      icon: Calendar,
      color: '#ef4444',
      bgColor: '#fef2f2'
    },
    {
      title: 'Available Cars',
      value: stats.totalCars,
      change: 5.4,
      changeLabel: 'vs last month',
      icon: Car,
      color: '#06b6d4',
      bgColor: '#f0fdfa'
    },
    {
      title: 'Monthly Revenue',
      value: `₹${(stats.monthlyRevenue / 1000).toFixed(0)}K`,
      change: 18.9,
      changeLabel: 'vs last month',
      icon: TrendingUp,
      color: '#fab12f',
      bgColor: '#fefce8'
    },
    {
      title: 'Blog Views',
      value: `${(stats.blogViews / 1000).toFixed(1)}K`,
      change: 31.2,
      changeLabel: 'vs last month',
      icon: Eye,
      color: '#84cc16',
      bgColor: '#f7fee7'
    }
  ];

  const quickStats = [
    {
      label: 'Pending Inquiries',
      value: stats.unreadContacts,
      icon: Clock,
      color: '#f59e0b',
      urgent: stats.unreadContacts > 10
    },
    {
      label: 'Completed Bookings',
      value: stats.completedBookings,
      icon: Calendar,
      color: '#10b981',
      urgent: false
    },
    {
      label: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      icon: Star,
      color: '#f59e0b',
      urgent: stats.averageRating < 4.5
    },
    {
      label: 'Avg Response Time',
      value: `${stats.responseTime}h`,
      icon: Clock,
      color: '#3b82f6',
      urgent: stats.responseTime > 4
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'contact':
        return Phone;
      case 'blog':
        return FileText;
      case 'inquiry':
        return MessageSquare;
      case 'booking':
        return Calendar;
      default:
        return MessageSquare;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'new':
        return '#f59e0b';
      case 'pending':
        return '#f59e0b';
      case 'completed':
        return '#10b981';
      case 'published':
        return '#3b82f6';
      case 'read':
        return '#6b7280';
      case 'draft':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const handleActivityClick = (activity: RecentActivity) => {
    if (activity.type === 'contact' && activity.contactId) {
      // Navigate to contacts page with specific contact highlighted
      router.push(`/admin/contacts?highlight=${activity.contactId}`);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    await fetchContacts();
    setLoading(false);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>
          <span>{error}</span>
          <button onClick={() => setError('')}>×</button>
        </div>
      )}

      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>
            Welcome to your admin panel. Here's what's happening with your business today.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.refreshButton} onClick={refreshData}>
            <TrendingUp size={16} />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className={styles.statsGrid}>
        {statCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div key={index} className={styles.statCard}>
              <div className={styles.statCardHeader}>
                <div 
                  className={styles.statIcon}
                  style={{ backgroundColor: card.bgColor }}
                >
                  <IconComponent size={24} color={card.color} />
                </div>
                <div className={styles.statChange}>
                  {card.change > 0 ? (
                    <ArrowUpRight size={16} className={styles.changeIconPositive} />
                  ) : (
                    <ArrowDownRight size={16} className={styles.changeIconNegative} />
                  )}
                  <span 
                    className={card.change > 0 ? styles.changePositive : styles.changeNegative}
                  >
                    {card.change > 0 ? '+' : ''}{card.change}%
                  </span>
                </div>
              </div>
              <div className={styles.statCardBody}>
                <h3 className={styles.statValue}>{card.value}</h3>
                <p className={styles.statTitle}>{card.title}</p>
                <p className={styles.statChangeLabel}>{card.changeLabel}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.dashboardGrid}>
        {/* Quick Stats */}
        <div className={styles.quickStatsCard}>
          <h2 className={styles.sectionTitle}>Quick Overview</h2>
          <div className={styles.quickStatsGrid}>
            {quickStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index} 
                  className={`${styles.quickStat} ${stat.urgent ? styles.quickStatUrgent : ''}`}
                >
                  <div className={styles.quickStatIcon}>
                    <IconComponent size={20} style={{ color: stat.color }} />
                  </div>
                  <div className={styles.quickStatContent}>
                    <div className={styles.quickStatValue}>{stat.value}</div>
                    <div className={styles.quickStatLabel}>{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.activityCard}>
          <div className={styles.activityHeader}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
            <button 
              className={styles.viewAllButton}
              onClick={handleViewContacts}
            >
              View All
            </button>
          </div>
          <div className={styles.activityList}>
            {recentActivity.map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div 
                  key={activity.id} 
                  className={`${styles.activityItem} ${activity.type === 'contact' ? styles.clickable : ''}`}
                  onClick={() => handleActivityClick(activity)}
                >
                  <div className={styles.activityIcon}>
                    <IconComponent size={16} />
                  </div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityTitle}>{activity.title}</p>
                    <p className={styles.activityTime}>{activity.time}</p>
                  </div>
                  {activity.status && (
                    <div 
                      className={styles.activityStatus}
                      style={{ backgroundColor: getStatusColor(activity.status) }}
                    >
                      {activity.status}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className={styles.actionCards}>
        <div className={styles.actionCard}>
          <div className={styles.actionCardIcon}>
            <Users size={24} style={{ color: '#3b82f6' }} />
          </div>
          <div className={styles.actionCardContent}>
            <h3>Manage Contacts</h3>
            <p>View and respond to customer contacts</p>
            <button 
              className={styles.actionButton}
              onClick={handleViewContacts}
            >
              View Contacts
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className={styles.actionCard}>
          <div className={styles.actionCardIcon}>
            <FileText size={24} style={{ color: '#10b981' }} />
          </div>
          <div className={styles.actionCardContent}>
            <h3>Create Blog Post</h3>
            <p>Write and publish new blog content</p>
            <button className={styles.actionButton}>
              Create Blog
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className={styles.actionCard}>
          <div className={styles.actionCardIcon}>
            <MessageSquare size={24} style={{ color: '#f59e0b' }} />
          </div>
          <div className={styles.actionCardContent}>
            <h3>Review Inquiries</h3>
            <p>Respond to customer inquiries and requests</p>
            <button className={styles.actionButton}>
              View Inquiries
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className={styles.actionCard}>
          <div className={styles.actionCardIcon}>
            <Car size={24} style={{ color: '#8b5cf6' }} />
          </div>
          <div className={styles.actionCardContent}>
            <h3>Manage Fleet</h3>
            <p>Add and manage your car rental fleet</p>
            <button className={styles.actionButton}>
              Manage Cars
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;