"use client";

import { useState, useMemo, useEffect } from "react";

/* ─── Responsive font hook ──────────────────────────────────────────── */
function useResponsive() {
  const [width, setWidth] = useState(1200);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setWidth(window.innerWidth);
    setIsReady(true);
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const fs = (mobile, tablet, desktop) => isMobile ? mobile : isTablet ? tablet : desktop;
  return { isMobile, isTablet, fs, isReady };
}

/* ─── Constants ─────────────────────────────────────────────────────── */
const SECTIONS = [
  "Admin Building AC Requisition",
  "CHMC Dormitory (Admin Building 2nd Floor)",
  "Lab",
  "VAT & Logistics Office (Old Admin Office)",
  "General",
];

const SECTION_STYLE = {
  "Admin Building AC Requisition": { border: "#3b82f6", dot: "#2563eb", soft: "#eff6ff" },
  "CHMC Dormitory (Admin Building 2nd Floor)": { border: "#8b5cf6", dot: "#7c3aed", soft: "#f5f3ff" },
  Lab: { border: "#10b981", dot: "#059669", soft: "#ecfdf5" },
  "VAT & Logistics Office (Old Admin Office)": { border: "#f59e0b", dot: "#d97706", soft: "#fffbeb" },
  General: { border: "#06b6d4", dot: "#0891b2", soft: "#ecfeff" },
};

const INITIAL_DATA = [
  // Admin Building AC Requisition
  { id: "1", slNo: 1, section: "Admin Building AC Requisition", roomName: "Director Room", floor: "1st Floor", roomSizeActual: "175", roomSizeEffective: "164", acCapacity: "1.5", brand: "Gree", acType: "Split type", remarks: "Operational" },
  { id: "2", slNo: 2, section: "Admin Building AC Requisition", roomName: "DMD Sir Room", floor: "1st Floor", roomSizeActual: "182", roomSizeEffective: "190", acCapacity: "1.5", brand: "Gree", acType: "Split type", remarks: "Operational" },
  { id: "3", slNo: 3, section: "Admin Building AC Requisition", roomName: "GM Room", floor: "1st Floor", roomSizeActual: "240", roomSizeEffective: "193", acCapacity: "1.5", brand: "Gree", acType: "Split type", remarks: "Operational" },
  { id: "4", slNo: 4, section: "Admin Building AC Requisition", roomName: "Sr. AGM Room", floor: "1st Floor", roomSizeActual: "175", roomSizeEffective: "171", acCapacity: "1.5", brand: "Gree", acType: "Split type", remarks: "Operational" },
  { id: "5", slNo: 5, section: "Admin Building AC Requisition", roomName: "HR Officer Room", floor: "1st Floor", roomSizeActual: "518", roomSizeEffective: "490", acCapacity: "3X1.5 Ton", brand: "Gree-1 /Samsung-2", acType: "Split type", remarks: "Operational" },
  { id: "6", slNo: 6, section: "Admin Building AC Requisition", roomName: "Conference Room", floor: "1st Floor", roomSizeActual: "518", roomSizeEffective: "442", acCapacity: "2X3 Ton", brand: "Gree", acType: "Cassette type", remarks: "Operational" },
  { id: "7", slNo: 7, section: "Admin Building AC Requisition", roomName: "Mini Conference Room", floor: "1st Floor", roomSizeActual: "266", roomSizeEffective: "251", acCapacity: "3", brand: "Gree", acType: "Cassette type", remarks: "Operational" },

  // CHMC Dormitory
  { id: "8", slNo: 1, section: "CHMC Dormitory (Admin Building 2nd Floor)", roomName: "Room 1", floor: "2nd Floor", roomSizeActual: "286", roomSizeEffective: "190", acCapacity: "1.5", brand: "Samsung", acType: "Split type", remarks: "Operational" },
  { id: "9", slNo: 2, section: "CHMC Dormitory (Admin Building 2nd Floor)", roomName: "Room 2", floor: "3rd Floor", roomSizeActual: "286", roomSizeEffective: "190", acCapacity: "1.5", brand: "Samsung", acType: "Split type", remarks: "Operational" },
  { id: "10", slNo: 3, section: "CHMC Dormitory (Admin Building 2nd Floor)", roomName: "Room 3 (PM)", floor: "4th Floor", roomSizeActual: "", roomSizeEffective: "190", acCapacity: "1.5", brand: "Gree", acType: "Split type", remarks: "Operational" },
  { id: "11", slNo: 4, section: "CHMC Dormitory (Admin Building 2nd Floor)", roomName: "Room 4", floor: "5th Floor", roomSizeActual: "", roomSizeEffective: "190", acCapacity: "1", brand: "Gree", acType: "Split type", remarks: "Operational" },
  { id: "12", slNo: 5, section: "CHMC Dormitory (Admin Building 2nd Floor)", roomName: "Room 5 (Loesche)", floor: "6th Floor", roomSizeActual: "", roomSizeEffective: "190", acCapacity: "1.5", brand: "Gree", acType: "Split type", remarks: "Operational" },

  // Lab
  { id: "13", slNo: 1, section: "Lab", roomName: "X-Ray & PSD Room", floor: "Ground Floor", roomSizeActual: "18.6X20", roomSizeEffective: "370", acCapacity: "5", brand: "Gree", acType: "Ceiling Type", remarks: "Operational" },
  { id: "14", slNo: 2, section: "Lab", roomName: "Account Manager Room", floor: "Ground Floor", roomSizeActual: "16.2X19.9", roomSizeEffective: "320", acCapacity: "1.5", brand: "Samsung", acType: "Split type", remarks: "Operational" },
  { id: "15", slNo: 3, section: "Lab", roomName: "Procurement Office", floor: "Ground Floor", roomSizeActual: "16.5X19.7", roomSizeEffective: "323", acCapacity: "1.5", brand: "Gree", acType: "Split type", remarks: "Operational" },
  { id: "16", slNo: 4, section: "Lab", roomName: "Curing & Crushing Room", floor: "Ground Floor", roomSizeActual: "22.3X18", roomSizeEffective: "400", acCapacity: "5", brand: "Gree", acType: "Ceiling Type", remarks: "Operational" },
  { id: "17", slNo: 5, section: "Lab", roomName: "Humidity & Cube Forming Room", floor: "Ground Floor", roomSizeActual: "17X16", roomSizeEffective: "272", acCapacity: "5", brand: "Gree", acType: "Ceiling Type", remarks: "Operational" },
  { id: "18", slNo: 6, section: "Lab", roomName: "Chemical Store", floor: "Ground Floor", roomSizeActual: "18.6X17.10", roomSizeEffective: "330", acCapacity: "3", brand: "Gree", acType: "Ceiling Type", remarks: "Operational" },

  // VAT & Logistics Office
  { id: "19", slNo: 1, section: "VAT & Logistics Office (Old Admin Office)", roomName: "Vat room (DMD Sir Dormitory)", floor: "3rd Floor", roomSizeActual: "286", roomSizeEffective: "130", acCapacity: "1.5", brand: "Samsung", acType: "Split type", remarks: "Operational" },
  { id: "20", slNo: 2, section: "VAT & Logistics Office (Old Admin Office)", roomName: "Logistics Room(Guest Room 1)", floor: "3rd Floor", roomSizeActual: "286", roomSizeEffective: "130", acCapacity: "1.5", brand: "Samsung", acType: "Split type", remarks: "Operational" },
  { id: "21", slNo: 3, section: "VAT & Logistics Office (Old Admin Office)", roomName: "1st Floor Room1(Guest Room 2)", floor: "3rd Floor", roomSizeActual: "", roomSizeEffective: "130", acCapacity: "1.5", brand: "Samsung", acType: "Split type", remarks: "Operational" },
  { id: "22", slNo: 4, section: "VAT & Logistics Office (Old Admin Office)", roomName: "1st Floor Room2(Guest Room 3)", floor: "3rd Floor", roomSizeActual: "", roomSizeEffective: "130", acCapacity: "1.5", brand: "Samsung", acType: "Split type", remarks: "will shift to logistics operational office" },

  // General
  { id: "23", slNo: 1, section: "General", roomName: "CCR", floor: "", roomSizeActual: "", roomSizeEffective: "832", acCapacity: "1X4 Ton 1X5 Ton", brand: "Gree", acType: "Cassette type", remarks: "Operational" },
  { id: "24", slNo: 2, section: "General", roomName: "Server Room", floor: "", roomSizeActual: "", roomSizeEffective: "416", acCapacity: "4", brand: "Gree", acType: "Cassette type", remarks: "Operational" },
  { id: "25", slNo: 3, section: "General", roomName: "Electrical & Production Room", floor: "", roomSizeActual: "", roomSizeEffective: "416", acCapacity: "3", brand: "Gree", acType: "Cassette type", remarks: "Operational" },
  { id: "26", slNo: 4, section: "General", roomName: "MCC 1 IO", floor: "", roomSizeActual: "", roomSizeEffective: "263", acCapacity: "3", brand: "Gree", acType: "Ceiling Type", remarks: "Operational" },
  { id: "27", slNo: 5, section: "General", roomName: "MCC2 IO", floor: "", roomSizeActual: "", roomSizeEffective: "410", acCapacity: "4", brand: "Gree", acType: "Ceiling Type", remarks: "Operational" },
  { id: "28", slNo: 6, section: "General", roomName: "MCC 3 IO", floor: "", roomSizeActual: "", roomSizeEffective: "915", acCapacity: "2X5 Ton", brand: "Gree", acType: "Ceiling Type", remarks: "Operational" },
  { id: "29", slNo: 7, section: "General", roomName: "ID Fan VFD", floor: "", roomSizeActual: "", roomSizeEffective: "500", acCapacity: "6X5 Ton", brand: "Gree", acType: "Ceiling Type", remarks: "Operational" },
  { id: "30", slNo: 8, section: "General", roomName: "Civil Office", floor: "", roomSizeActual: "", roomSizeEffective: "130", acCapacity: "1.5", brand: "Samsung", acType: "Split type", remarks: "Operational" },
  { id: "31", slNo: 9, section: "General", roomName: "Loesche office", floor: "", roomSizeActual: "", roomSizeEffective: "130", acCapacity: "1.5", brand: "Gree", acType: "Split type", remarks: "Operational" },
  { id: "32", slNo: 10, section: "General", roomName: "CHMC Project Manager Office", floor: "", roomSizeActual: "", roomSizeEffective: "120", acCapacity: "1.5", brand: "Samsung", acType: "Split type", remarks: "Operational" },
  { id: "33", slNo: 11, section: "General", roomName: "Mechanical DM office", floor: "", roomSizeActual: "", roomSizeEffective: "120", acCapacity: "1.5", brand: "Gree", acType: "Split type", remarks: "Operational" },
  { id: "34", slNo: 12, section: "General", roomName: "Anser Shed", floor: "", roomSizeActual: "", roomSizeEffective: "120", acCapacity: "1.5", brand: "Samsung", acType: "Split type", remarks: "Outdoor Card Problematic" },
  { id: "35", slNo: 13, section: "General", roomName: "Reclaimer", floor: "", roomSizeActual: "", roomSizeEffective: "70", acCapacity: "1", brand: "China", acType: "Split type", remarks: "Operational" },
];

const EMPTY_FORM = {
  section: SECTIONS[0], roomName: "", floor: "", roomSizeActual: "", roomSizeEffective: "",
  acCapacity: "", brand: "", acType: "Split type", remarks: "Operational",
};

/* ─── Modal ─────────────────────────────────────────────────────────── */
/* ─── Compact Dashboard Modal ───────────────────────────────────────── */
function Modal({ open, onClose, onSave, item, allItems }) {
  const { isMobile } = useResponsive();
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (open) {
      setForm(item || EMPTY_FORM);
    }
  }, [open, item]);

  if (!open) return null;

  const update = (key, value) => {
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
    height: 34,
    padding: "6px 10px",
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 11,
    color: "#334155",
    background: "#ffffff",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: 10,
    fontWeight: 600,
    marginBottom: 4,
    display: "block",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(15,23,42,0.45)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 620,
          background: "#ffffff",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          boxShadow: "0 20px 50px rgba(15,23,42,0.15)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "12px 16px",
            background:
              "linear-gradient(135deg,#eff6ff 0%,#ecfeff 100%)",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              {item ? "Edit AC Information" : "Add New AC"}
            </div>

            <div
              style={{
                fontSize: 10,
                color: "#64748b",
                marginTop: 2,
              }}
            >
              Update air-conditioner inventory details
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              cursor: "pointer",
              fontSize: 12,
              color: "#64748b",
            }}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div
          style={{
            padding: 14,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 10,
          }}
        >
          {[
            ["Room Name", "roomName"],
            ["Floor", "floor"],
            ["Actual Size", "roomSizeActual"],
            ["Effective Size", "roomSizeEffective"],
            ["AC Capacity", "acCapacity"],
            ["Brand", "brand"],
          ].map(([label, key]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                style={inputStyle}
              />
            </div>
          ))}

          <div>
            <label style={labelStyle}>Section</label>
            <select
              value={form.section}
              onChange={(e) => update("section", e.target.value)}
              style={inputStyle}
            >
              {SECTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>AC Type</label>
            <select
              value={form.acType}
              onChange={(e) => update("acType", e.target.value)}
              style={inputStyle}
            >
              <option>Split type</option>
              <option>Cassette type</option>
              <option>Ceiling Type</option>
              <option>Other</option>
            </select>
          </div>

          <div style={{ gridColumn: isMobile ? "span 1" : "span 2" }}>
            <label style={labelStyle}>Remarks</label>
            <input
              value={form.remarks}
              onChange={(e) => update("remarks", e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: 12,
            background: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
          }}
        >
          <button
            onClick={onClose}
            style={{
              height: 32,
              padding: "0 12px",
              borderRadius: 8,
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              color: "#475569",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            style={{
              height: 32,
              padding: "0 16px",
              borderRadius: 8,
              background:
                "linear-gradient(135deg,#2563eb,#06b6d4)",
              color: "#ffffff",
              border: "none",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {item ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Tiny Component ───────────────────────────────────────────── */
export default function AcLists2() {
  const { isMobile, fs, isReady } = useResponsive();
  const [items, setItems] = useState(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [filterSection, setFilterSection] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [collapsed, setCollapsed] = useState({});

  const filtered = useMemo(() => items.filter(i => {
    const secOk = filterSection === "All" || i.section === filterSection;
    const q = search.toLowerCase();
    return secOk && (!q || [i.roomName, i.brand, i.remarks].join(" ").toLowerCase().includes(q));
  }), [items, search, filterSection]);

  const grouped = useMemo(() => {
    const m = {};
    SECTIONS.forEach(s => m[s] = []);
    filtered.forEach(i => m[i.section].push(i));
    return m;
  }, [filtered]);

  const totalAC = items.length;
  const operational = items.filter(i => i.remarks.toLowerCase().includes("operational")).length;

  const handleSave = (newItem) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === newItem.id);
      return idx >= 0 ? prev.map((i, x) => x === idx ? newItem : i) : [...prev, newItem];
    });
  };

  const handleDelete = (id) => {
    if (confirm("Delete this AC entry?")) setItems(prev => prev.filter(i => i.id !== id));
  };

  const columns = isMobile 
    ? ["SL","Room","Cap","Rem","Act"] 
    : ["SL","Room","Floor","Actual","Effective","Cap","Type","Act"];

  const colKey = { SL: "slNo", Room: "roomName", Floor: "floor", Actual: "roomSizeActual", Effective: "roomSizeEffective", Cap: "acCapacity", Type: "acType", Rem: "remarks" };

  const hPad = isMobile ? "3px 4px" : "5px 6px";

  if (!isReady) return <div style={{minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#f0f9ff 0%,#f8fafc 50%,#f0fdf4 100%)", fontFamily: "'Inter',sans-serif" }}>
      {/* Header */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.98)", backdropFilter: "blur(14px)", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "10px 12px" : "14px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
<h1
  style={{
    margin: 0,
    fontSize: fs(14, 16, 18),
    fontWeight: 800,
    letterSpacing: "-0.4px",
    color: "#0f172a",
  }}
>
  CCDL AC Inventory
</h1>
            <button onClick={() => { setEditItem(null); setModalOpen(true); }} style={{ padding: "6px 12px",
borderRadius: 8,
fontSize: "12px",
height: "32px", background: "linear-gradient(135deg,#2563eb,#06b6d4)", color: "#fff", border: "none", fontWeight: 700 }}>+ Add AC</button>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, padding: "6px 10px",
fontSize: "12px",
height: "32px", borderRadius: 10, border: "1px solid #cbd5e1" }} />
            <select value={filterSection} onChange={e => setFilterSection(e.target.value)} style={{ padding: "6px 10px",
fontSize: "12px",
height: "32px", borderRadius: 10, border: "1px solid #cbd5e1" }}>
              <option value="All">All Sections</option>
              {SECTIONS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

<div
  style={{
    display: "flex",
    gap: 8,
    marginTop: 8,
    flexWrap: "wrap",
  }}
>
  <div
    style={{
      background: "#eff6ff",
      padding: "4px 10px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      color: "#2563eb",
    }}
  >
    Total AC: {totalAC}
  </div>

  <div
    style={{
      background: "#ecfdf5",
      padding: "4px 10px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      color: "#059669",
    }}
  >
    Operational: {operational}
  </div>

  <div
    style={{
      background: "#f8fafc",
      padding: "4px 10px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      color: "#475569",
    }}
  >
    Showing: {filtered.length}
  </div>
</div>

      {/* Tiny Tables */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "6px" : "10px" }}>
        {SECTIONS.map((section) => {
          const sectionItems = grouped[section] || [];
          if (filterSection !== "All" && filterSection !== section) return null;

          const sStyle = SECTION_STYLE[section];
          const isOpen = !collapsed[section];

          return (
            <div key={section} style={{ background: "#fff", borderRadius: 10, marginBottom: 6,overflow: "hidden",
boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: `1px solid ${sStyle.border}30` }}>
              <button onClick={() => setCollapsed(p => ({...p, [section]: !p[section]}))} style={{ width: "100%", padding: "7px 12px", background: sStyle.soft, border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: fs(13.5,14.5,15), fontWeight: 700, minHeight: "34px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: sStyle.dot }} />
                  {section} <span style={{fontSize:12.5, color:"#64748b"}}>({sectionItems.length})</span>
                </div>
                <span>{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: fs(10,10.5,11) }}>
                    <thead>
                      <tr style={{ background: "#f1f5f9", borderBottom: "1px solid #e2e8f0" }}>
                        {columns.map(h => <th key={h} style={{ padding: hPad, textAlign: "left", fontWeight: 700, color: "#475569", fontSize: 9.5,
textTransform: "uppercase",
letterSpacing: "0.4px", }}>{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {sectionItems.map((item, idx) => (
                        <tr key={item.id} style={{ background: idx % 2 === 0 ? "#ffffff" : "#fafcff",
transition: "all 0.15s ease", }}>
                          {columns.map(col => {
                            if (col === "Act") return (
                              <td key="act" style={{ padding: hPad, lineHeight: 1.2, whiteSpace: "nowrap" }}>
                                <button onClick={() => {setEditItem(item); setModalOpen(true);}} style={{
  padding:"3px 6px",
  marginRight:3,
  borderRadius:5,
  background:"#eff6ff",
  color:"#2563eb",
  border:"1px solid #bfdbfe",
  fontSize:9,
  fontWeight:600,
  cursor:"pointer"
}}>Edit</button>
                                <button onClick={() => handleDelete(item.id)} style={{
  padding:"3px 6px",
  borderRadius:5,
  background:"#fef2f2",
  color:"#dc2626",
  border:"1px solid #fecaca",
  fontSize:9,
  fontWeight:600,
  cursor:"pointer"
}}>Delete</button>
                              </td>
                            );
                            const k = colKey[col];
                            return <td key={col} style={{ padding: hPad, color: "#475569" }}>{item[k] || "—"}</td>;
                          })}
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} item={editItem} allItems={items} />
    </div>
  );
}