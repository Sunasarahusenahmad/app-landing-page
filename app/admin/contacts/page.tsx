"use client";

import { useState, useEffect } from "react";
import styles from "@/app/styles/admin/pages/contacts.module.css";
import ConfirmModal from "@/app/components/admin/ui/ConfirmModal";
const port = process.env.NEXT_PUBLIC_APP_URL;

// Types for contact data
interface Contact {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  subject: string;
  message: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status: number; // API uses numeric status
}

interface ContactDetails extends Contact {
  // Additional fields if needed for detailed view
}

interface PaginationData {
  totalRecords: number;
  currentPage: number;
  recordPerPage: number;
  previous: number | null;
  pages: number;
  next: number | null;
}

interface ApiResponse {
  data: {
    pagination: PaginationData;
    result: Contact[];
  };
  message: string;
  status: number;
}

interface SingleContactResponse {
  data: ContactDetails;
  message: string;
  status: number;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<number | null>(null);

  // Status mapping - adjust these based on your API's status values
  const statusMap = {
    1: "new",
    2: "processing", 
    3: "closed",
  } as const;

  const reverseStatusMap = {
    "new": 1,
    "processing": 2,
    "closed": 3
  } as const;

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem("adminToken");
  };

  // Fetch contacts from API
  const fetchContacts = async (page: number = 1) => {
    try {
      setIsLoading(true);
      setError("");
      
      const token = getAuthToken();
      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const response = await fetch(`${port}/admin/contact?page=${page}`, {
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
        setContacts(data.data.result);
        setPagination(data.data.pagination);
      } else {
        throw new Error(data.message || "Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setError("Failed to load contacts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch single contact details
  const fetchContactDetails = async (contactId: number) => {
    try {
      setIsLoadingDetail(true);
      
      const token = getAuthToken();
      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const response = await fetch(`${port}/admin/contact/${contactId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SingleContactResponse = await response.json();
      
      if (data.status === 200) {
        setSelectedContact(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch contact details");
      }
    } catch (error) {
      console.error("Error fetching contact details:", error);
      setError("Failed to load contact details. Please try again.");
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // Update contact status
  const updateContactStatus = async (contactId: number, newStatus: number) => {
    try {
      const token = getAuthToken();
      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const response = await fetch(`${port}/admin/contact/change-status/${contactId}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 200) {
        // Update local state
        setContacts(prev => 
          prev.map(contact => 
            contact.id === contactId 
              ? { ...contact, status: newStatus }
              : contact
          )
        );
        
        // Update selected contact if it's the same one
        if (selectedContact && selectedContact.id === contactId) {
          setSelectedContact(prev => prev ? { ...prev, status: newStatus } : null);
        }
      } else {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating contact status:", error);
      setError("Failed to update contact status. Please try again.");
    }
  };

  // Delete contact
  const handleDeleteContact = async (contactId: number) => {
    try {
      setIsDeleting(true);
      setError("");
      
      const token = getAuthToken();
      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const response = await fetch(`${port}/admin/contact/${contactId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 200) {
        // Remove from local state
        setContacts(prev => prev.filter(contact => contact.id !== contactId));
        
        // Close modal if the deleted contact was selected
        setSelectedContact(null);
        
        // Refresh the list to get updated pagination
        fetchContacts(currentPage);
      } else {
        throw new Error(data.message || "Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      setError("Failed to delete contact. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Load contacts on component mount and page change
  useEffect(() => {
    fetchContacts(currentPage);
  }, [currentPage]);

  // Handle view contact
  const handleViewContact = async (contact: Contact) => {
    await fetchContactDetails(contact.id);
  };

  // Filter contacts based on search and status
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const contactStatusString = statusMap[contact.status as keyof typeof statusMap] || "unknown";
    const matchesStatus = statusFilter === "all" || contactStatusString === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color
  const getStatusClass = (status: number) => {
    const statusString = statusMap[status as keyof typeof statusMap];
    switch (statusString) {
      case "new":
        return styles.statusNew;
      case "processing":
        return styles.statusProcessing;
      case "closed":
        return styles.statusClosed;
      default:
        return styles.statusDefault;
    }
  };

  // Truncate message
  const truncateMessage = (message: string, maxLength: number = 50) => {
    return message.length > maxLength
      ? message.substring(0, maxLength) + "..."
      : message;
  };

  // Get status display text
  const getStatusText = (status: number) => {
    const statusString = statusMap[status as keyof typeof statusMap];
    return statusString ? statusString.charAt(0).toUpperCase() + statusString.slice(1) : "Unknown";
  };

  // Calculate stats
  const getStatusCount = (statusNum: number) => {
    return contacts.filter(c => c.status === statusNum).length;
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading contacts...</p>
        </div>
      </div>
    );
  }

  // Handler to show delete confirmation modal
const handleDeleteClick = (contactId: number) => {
  setContactToDelete(contactId);
  setShowDeleteModal(true);
};

// Handler for confirming delete
const handleDeleteConfirm = async () => {
  if (contactToDelete) {
    await handleDeleteContact(contactToDelete);
    setShowDeleteModal(false);
    setContactToDelete(null);
  }
};

// Handler for canceling delete
const handleDeleteCancel = () => {
  setShowDeleteModal(false);
  setContactToDelete(null);
};

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Contact Management</h1>
        <p className={styles.subtitle}>
          Manage customer inquiries and messages
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>
          <svg className={styles.errorIcon} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
          <button onClick={() => setError("")} className={styles.errorClose}>×</button>
        </div>
      )}

      {/* Filters and Search */}
      <div className={styles.filtersCard}>
        <div className={styles.filtersContent}>
          {/* Search */}
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <svg
                className={styles.searchIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className={styles.filterSection}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.statusSelect}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="processing">Processing</option>
              <option value="closed">Closed</option>
            </select>

            {/* Stats */}
            <div className={styles.statsContainer}>
              <span className={styles.statTotal}>
                Total: {pagination?.totalRecords || 0}
              </span>
              <span className={styles.statNew}>
                New: {getStatusCount(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeader}>Contact Info</th>
                <th className={styles.tableHeader}>Subject</th>
                <th className={styles.tableHeader}>Message Preview</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}>Date</th>
                <th className={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <div className={styles.contactInfo}>
                      <div className={styles.contactName}>
                        {contact.full_name}
                      </div>
                      <div className={styles.contactEmail}>{contact.email}</div>
                      <div className={styles.contactPhone}>
                        {contact.phone_number}
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.subject}>{contact.subject}</div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.messagePreview}>
                      {truncateMessage(contact.message)}
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.statusBadge} ${getStatusClass(contact.status)}`}
                    >
                      {getStatusText(contact.status)}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={styles.dateText}>
                      {formatDate(contact.created_at)}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.actions}>
                      <button
                        onClick={() => handleViewContact(contact)}
                        className={styles.viewButton}
                        disabled={isLoadingDetail}
                      >
                        {isLoadingDetail ? "Loading..." : "View"}
                      </button>
                      <select
                        value={contact.status}
                        onChange={(e) =>
                          updateContactStatus(contact.id, parseInt(e.target.value))
                        }
                        className={styles.statusSelect}
                      >
                        <option value={1}>New</option>
                        <option value={2}>Processing</option>
                        <option value={3}>Closed</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              Showing {((currentPage - 1) * pagination.recordPerPage) + 1} to{" "}
              {Math.min(currentPage * pagination.recordPerPage, pagination.totalRecords)} of{" "}
              {pagination.totalRecords} results
            </div>
            <div className={styles.paginationButtons}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={!pagination.previous}
                className={`${styles.paginationButton} ${
                  !pagination.previous ? styles.disabled : ""
                }`}
              >
                Previous
              </button>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`${styles.paginationButton} ${
                      currentPage === page ? styles.activePage : ""
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
                disabled={!pagination.next}
                className={`${styles.paginationButton} ${
                  !pagination.next ? styles.disabled : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedContact && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Contact Details</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className={styles.closeButton}
              >
                <svg
                  className={styles.closeIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.modalGrid}>
                <div className={styles.modalField}>
                  <label className={styles.modalLabel}>Full Name</label>
                  <p className={styles.modalValue}>
                    {selectedContact.full_name}
                  </p>
                </div>
                <div className={styles.modalField}>
                  <label className={styles.modalLabel}>Email</label>
                  <p className={styles.modalValue}>{selectedContact.email}</p>
                </div>
                <div className={styles.modalField}>
                  <label className={styles.modalLabel}>Phone Number</label>
                  <p className={styles.modalValue}>
                    {selectedContact.phone_number}
                  </p>
                </div>
                <div className={styles.modalField}>
                  <label className={styles.modalLabel}>Date</label>
                  <p className={styles.modalValue}>
                    {formatDate(selectedContact.created_at)}
                  </p>
                </div>
              </div>
              <div className={styles.modalField}>
                <label className={styles.modalLabel}>Subject</label>
                <p className={styles.modalValue}>{selectedContact.subject}</p>
              </div>
              <div className={styles.modalField}>
                <label className={styles.modalLabel}>Message</label>
                <p className={styles.modalMessage}>{selectedContact.message}</p>
              </div>
              <div className={styles.modalField}>
                <label className={styles.modalLabel}>Status</label>
                <span
                  className={`${styles.statusBadge} ${getStatusClass(selectedContact.status)}`}
                >
                  {getStatusText(selectedContact.status)}
                </span>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                onClick={() => setSelectedContact(null)}
                className={styles.modalCancelButton}
              >
                Close
              </button>
              <button
                onClick={() => {
                  updateContactStatus(selectedContact.id, 3); // Mark as closed
                  setSelectedContact(null);
                }}
                className={styles.modalConfirmButton}
                disabled={isDeleting}
              >
                Mark as Closed
              </button>
              <button
                onClick={() => handleDeleteClick(selectedContact.id)}
                className={styles.modalDeleteButton}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <svg className={styles.spinner} viewBox="0 0 24 24">
                      <circle
                        className={styles.spinnerCircle}
                        cx="12"
                        cy="12"
                        r="10"
                      />
                    </svg>
                    Deleting...
                  </>
                ) : (
                  <>
                    <svg
                      className={styles.deleteIcon}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete Contact
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        type="delete"
        title="Delete Contact"
        message="Are you sure you want to delete this contact? This action cannot be undone and all contact information will be permanently removed."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {/* Empty State */}
      {!isLoading && filteredContacts.length === 0 && (
        <div className={styles.emptyState}>
          <svg
            className={styles.emptyIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m-2 0v4a1 1 0 001 1h1"
            />
          </svg>
          <h3 className={styles.emptyTitle}>No contacts found</h3>
          <p className={styles.emptySubtitle}>
            {searchTerm || statusFilter !== "all" 
              ? "Try adjusting your search or filter criteria."
              : "No contacts have been submitted yet."
            }
          </p>
        </div>
      )}
    </div>
  );
}