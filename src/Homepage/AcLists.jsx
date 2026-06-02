"use client";

import { useState, useMemo, useEffect } from "react";

const SECTIONS = [
  "Admin Building AC Requisition",
  "CHMC Dormitory (Admin Building 2nd Floor)",
  "Lab",
  "VAT & Logistics Office (Old Admin Office)",
  "General",
];

const AC_TYPES = [
  "Split type",
  "Cassette type",
  "Ceiling Type",
  "Other",
];

const SECTION_STYLE = {
  "Admin Building AC Requisition": {
    border: "#3b82f6",
    badge: "#dbeafe",
    dot: "#2563eb",
    soft: "#eff6ff",
  },
  "CHMC Dormitory (Admin Building 2nd Floor)": {
    border: "#8b5cf6",
    badge: "#ede9fe",
    dot: "#7c3aed",
    soft: "#f5f3ff",
  },
  Lab: {
    border: "#10b981",
    badge: "#d1fae5",
    dot: "#059669",
    soft: "#ecfdf5",
  },
  "VAT & Logistics Office (Old Admin Office)": {
    border: "#f59e0b",
    badge: "#fef3c7",
    dot: "#d97706",
    soft: "#fffbeb",
  },
  General: {
    border: "#06b6d4",
    badge: "#cffafe",
    dot: "#0891b2",
    soft: "#ecfeff",
  },
};

const INITIAL_DATA = [
  {
    id: "1",
    slNo: 1,
    section: "Admin Building AC Requisition",
    roomName: "Director Room",
    floor: "1st Floor",
    roomSizeActual: "175",
    roomSizeEffective: "164",
    acCapacity: "1.5",
    brand: "Gree",
    acType: "Split type",
    remarks: "Operational",
  },
  {
    id: "2",
    slNo: 2,
    section: "Admin Building AC Requisition",
    roomName: "DMD Sir Room",
    floor: "1st Floor",
    roomSizeActual: "182",
    roomSizeEffective: "190",
    acCapacity: "1.5",
    brand: "Gree",
    acType: "Split type",
    remarks: "Operational",
  },
  {
    id: "3",
    slNo: 3,
    section: "Lab",
    roomName: "X-Ray & PSD Room",
    floor: "Ground Floor",
    roomSizeActual: "18.6X20",
    roomSizeEffective: "370",
    acCapacity: "5",
    brand: "Gree",
    acType: "Ceiling Type",
    remarks: "Operational",
  },
];

const EMPTY_FORM = {
  section: SECTIONS[0],
  roomName: "",
  floor: "",
  roomSizeActual: "",
  roomSizeEffective: "",
  acCapacity: "",
  brand: "",
  acType: "Split type",
  remarks: "Operational",
};

function Modal({
  open,
  onClose,
  onSave,
  item,
  allItems,
}) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (open) {
      setForm(item || EMPTY_FORM);
    }
  }, [open, item]);

  if (!open) return null;

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const sectionCount = allItems.filter(
      (i) => i.section === form.section
    ).length;

    onSave({
      ...form,
      id: item?.id || crypto.randomUUID(),
      slNo: item?.slNo || sectionCount + 1,
    });

    onClose();
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #dbe4f0",
    background: "#ffffff",
    fontSize: 14,
    outline: "none",
    color: "#0f172a",
    fontFamily: "Inter, sans-serif",
    transition: "0.2s",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(15,23,42,0.35)",
        backdropFilter: "blur(6px)",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          background: "#ffffff",
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(15,23,42,0.18)",
          border: "1px solid #e2e8f0",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 28px",
            background:
              "linear-gradient(135deg,#dbeafe 0%,#ecfeff 50%,#f0fdf4 100%)",
            borderBottom: "1px solid #dbeafe",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 800,
              color: "#0f172a",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {item ? "Edit AC Entry" : "Add New AC Entry"}
          </h2>

          <p
            style={{
              marginTop: 8,
              color: "#475569",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Manage and maintain air conditioning equipment information.
          </p>
        </div>

        {/* Body */}
        <div
          style={{
            padding: 28,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          {[
            ["Room Name", "roomName"],
            ["Floor", "floor"],
            ["Room Size Actual", "roomSizeActual"],
            ["Room Size Effective", "roomSizeEffective"],
            ["AC Capacity", "acCapacity"],
            ["Brand", "brand"],
          ].map(([label, key]) => (
            <div key={key}>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#334155",
                }}
              >
                {label}
              </label>

              <input
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
                style={inputStyle}
              />
            </div>
          ))}

          <div>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontSize: 13,
                fontWeight: 700,
                color: "#334155",
              }}
            >
              Section
            </label>

            <select
              value={form.section}
              onChange={(e) => set("section", e.target.value)}
              style={inputStyle}
            >
              {SECTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontSize: 13,
                fontWeight: 700,
                color: "#334155",
              }}
            >
              AC Type
            </label>

            <select
              value={form.acType}
              onChange={(e) => set("acType", e.target.value)}
              style={inputStyle}
            >
              {AC_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div style={{ gridColumn: "1/-1" }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontSize: 13,
                fontWeight: 700,
                color: "#334155",
              }}
            >
              Remarks
            </label>

            <textarea
              rows={3}
              value={form.remarks}
              onChange={(e) => set("remarks", e.target.value)}
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            padding: 24,
            background: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "12px 18px",
              borderRadius: 14,
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              color: "#334155",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            style={{
              padding: "12px 20px",
              borderRadius: 14,
              border: "none",
              background:
                "linear-gradient(135deg,#2563eb 0%,#06b6d4 100%)",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
              boxShadow: "0 10px 30px rgba(37,99,235,0.25)",
            }}
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AcLists() {
  const [items, setItems] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [filterSection, setFilterSection] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [collapsed, setCollapsed] = useState({});

  const filtered = useMemo(() => {
    return items.filter((i) => {
      const secOk =
        filterSection === "All" || i.section === filterSection;

      const q = search.toLowerCase();

      const searchOk =
        !q ||
        [
          i.roomName,
          i.brand,
          i.floor,
          i.acType,
          i.remarks,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);

      return secOk && searchOk;
    });
  }, [items, search, filterSection]);

  const grouped = useMemo(() => {
    const m = {};

    SECTIONS.forEach((s) => (m[s] = []));

    filtered.forEach((i) => {
      m[i.section].push(i);
    });

    return m;
  }, [filtered]);

  const totalAC = items.length;

  const operational = items.filter((i) =>
    i.remarks.toLowerCase().includes("operational")
  ).length;

  const handleSave = (newItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === newItem.id);

      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = newItem;
        return updated;
      }

      return [...prev, newItem];
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#f0f9ff 0%,#f8fafc 50%,#f0fdf4 100%)",
        fontFamily:
          "'Inter', 'Poppins', 'Segoe UI', sans-serif",
        color: "#0f172a",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #dbeafe",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "24px 24px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 34,
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.04em",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                CCDL Project AC List
              </h1>

              <p
                style={{
                  marginTop: 8,
                  color: "#64748b",
                  fontSize: 15,
                }}
              >
                Confidence Cement Dhaka Limited · Smart AC
                Management Dashboard
              </p>
            </div>

            <button
              onClick={() => {
                setEditItem(null);
                setModalOpen(true);
              }}
              style={{
                border: "none",
                borderRadius: 18,
                padding: "14px 24px",
                background:
                  "linear-gradient(135deg,#2563eb,#06b6d4)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                boxShadow:
                  "0 10px 30px rgba(37,99,235,0.25)",
              }}
            >
              + Add New AC
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: 18,
              marginTop: 24,
            }}
          >
            {[
              {
                title: "Total AC Units",
                value: totalAC,
                color: "#2563eb",
                bg: "#dbeafe",
              },
              {
                title: "Operational",
                value: operational,
                color: "#059669",
                bg: "#d1fae5",
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: "#ffffff",
                  borderRadius: 24,
                  padding: 24,
                  border: "1px solid #e2e8f0",
                  boxShadow:
                    "0 10px 35px rgba(15,23,42,0.05)",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 16,
                    background: card.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    color: card.color,
                    fontWeight: 800,
                    fontSize: 20,
                  }}
                >
                  {card.value}
                </div>

                <h3
                  style={{
                    margin: 0,
                    fontSize: 15,
                    color: "#475569",
                    fontWeight: 600,
                  }}
                >
                  {card.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Search */}
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 24,
              flexWrap: "wrap",
            }}
          >
            <input
              placeholder="Search room, floor, remarks, type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                minWidth: 240,
                padding: "14px 18px",
                borderRadius: 18,
                border: "1px solid #dbeafe",
                background: "#ffffff",
                fontSize: 14,
                outline: "none",
                color: "#0f172a",
              }}
            />

            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              style={{
                padding: "14px 18px",
                borderRadius: 18,
                border: "1px solid #dbeafe",
                background: "#ffffff",
                fontSize: 14,
                minWidth: 240,
                outline: "none",
              }}
            >
              <option value="All">All Sections</option>

              {SECTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: 24,
        }}
      >
        {SECTIONS.map((section) => {
          const sectionItems = grouped[section] || [];

          if (
            filterSection !== "All" &&
            filterSection !== section
          ) {
            return null;
          }

          const style = SECTION_STYLE[section];

          const isOpen = !collapsed[section];

          return (
            <div
              key={section}
              style={{
                background: "#ffffff",
                borderRadius: 28,
                overflow: "hidden",
                marginBottom: 24,
                border: `1px solid ${style.border}22`,
                boxShadow:
                  "0 10px 40px rgba(15,23,42,0.05)",
              }}
            >
              {/* Section Header */}
              <button
                onClick={() =>
                  setCollapsed((prev) => ({
                    ...prev,
                    [section]: !prev[section],
                  }))
                }
                style={{
                  width: "100%",
                  border: "none",
                  cursor: "pointer",
                  padding: "22px 24px",
                  background: style.soft,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: style.dot,
                    }}
                  />

                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 18,
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {section}
                    </h3>

                    <p
                      style={{
                        margin: "6px 0 0",
                        color: "#64748b",
                        fontSize: 13,
                      }}
                    >
                      {sectionItems.length} AC Units
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#334155",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {isOpen ? "−" : "+"}
                </div>
              </button>

              {/* Table */}
              {isOpen && (
                <div style={{ overflowX: "auto" }}>
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#f8fafc",
                        }}
                      >
                        {[
                          "SL",
                          "Room",
                          "Floor",
                          "Actual",
                          "Effective",
                          "Capacity",
                          "Brand",
                          "Type",
                          "Remarks",
                          "Action",
                        ].map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: "18px 16px",
                              textAlign: "left",
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#64748b",
                              borderBottom:
                                "1px solid #e2e8f0",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {sectionItems.map((item, idx) => (
                        <tr
                          key={item.id}
                          style={{
                            background:
                              idx % 2 === 0
                                ? "#ffffff"
                                : "#f8fafc",
                            transition: "0.2s",
                          }}
                        >
                          <td
                            style={{
                              padding: "18px 16px",
                              fontWeight: 700,
                              color: "#334155",
                            }}
                          >
                            {item.slNo}
                          </td>

                          <td
                            style={{
                              padding: "18px 16px",
                              fontWeight: 600,
                              color: "#0f172a",
                            }}
                          >
                            {item.roomName}
                          </td>

                          <td
                            style={{
                              padding: "18px 16px",
                              color: "#475569",
                            }}
                          >
                            {item.floor || "—"}
                          </td>

                          <td
                            style={{
                              padding: "18px 16px",
                              color: "#475569",
                            }}
                          >
                            {item.roomSizeActual || "—"}
                          </td>

                          <td
                            style={{
                              padding: "18px 16px",
                              color: "#475569",
                            }}
                          >
                            {item.roomSizeEffective || "—"}
                          </td>

                          <td
                            style={{
                              padding: "18px 16px",
                              fontWeight: 700,
                              color: "#2563eb",
                            }}
                          >
                            {item.acCapacity}T
                          </td>

                          <td
                            style={{
                              padding: "18px 16px",
                              color: "#475569",
                            }}
                          >
                            {item.brand}
                          </td>

                          <td
                            style={{
                              padding: "18px 16px",
                            }}
                          >
                            <span
                              style={{
                                padding: "8px 12px",
                                borderRadius: 999,
                                background: "#eff6ff",
                                color: "#2563eb",
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >
                              {item.acType}
                            </span>
                          </td>

                          <td
                            style={{
                              padding: "18px 16px",
                            }}
                          >
                            <span
                              style={{
                                padding: "8px 12px",
                                borderRadius: 999,
                                background: item.remarks
                                  .toLowerCase()
                                  .includes("operational")
                                  ? "#dcfce7"
                                  : "#fef3c7",
                                color: item.remarks
                                  .toLowerCase()
                                  .includes("operational")
                                  ? "#166534"
                                  : "#92400e",
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >
                              {item.remarks}
                            </span>
                          </td>

                          <td
                            style={{
                              padding: "18px 16px",
                            }}
                          >
                            <button
                              onClick={() => {
                                setEditItem(item);
                                setModalOpen(true);
                              }}
                              style={{
                                border: "none",
                                borderRadius: 12,
                                padding: "10px 14px",
                                background: "#dbeafe",
                                color: "#2563eb",
                                cursor: "pointer",
                                fontWeight: 700,
                              }}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        item={editItem}
        allItems={items}
      />
    </div>
  );
}