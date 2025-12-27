"use client";

import { useState, useEffect, ChangeEvent } from "react";
import styles from "@/app/styles/admin/pages/contacts.module.css";
import ConfirmModal from "@/app/components/admin/ui/ConfirmModal";
import Input from "@/app/components/admin/ui/Input";
import Select from "@/app/components/admin/ui/Select";
import Button from "@/app/components/admin/ui/Button";
import { Edit, Trash2, X } from "lucide-react";
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
  const [isUpdating, setIsUpdating] = useState(false);
  const [editFormData, setEditFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    subject: "",
    message: "",
    status: 1
  });

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
        setEditFormData({
          full_name: data.data.full_name,
          email: data.data.email,
          phone_number: data.data.phone_number,
          subject: data.data.subject,
          message: data.data.message,
          status: data.data.status
        });
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

  // Handle Edit Input Change
  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: name === 'status' ? parseInt(value) : value
    }));
  };

  // Handle Update Contact
  const handleUpdateContact = async () => {
    if (!selectedContact) return;

    try {
      setIsUpdating(true);
      const token = getAuthToken();
      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      // 1. Update Details
      const updateResponse = await fetch(`${port}/admin/contact/${selectedContact.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: editFormData.full_name,
          email: editFormData.email,
          phone_number: editFormData.phone_number,
          subject: editFormData.subject,
          message: editFormData.message
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update contact details");
      }

      // 2. Update Status (if changed)
      if (editFormData.status !== selectedContact.status) {
        const statusResponse = await fetch(`${port}/admin/contact/change-status/${selectedContact.id}`, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: editFormData.status
          }),
        });

        if (!statusResponse.ok) {
          throw new Error("Failed to update status");
        }
      }

      // Refresh list
      await fetchContacts(currentPage);
      setSelectedContact(null);

    } catch (err) {
      console.error("Error updating contact:", err);
      setError("Failed to update contact. Please try again.");
    } finally {
      setIsUpdating(false);
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedContact(contact);
                          setEditFormData({
                            full_name: contact.full_name,
                            email: contact.email,
                            phone_number: contact.phone_number,
                            subject: contact.subject,
                            message: contact.message,
                            status: contact.status
                          });
                          // Fetch latest details to ensure freshness
                          fetchContactDetails(contact.id);
                        }}
                        disabled={isLoadingDetail}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(contact.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
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
                className={`${styles.paginationButton} ${!pagination.previous ? styles.disabled : ""
                  }`}
              >
                Previous
              </button>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`${styles.paginationButton} ${currentPage === page ? styles.activePage : ""
                      }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
                disabled={!pagination.next}
                className={`${styles.paginationButton} ${!pagination.next ? styles.disabled : ""
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
              <h3 className={styles.modalTitle}>Update Contact Details</h3>
              <button
                onClick={() => setSelectedContact(null)}
                className={styles.closeButton}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.modalGrid}>
                <div className={styles.modalField}>
                  <Input
                    label="Full Name"
                    name="full_name"
                    value={editFormData.full_name}
                    onChange={handleEditInputChange}
                    fullWidth
                  />
                </div>
                <div className={styles.modalField}>
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditInputChange}
                    fullWidth
                  />
                </div>
                <div className={styles.modalField}>
                  <Input
                    label="Phone Number"
                    name="phone_number"
                    value={editFormData.phone_number}
                    onChange={handleEditInputChange}
                    fullWidth
                  />
                </div>
                <div className={styles.modalField}>
                  <Select
                    label="Status"
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditInputChange}
                    options={[
                      { value: 1, label: "New" },
                      { value: 2, label: "Processing" },
                      { value: 3, label: "Closed" }
                    ]}
                  />
                </div>
              </div>

              <div className={styles.modalField}>
                <Input
                  label="Subject"
                  name="subject"
                  value={editFormData.subject}
                  onChange={handleEditInputChange}
                  fullWidth
                />
              </div>

              <div className={styles.modalField}>
                <label className={styles.modalLabel}>Message</label>
                <textarea
                  name="message"
                  value={editFormData.message}
                  onChange={handleEditInputChange}
                  className={styles.searchInput}
                  style={{ width: '100%', minHeight: '100px', marginTop: '0.5rem' }}
                />
              </div>
            </div>

            <div className={styles.modalFooter}>
              <Button
                variant="outline"
                onClick={() => setSelectedContact(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleUpdateContact}
                isLoading={isUpdating}
              >
                Save Changes
              </Button>
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
      {
        !isLoading && filteredContacts.length === 0 && (
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
        )
      }
    </div >
  );
}