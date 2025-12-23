"use client";

import { useState, useEffect } from "react";
import styles from "@/app/styles/admin/pages/subscription.module.css";
import { Plus, Check, Edit2, Trash2, X } from "lucide-react";
import Input from "@/app/components/admin/ui/Input";
import Select from "@/app/components/admin/ui/Select";
import { api } from "@/app/lib/api/api";
import { API_ENDPOINTS } from "@/app/lib/constants";
import toast from "react-hot-toast";
import LoadingOverlay from "@/app/components/admin/ui/LoadingOverlay";

// -- TYPES --
interface Plan {
    id: number;
    name: string;
    price: number;
    interval: string;
    description: string;
    features: string[];
}

interface Transaction {
    id: number;
    user_id: number;
    price: number;
    ramzorpay_payment_id: string; // From API Response
    invoice_url: string;
    status: number;
    created_at: string;
    user: {
        first_name: string;
        last_name: string;
        email: string;
    };
    plan: {
        name: string;
        plan_type: string;
    };
}

export default function SubscriptionPlanPage() {
    const [activeTab, setActiveTab] = useState<"plans" | "history">("plans");
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(false);

    // Pagination & Filters State
    const [search, setSearch] = useState("");
    const [planType, setPlanType] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalRecords: 0,
        recordPerPage: 10
    });

    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
    const [formState, setFormState] = useState({
        name: "",
        price: "",
        interval: "monthly",
        description: "",
        features: "",
    });

    // Fetch Plans
    const fetchPlans = async () => {
        setLoading(true);
        try {
            const queryParams: any = {
                pageNumber: pagination.currentPage.toString(),
                recordPerPage: pagination.recordPerPage.toString(),
            };

            if (search) queryParams.search = search;
            if (planType) queryParams.plan_type = planType;

            const response = await api.get<any>(API_ENDPOINTS.getPlans, {
                params: queryParams
            });

            if (response.status === 200) {
                const fetchedPlans = response.data.result.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    price: parseFloat(item.price),
                    interval: item.plan_type,
                    description: item.description,
                    features: [],
                }));

                setPlans(fetchedPlans);
                setPagination(prev => ({
                    ...prev,
                    currentPage: response.data.pagination.currentPage,
                    totalPages: response.data.pagination.pages,
                    totalRecords: response.data.pagination.totalRecords,
                }));
            }
        } catch (error) {
            console.error("Error fetching plans:", error);
            toast.error("Failed to fetch plans");
        } finally {
            setLoading(false);
        }
    };

    // Fetch Transactions
    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const queryParams: any = {
                pageNumber: pagination.currentPage.toString(),
                recordPerPage: pagination.recordPerPage.toString(),
            };

            const response = await api.get<any>(API_ENDPOINTS.transactionHistory, {
                params: queryParams
            });

            if (response.status === 200) {
                setTransactions(response.data.result);
                setPagination(prev => ({
                    ...prev,
                    currentPage: response.data.pagination.currentPage,
                    totalPages: response.data.pagination.pages,
                    totalRecords: response.data.pagination.totalRecords,
                }));
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
            toast.error("Failed to fetch history");
        } finally {
            setLoading(false);
        }
    };

    // Load Data based on Active Tab
    useEffect(() => {
        if (activeTab === "plans") {
            const timer = setTimeout(() => {
                fetchPlans();
            }, 500);
            return () => clearTimeout(timer);
        } else {
            fetchTransactions();
        }
    }, [activeTab, pagination.currentPage, search, planType]);

    // Handlers
    const handleOpenModal = (plan?: Plan) => {
        if (plan) {
            setEditingPlan(plan);
            setFormState({
                name: plan.name,
                price: plan.price.toString(),
                interval: plan.interval,
                description: plan.description,
                features: plan.features.join(", "),
            });
        } else {
            setEditingPlan(null);
            setFormState({
                name: "",
                price: "",
                interval: "monthly",
                description: "",
                features: "",
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPlan(null);
    };

    const handleSavePlan = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingPlan) {
            // Create New Plan
            try {
                const payload = new URLSearchParams();
                payload.append('name', formState.name);
                payload.append('price', formState.price);
                payload.append('plan_type', formState.interval);
                payload.append('description', formState.description);

                const response = await api.post<any>(API_ENDPOINTS.addPlan, payload, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });

                if (response.status === 200) {
                    toast.success(response.message || "Plan added successfully");
                    handleCloseModal();
                    fetchPlans(); // Refresh list
                } else {
                    toast.error(response.message || "Failed to add plan");
                }
            } catch (error: any) {
                console.error("Error adding plan:", error);
                toast.error(error.message || "An error occurred while adding the plan");
            }
        } else {
            // Update Existing Plan
            try {
                const payload = new URLSearchParams();
                payload.append('name', formState.name);
                payload.append('price', formState.price);
                payload.append('plan_type', formState.interval);
                payload.append('description', formState.description);

                const response = await api.put<any>(`${API_ENDPOINTS.updatePlan}/${editingPlan.id}`, payload, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });

                if (response.status === 200) {
                    toast.success(response.message || "Plan updated successfully");
                    handleCloseModal();
                    fetchPlans(); // Refresh list
                } else {
                    toast.error(response.message || "Failed to update plan");
                }
            } catch (error: any) {
                console.error("Error updating plan:", error);
                toast.error(error.message || "An error occurred while updating the plan");
            }
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Subscription Plans</h1>
                    <p className={styles.subtitle}>Manage pricing plans and view transaction history</p>
                </div>
                {activeTab === "plans" && (
                    <button className={styles.addButton} onClick={() => handleOpenModal()}>
                        <Plus size={20} />
                        Add Plan
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className={styles.tabsContainer}>
                <div className={styles.tabsList}>
                    <button
                        className={`${styles.tab} ${activeTab === "plans" ? styles.activeTab : ""}`}
                        onClick={() => {
                            setActiveTab("plans");
                            setPagination(prev => ({ ...prev, currentPage: 1, totalPages: 1 }));
                        }}
                    >
                        Plans
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "history" ? styles.activeTab : ""}`}
                        onClick={() => {
                            setActiveTab("history");
                            setPagination(prev => ({ ...prev, currentPage: 1, totalPages: 1 }));
                        }}
                    >
                        Transactions History
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            {activeTab === "plans" && (
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <Input
                            placeholder="Search plans..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        style={{
                            padding: '0.625rem 1rem',
                            fontSize: '0.875rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.5rem',
                            backgroundColor: 'white',
                            minWidth: '150px'
                        }}
                        value={planType}
                        onChange={(e) => setPlanType(e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
            )}

            {/* Content */}
            <div style={{ position: 'relative', minHeight: '200px' }}>
                <LoadingOverlay isLoading={loading} />

                {activeTab === "plans" ? (
                    <div className={styles.plansGrid}>
                        {!loading && plans.map((plan) => (
                            <div key={plan.id} className={styles.planCard}>
                                <div className={styles.planHeader}>
                                    <div>
                                        <h3 className={styles.planName}>{plan.name}</h3>
                                        <div className={styles.planPrice}>
                                            ${plan.price}
                                            <span className={styles.planPeriod}>/{plan.interval}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className={styles.planDescription}>{plan.description}</p>

                                <ul className={styles.featuresList}>
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className={styles.featureItem}>
                                            <Check size={16} className={styles.checkIcon} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className={styles.cardActions}>
                                    <button
                                        className={styles.editButton}
                                        style={{ width: '100%' }}
                                        onClick={() => handleOpenModal(plan)}
                                    >
                                        <Edit2 size={16} /> Edit Plan
                                    </button>
                                </div>
                            </div>
                        ))}
                        {!loading && plans.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center' }}>No plans found.</div>}
                    </div>
                ) : (
                    <div className={styles.tableCard}>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th className={styles.tableHeader}>User</th>
                                        <th className={styles.tableHeader}>Plan</th>
                                        <th className={styles.tableHeader}>Amount</th>
                                        <th className={styles.tableHeader}>Date</th>
                                        <th className={styles.tableHeader}>Status</th>
                                        <th className={styles.tableHeader}>Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!loading && transactions.map((txn) => (
                                        <tr key={txn.id}>
                                            <td className={styles.tableCell}>
                                                <div style={{ fontWeight: 500 }}>{txn.user?.first_name} {txn.user?.last_name}</div>
                                                <div style={{ fontSize: '12px', color: '#6b7280' }}>{txn.user?.email}</div>
                                            </td>
                                            <td className={styles.tableCell}>
                                                <div>{txn.plan?.name}</div>
                                                <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'capitalize' }}>{txn.plan?.plan_type}</div>
                                            </td>
                                            <td className={styles.tableCell}>₹{txn.price}</td>
                                            <td className={styles.tableCell}>{new Date(txn.created_at).toLocaleDateString()}</td>
                                            <td className={styles.tableCell}>
                                                <span className={`${styles.statusBadge} ${txn.status === 1 ? styles.statusSuccess : styles.statusFailed}`}>
                                                    {txn.status === 1 ? "Paid" : "Failed"}
                                                </span>
                                            </td>
                                            <td className={styles.tableCell}>
                                                {txn.invoice_url ? (
                                                    <a href={txn.invoice_url} target="_blank" rel="noreferrer" style={{ color: '#fab12f', textDecoration: 'underline' }}>
                                                        View Invoice
                                                    </a>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                    {!loading && transactions.length === 0 && (
                                        <tr>
                                            <td colSpan={6} style={{ textAlign: 'center', padding: '24px' }}>No transactions found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h2>{editingPlan ? "Edit Plan" : "Add New Plan"}</h2>
                            <button className={styles.closeButton} onClick={handleCloseModal}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSavePlan}>
                            <div className={styles.modalContent}>
                                <div className={styles.modalForm}>
                                    <Input
                                        label="Plan Name"
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        placeholder="e.g. Basic, Pro"
                                        required
                                    />

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <Input
                                            label="Price"
                                            type="number"
                                            step="0.01"
                                            value={formState.price}
                                            onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                                            placeholder="0.00"
                                            required
                                        />

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <Select
                                                label="Interval (Plan Type)"
                                                value={formState.interval}
                                                onChange={(e) => setFormState({ ...formState, interval: e.target.value })}
                                                options={[
                                                    { value: 'monthly', label: 'Monthly' },
                                                    { value: 'yearly', label: 'Yearly' }
                                                ]}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '0.5rem' }}>
                                            Description
                                        </label>
                                        <textarea
                                            style={{
                                                width: '100%',
                                                padding: '0.625rem 1rem',
                                                fontSize: '0.875rem',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '0.5rem',
                                                minHeight: '80px',
                                                fontFamily: 'inherit'
                                            }}
                                            value={formState.description}
                                            onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                                            placeholder="Brief description of the plan..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.modalFooter}>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className={styles.saveButton}>
                                    {editingPlan ? "Save Changes" : "Create Plan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
