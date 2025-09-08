// app/admin/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
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

// Note: This would typically be in a separate file
// export const metadata: Metadata = {
//   title: "Admin Dashboard - Gadiyo",
//   description: "Admin dashboard for managing cars, bookings, and more",
// };

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
}

interface RecentActivity {
  id: string;
  type: 'contact' | 'blog' | 'inquiry' | 'booking';
  title: string;
  time: string;
  status?: 'pending' | 'completed' | 'published' | 'draft';
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

const AdminDashboard: React.FC = () => {
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
    responseTime: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      // Simulate API call
      setTimeout(() => {
        setStats({
          totalContacts: 1247,
          totalBlogs: 89,
          totalInquiries: 324,
          totalBookings: 156,
          totalCars: 45,
          monthlyRevenue: 125000,
          activeUsers: 892,
          blogViews: 15420,
          pendingInquiries: 23,
          completedBookings: 133,
          averageRating: 4.7,
          responseTime: 2.3
        });

        setRecentActivity([
          {
            id: '1',
            type: 'contact',
            title: 'New contact from John Doe',
            time: '2 minutes ago',
            status: 'pending'
          },
          {
            id: '2',
            type: 'blog',
            title: 'Blog post "Best Car Rental Tips" published',
            time: '15 minutes ago',
            status: 'published'
          },
          {
            id: '3',
            type: 'inquiry',
            title: 'Car rental inquiry for BMW X5',
            time: '30 minutes ago',
            status: 'pending'
          },
          {
            id: '4',
            type: 'booking',
            title: 'Booking confirmed for Toyota Camry',
            time: '1 hour ago',
            status: 'completed'
          },
          {
            id: '5',
            type: 'contact',
            title: 'Support request from Sarah Smith',
            time: '2 hours ago',
            status: 'pending'
          }
        ]);

        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

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
      title: 'Total Blogs',
      value: stats.totalBlogs,
      change: 8.2,
      changeLabel: 'vs last month',
      icon: FileText,
      color: '#10b981',
      bgColor: '#f0fdf4'
    },
    {
      title: 'Total Inquiries',
      value: stats.totalInquiries.toLocaleString(),
      change: 15.7,
      changeLabel: 'vs last month',
      icon: MessageSquare,
      color: '#f59e0b',
      bgColor: '#fffbeb'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings.toLocaleString(),
      change: 23.1,
      changeLabel: 'vs last month',
      icon: Calendar,
      color: '#8b5cf6',
      bgColor: '#faf5ff'
    },
    {
      title: 'Available Cars',
      value: stats.totalCars,
      change: 5.4,
      changeLabel: 'vs last month',
      icon: Car,
      color: '#ef4444',
      bgColor: '#fef2f2'
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
      title: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      change: 7.3,
      changeLabel: 'vs last month',
      icon: Eye,
      color: '#06b6d4',
      bgColor: '#f0fdfa'
    },
    {
      title: 'Blog Views',
      value: `${(stats.blogViews / 1000).toFixed(1)}K`,
      change: 31.2,
      changeLabel: 'vs last month',
      icon: TrendingUp,
      color: '#84cc16',
      bgColor: '#f7fee7'
    }
  ];

  const quickStats = [
    {
      label: 'Pending Inquiries',
      value: stats.pendingInquiries,
      icon: Clock,
      color: '#f59e0b',
      urgent: stats.pendingInquiries > 20
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
      case 'pending':
        return '#f59e0b';
      case 'completed':
        return '#10b981';
      case 'published':
        return '#3b82f6';
      case 'draft':
        return '#6b7280';
      default:
        return '#6b7280';
    }
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
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>
            Welcome to your admin panel. Here's what's happening with your business today.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.refreshButton}>
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
            <button className={styles.viewAllButton}>View All</button>
          </div>
          <div className={styles.activityList}>
            {recentActivity.map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className={styles.activityItem}>
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
            <button className={styles.actionButton}>
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