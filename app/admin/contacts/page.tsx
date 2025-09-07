"use client";

import { useState } from "react";
import styles from "@/app/styles/admin/pages/contacts.module.css";

// Types for contact data
interface Contact {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  subject: string;
  message: string;
  created_at: string;
  status: "new" | "read" | "replied" | "resolved";
}

// Dummy data
const dummyContacts: Contact[] = [
  {
    id: 1,
    full_name: "Nofal Basan",
    email: "nofal@techuz.com",
    phone_number: "9090909090",
    subject: "Advance",
    message: "Hey How are you ?",
    created_at: "2025-01-15T10:30:00Z",
    status: "new",
  },
  {
    id: 2,
    full_name: "John Smith",
    email: "john.smith@example.com",
    phone_number: "9876543210",
    subject: "Car Booking Inquiry",
    message:
      "I would like to book a jeep for weekend trip to Goa. Please provide available options and pricing.",
    created_at: "2025-01-14T14:20:00Z",
    status: "read",
  },
  {
    id: 3,
    full_name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone_number: "8765432109",
    subject: "Payment Issue",
    message:
      "I made a payment but it's not reflecting in my booking. Transaction ID: TXN123456789",
    created_at: "2025-01-14T09:15:00Z",
    status: "replied",
  },
  {
    id: 4,
    full_name: "Rahul Gupta",
    email: "rahul.gupta@yahoo.com",
    phone_number: "7654321098",
    subject: "Cancellation Request",
    message:
      "Due to emergency, I need to cancel my booking for tomorrow. Booking ID: BK001234",
    created_at: "2025-01-13T16:45:00Z",
    status: "resolved",
  },
  {
    id: 5,
    full_name: "Sarah Johnson",
    email: "sarah.j@hotmail.com",
    phone_number: "6543210987",
    subject: "Vehicle Complaint",
    message:
      "The vehicle provided had some mechanical issues during our trip. Need compensation discussion.",
    created_at: "2025-01-13T11:30:00Z",
    status: "read",
  },
  {
    id: 6,
    full_name: "Amit Patel",
    email: "amit.patel@company.com",
    phone_number: "5432109876",
    subject: "Corporate Booking",
    message:
      "We need multiple vehicles for our company retreat. Can you provide bulk booking discounts?",
    created_at: "2025-01-12T13:20:00Z",
    status: "new",
  },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(dummyContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Filter contacts based on search and status
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || contact.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = filteredContacts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
  const getStatusClass = (status: string) => {
    switch (status) {
      case "new":
        return styles.statusNew;
      case "read":
        return styles.statusRead;
      case "replied":
        return styles.statusReplied;
      case "resolved":
        return styles.statusResolved;
      default:
        return styles.statusDefault;
    }
  };

  // Update contact status
  const updateContactStatus = (
    contactId: number,
    newStatus: Contact["status"]
  ) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId ? { ...contact, status: newStatus } : contact
      )
    );
  };

  // Truncate message
  const truncateMessage = (message: string, maxLength: number = 50) => {
    return message.length > maxLength
      ? message.substring(0, maxLength) + "..."
      : message;
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
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="resolved">Resolved</option>
            </select>

            {/* Stats */}
            <div className={styles.statsContainer}>
              <span className={styles.statTotal}>Total: {contacts.length}</span>
              <span className={styles.statNew}>
                New: {contacts.filter((c) => c.status === "new").length}
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
              {paginatedContacts.map((contact) => (
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
                      className={`${styles.statusBadge} ${getStatusClass(
                        contact.status
                      )}`}
                    >
                      {contact.status.charAt(0).toUpperCase() +
                        contact.status.slice(1)}
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
                        onClick={() => setSelectedContact(contact)}
                        className={styles.viewButton}
                      >
                        View
                      </button>
                      <select
                        value={contact.status}
                        onChange={(e) =>
                          updateContactStatus(
                            contact.id,
                            e.target.value as Contact["status"]
                          )
                        }
                        className={styles.statusSelect}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredContacts.length)} of{" "}
              {filteredContacts.length} results
            </div>
            <div className={styles.paginationButtons}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`${styles.paginationButton} ${
                  currentPage === 1 ? styles.disabled : ""
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
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
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`${styles.paginationButton} ${
                  currentPage === totalPages ? styles.disabled : ""
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
                  className={`${styles.statusBadge} ${getStatusClass(
                    selectedContact.status
                  )}`}
                >
                  {selectedContact.status.charAt(0).toUpperCase() +
                    selectedContact.status.slice(1)}
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
                  updateContactStatus(selectedContact.id, "replied");
                  setSelectedContact(null);
                }}
                className={styles.modalConfirmButton}
              >
                Mark as Replied
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredContacts.length === 0 && (
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
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}
