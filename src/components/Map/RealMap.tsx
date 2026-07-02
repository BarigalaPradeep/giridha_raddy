// ─── REAL GEOGRAPHIC MAP — Nellore Rural Constituency ─────────────────────────
// Powered by Leaflet.js + OpenStreetMap / ESRI Satellite tiles
// FIXES: No duplicate CSS import, explicit pixel height, no StrictMode double-init guard

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { REAL_VILLAGES, PROJECTS, MANDALS, CONSTITUENCY_CENTER } from '../data/constituencyData';

interface CategoryConfig {
    color: string;
    emoji: string;
}

// ── Category config ───────────────────────────────────────────────────────────
const CAT: Record<string, CategoryConfig> = {
    Roads: { color: '#eab308', emoji: '🛣️' },
    Water: { color: '#06b6d4', emoji: '💧' },
    Education: { color: '#a855f7', emoji: '🏫' },
    Healthcare: { color: '#10b981', emoji: '🏥' },
    Agriculture: { color: '#f97316', emoji: '🌾' },
};
const STATUS: Record<string, { color: string; te: string }> = {
    'Completed': { color: '#10b981', te: 'పూర్తయింది' },
    'In Progress': { color: '#f97316', te: 'ప్రగతిలో' },
    'Planned': { color: '#06b6d4', te: 'ప్రణాళిక' },
};
const MANDAL_COLORS: Record<string, string> = {
    'Nellore Rural': '#eab308', 'Kovur': '#06b6d4', 'Muthukur': '#10b981',
    'Indukurpet': '#a855f7', 'Allur': '#f97316', 'Sangam': '#ec4899',
};

function scoreColor(s: number) {
    return s >= 80 ? '#10b981' : s >= 65 ? '#eab308' : s >= 50 ? '#f97316' : '#ef4444';
}

// ── SVG circle-progress marker for villages ────────────────────────────────────
function makeVillageIcon(v: any, selected: boolean) {
    const color = scoreColor(v.devScore);
    const R = selected ? 24 : 18;
    const r = R - 5;
    const circ = 2 * Math.PI * r;
    const dash = (v.devScore / 100) * circ;
    const sz = R * 2 + 8;
    const cx = sz / 2;
    const nameShort = v.name.length > 11 ? v.name.slice(0, 10) + '…' : v.name;

    return L.divIcon({
        className: '',
        iconSize: [sz, sz + 14],
        iconAnchor: [sz / 2, sz / 2],
        popupAnchor: [0, -(sz / 2 + 4)],
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="${sz}" height="${sz + 14}">
      <circle cx="${cx}" cy="${cx}" r="${R}" fill="${selected ? '#f1f5f9' : '#ffffff'}"
        stroke="${color}" stroke-width="${selected ? 2.5 : 2}"/>
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none"
        stroke="rgba(0,0,0,0.08)" stroke-width="4"/>
      <circle cx="${cx}" cy="${cx}" r="${r}" fill="none"
        stroke="${color}" stroke-width="4"
        stroke-dasharray="${dash} ${circ}"
        stroke-linecap="round"
        transform="rotate(-90 ${cx} ${cx})"/>
      <text x="${cx}" y="${cx}" text-anchor="middle" dominant-baseline="central"
        font-family="monospace" font-size="${selected ? 9 : 7}" font-weight="800"
        fill="${color}">${v.devScore}%</text>
      <rect x="1" y="${sz}" width="${sz - 2}" height="14" rx="3" fill="${color}dd"/>
      <text x="${cx}" y="${sz + 8}" text-anchor="middle" dominant-baseline="central"
        font-family="sans-serif" font-size="6" font-weight="700"
        fill="#000">${nameShort}</text>
    </svg>`,
    });
}

// ── Project pin icon ──────────────────────────────────────────────────────────
function makeProjectIcon(p: any) {
    const { color, emoji } = CAT[p.category] || CAT.Roads;
    const stColor = STATUS[p.status]?.color || '#eab308';
    return L.divIcon({
        className: '',
        iconSize: [28, 34],
        iconAnchor: [14, 34],
        popupAnchor: [0, -34],
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="34">
      <rect x="2" y="2" width="24" height="22" rx="6"
        fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>
      <polygon points="14,32 6,22 22,22"
        fill="${color}" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
      <text x="14" y="14" text-anchor="middle" dominant-baseline="central"
        font-size="11">${emoji}</text>
      <circle cx="22" cy="5" r="5" fill="${stColor}" stroke="#fff" stroke-width="1.5"/>
    </svg>`,
    });
}

// ── Tile options ──────────────────────────────────────────────────────────────
const TILES: Record<string, { url: string; attr: string; label: string }> = {
    satellite: {
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attr: 'ESRI World Imagery', label: '🛰️ Satellite',
    },
    street: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attr: '© OpenStreetMap', label: '🗺️ Street',
    },
    topo: {
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        attr: '© OpenTopoMap', label: '⛰️ Terrain',
    },
};

// ── Village popup HTML ────────────────────────────────────────────────────────
function villagePopupHTML(v: any, isTe: boolean) {
    const col = scoreColor(v.devScore);
    return `<div style="font-family:Outfit,sans-serif;min-width:230px;padding:2px 4px;">
    <div style="font-size:9px;font-family:monospace;color:#eab308;letter-spacing:.1em;margin-bottom:4px;">
      📍 ${v.mandal} Mandal · Pop ${v.pop.toLocaleString()}
    </div>
    <div style="font-size:17px;font-weight:900;color:#0f172a;margin-bottom:10px;">
      ${isTe ? v.nameTe : v.name}
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
      <span style="font-size:10px;color:#94a3b8;">Development Score</span>
      <span style="font-size:15px;font-weight:900;color:${col};font-family:monospace;">${v.devScore}%</span>
    </div>
    <div style="background:#e2e8f0;border-radius:4px;height:7px;margin-bottom:12px;overflow:hidden;">
      <div style="width:${v.devScore}%;height:100%;background:${col};border-radius:4px;"></div>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:12px;">
      ${[['#10b981', v.completed, isTe ? 'పూర్తి' : 'Done'],
        ['#f97316', v.ongoing, isTe ? 'ప్రగతి' : 'Active'],
        ['#06b6d4', v.planned, isTe ? 'ప్రణాళిక' : 'Plan']].map(([c, n, l]) => `
        <div style="flex:1;background:${c}18;border:1px solid ${c}30;border-radius:6px;padding:6px;text-align:center;">
          <div style="font-size:16px;font-weight:900;color:${c};">${n}</div>
          <div style="font-size:8px;color:#64748b;">${l}</div>
        </div>`).join('')}
    </div>
    <div style="font-size:8px;font-family:monospace;color:#334155;letter-spacing:.12em;margin-bottom:6px;">SECTOR RATINGS</div>
    ${['Roads', 'Water', 'Education', 'Healthcare', 'Agriculture'].map(cat => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:3px 0;border-bottom:1px solid rgba(0,0,0,0.04);">
        <span style="font-size:10px;color:#94a3b8;">${CAT[cat].emoji} ${cat}</span>
        <span style="color:${CAT[cat].color};font-size:12px;">${'★'.repeat(v.ratings[cat.toLowerCase()])}<span style="color:#1e293b;">${'★'.repeat(5 - v.ratings[cat.toLowerCase()])}</span></span>
      </div>`).join('')}
  </div>`;
}

function projectPopupHTML(p: any, isTe: boolean) {
    const catCfg = CAT[p.category] || CAT.Roads;
    const stCfg = STATUS[p.status] || STATUS.Planned;
    return `<div style="font-family:Outfit,sans-serif;min-width:200px;padding:2px 4px;">
    <div style="font-size:8px;font-family:monospace;color:${catCfg.color};letter-spacing:.12em;margin-bottom:4px;">
      ${catCfg.emoji} ${p.category.toUpperCase()} · ${p.year}
    </div>
    <div style="font-size:14px;font-weight:800;color:#0f172a;line-height:1.3;margin-bottom:10px;">${isTe ? p.nameTe : p.name}</div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-size:10px;font-weight:700;padding:3px 8px;border-radius:5px;
        background:${stCfg.color}18;color:${stCfg.color};border:1px solid ${stCfg.color}40;">
        ● ${isTe ? stCfg.te : p.status}
      </span>
      <span style="font-size:13px;font-weight:900;color:#eab308;font-family:monospace;">${p.budget}</span>
    </div>
  </div>`;
}

export interface RealMapProps {
    isTelugu: boolean;
    activeYear?: number;
    selectedVillage?: any;
    onSelectVillage?: (v: any) => void;
    issues?: any[];
    previewMode?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
export default function RealMap({ isTelugu, activeYear = 2026, selectedVillage, onSelectVillage, issues, previewMode = false }: RealMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<L.Map | null>(null);
    const tileRef = useRef<L.TileLayer | null>(null);
    const villageMarkersRef = useRef<Record<string, L.Marker>>({});
    const projectMarkersRef = useRef<Record<string, L.Marker>>({});
    const heatmapLayersRef = useRef<L.Circle[]>([]);

    const [tileMode, setTileMode] = useState<string>(previewMode ? 'street' : 'satellite');
    const [showVillages, setShowVillages] = useState<boolean>(true);
    const [showProjects, setShowProjects] = useState<boolean>(!previewMode);
    const [showHeatmap, setShowHeatmap] = useState<boolean>(false);
    const [filterCat, setFilterCat] = useState<string>('All');
    const [filterMandal, setFilterMandal] = useState<string>('All');

    // Heatmap rendering function
    function renderHeatmap(map: L.Map, show: boolean, issuesList: any[]) {
        heatmapLayersRef.current.forEach(layer => map.removeLayer(layer));
        heatmapLayersRef.current = [];
        if (!show || !issuesList) return;

        const intensityMap: Record<string, number> = {};
        issuesList.forEach(issue => {
            intensityMap[issue.village] = (intensityMap[issue.village] || 0) + 1;
        });

        Object.entries(intensityMap).forEach(([vName, count]) => {
            const v = REAL_VILLAGES.find((vill: any) => vill.name === vName);
            if (v) {
                const baseColor = '#ef4444';
                const outerCircle = L.circle([v.lat, v.lng], {
                    radius: 1200 + (count * 400),
                    fillColor: baseColor,
                    fillOpacity: 0.12 + (count * 0.04),
                    color: baseColor,
                    weight: 0.5,
                    opacity: 0.2
                }).addTo(map);

                const innerCircle = L.circle([v.lat, v.lng], {
                    radius: 500 + (count * 150),
                    fillColor: baseColor,
                    fillOpacity: 0.35 + (count * 0.05),
                    color: baseColor,
                    weight: 0,
                }).addTo(map);

                outerCircle.bindTooltip(`${count} ${isTelugu ? 'పరిష్కరించని ఫిర్యాదులు' : 'Active Grievances'} (${isTelugu ? v.nameTe : v.name})`, {
                    permanent: false,
                    className: 'mandal-tooltip'
                });

                heatmapLayersRef.current.push(outerCircle, innerCircle);
            }
        });
    }

    // ── 1. Init Leaflet once after mount ─────────────────────────────────────
    useEffect(() => {
        // Small delay so the container renders and has its final size
        const timer = setTimeout(() => {
            if (mapRef.current || !containerRef.current) return;

            const map = L.map(containerRef.current, {
                center: [CONSTITUENCY_CENTER.lat, CONSTITUENCY_CENTER.lng],
                zoom: 11,
                zoomControl: false,
                attributionControl: true,
                preferCanvas: true,
            });

            L.control.zoom({ position: 'topright' }).addTo(map);

            // Satellite tile by default
            tileRef.current = L.tileLayer(TILES.satellite.url, {
                attribution: TILES.satellite.attr,
                maxZoom: 19,
            }).addTo(map);

            // Mandal boundary circles
            const mandalCenters: Record<string, [number, number, number]> = {
                'Nellore Rural': [14.47, 79.99, 8000],
                'Kovur': [14.52, 79.95, 9000],
                'Muthukur': [14.30, 79.91, 10000],
                'Indukurpet': [14.19, 80.05, 9000],
                'Allur': [14.65, 79.94, 8000],
                'Sangam': [14.36, 79.83, 9000],
            };
            Object.entries(mandalCenters).forEach(([name, [lat, lng, r]]) => {
                const col = MANDAL_COLORS[name] || '#eab308';
                L.circle([lat, lng], {
                    radius: r,
                    fillColor: col,
                    fillOpacity: 0.04,
                    color: col,
                    weight: 1.5,
                    opacity: 0.3,
                    dashArray: '8 5',
                }).addTo(map).bindTooltip(name, {
                    permanent: false,
                    className: 'mandal-tooltip',
                });
            });

            mapRef.current = map;

            // Trigger initial marker render
            renderVillages(map, true, 'All', null, false);
            renderProjects(map, true, 'All', 2026, false);
        }, 80);

        return () => {
            clearTimeout(timer);
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []); // eslint-disable-line

    // ── Helpers to render/clear markers ──────────────────────────────────────
    function renderVillages(map: L.Map, show: boolean, mandal: string, selVillage: any, isTe: boolean) {
        // Clear old
        Object.values(villageMarkersRef.current).forEach(m => map.removeLayer(m));
        villageMarkersRef.current = {};
        if (!show) return;

        REAL_VILLAGES
            .filter((v: any) => mandal === 'All' || v.mandal === mandal)
            .forEach((v: any) => {
                const isSelected = selVillage?.id === v.id;
                const marker = L.marker([v.lat, v.lng], {
                    icon: makeVillageIcon(v, isSelected),
                    zIndexOffset: isSelected ? 1000 : 0,
                }).addTo(map);

                marker.bindPopup(villagePopupHTML(v, isTe), {
                    maxWidth: 290,
                    className: 'nellore-popup',
                });
                marker.on('click', () => onSelectVillage && onSelectVillage(v));
                villageMarkersRef.current[v.id] = marker;
            });
    }

    function renderProjects(map: L.Map, show: boolean, cat: string, year: number, isTe: boolean) {
        Object.values(projectMarkersRef.current).forEach(m => map.removeLayer(m));
        projectMarkersRef.current = {};
        if (!show) return;

        PROJECTS
            .filter((p: any) => (year === 2030 || p.year <= year) && (cat === 'All' || p.category === cat))
            .forEach((p: any) => {
                const marker = L.marker([p.lat, p.lng], { icon: makeProjectIcon(p) }).addTo(map);
                marker.bindPopup(projectPopupHTML(p, isTe), {
                    maxWidth: 260,
                    className: 'nellore-popup',
                });
                projectMarkersRef.current[p.id] = marker;
            });
    }

    // ── 2. Re-render villages when deps change ────────────────────────────────
    useEffect(() => {
        if (!mapRef.current) return;
        renderVillages(mapRef.current, showVillages, filterMandal, selectedVillage, isTelugu);
    }, [showVillages, filterMandal, selectedVillage, isTelugu]); // eslint-disable-line

    // ── Re-render grievance heatmap ───────────────────────────────────────────
    useEffect(() => {
        if (!mapRef.current) return;
        renderHeatmap(mapRef.current, showHeatmap, issues || []);
    }, [showHeatmap, issues]); // eslint-disable-line

    // ── 3. Re-render projects when deps change ────────────────────────────────
    useEffect(() => {
        if (!mapRef.current) return;
        renderProjects(mapRef.current, showProjects, filterCat, activeYear, isTelugu);
    }, [showProjects, filterCat, activeYear, isTelugu]); // eslint-disable-line

    // ── 4. Swap tile layer ────────────────────────────────────────────────────
    useEffect(() => {
        if (!tileRef.current) return;
        tileRef.current.setUrl(TILES[tileMode].url);
    }, [tileMode]);

    // ── 5. Fly to selected village ────────────────────────────────────────────
    useEffect(() => {
        if (!mapRef.current || !selectedVillage) return;
        mapRef.current.flyTo([selectedVillage.lat, selectedVillage.lng], 13, { duration: 1.2 });
        setTimeout(() => {
            const m = villageMarkersRef.current[selectedVillage.id];
            if (m) m.openPopup();
        }, 1400);
    }, [selectedVillage]);

    const visibleProjects = PROJECTS.filter((p: any) =>
        (activeYear === 2030 || p.year <= activeYear) && (filterCat === 'All' || p.category === filterCat)
    );

    // ── RENDER ─────────────────────────────────────────────────────────────────
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(234,179,8,0.2)', boxShadow: '0 0 40px rgba(234,179,8,0.06), 0 20px 60px rgba(0,0,0,0.6)', minHeight: '500px' }}>

            {/* SLA Resolution Stats Card */}
            <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 800, background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '8px 12px', backdropFilter: 'blur(14px)', display: 'flex', flexDirection: 'column', gap: '3px', pointerEvents: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                    <span style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 900, color: '#10b981', letterSpacing: '0.08em' }}>GRIEVANCE RESOLUTION FEED</span>
                </div>
                <p style={{ fontFamily: 'Outfit', fontSize: '12px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Avg. SLA: <span style={{ color: '#10b981' }}>4.8 Days</span></p>
                <p style={{ fontFamily: 'monospace', fontSize: '8px', color: '#475569', margin: 0 }}>94.6% Resolution Efficiency</p>
            </div>

            {/* ── Leaflet map div (explicit height required!) ─── */}
            <div
                ref={containerRef}
                style={{ width: '100%', height: '100%', minHeight: '500px', background: '#f8fafc' }}
            />

            {/* ── Top-left HUD ─────────────────────────────────── */}
            <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 800, display: 'flex', flexDirection: 'column', gap: '8px', pointerEvents: 'none' }}>
                <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '8px 14px', backdropFilter: 'blur(14px)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', display: 'inline-block', flexShrink: 0 }} />
                    <div>
                        <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#eab308', fontWeight: 700, letterSpacing: '.12em' }}>NELLORE RURAL CONSTITUENCY</p>
                        <p style={{ fontFamily: 'monospace', fontSize: '8px', color: '#475569', letterSpacing: '.08em' }}>SPSR Nellore District · AP · {REAL_VILLAGES.length} Villages · 6 Mandals</p>
                    </div>
                </div>
            </div>

            {/* ── Left controls panel ───────────────────────────── */}
            <div style={{ position: 'absolute', top: 70, left: 12, zIndex: 800, display: 'flex', flexDirection: 'column', gap: '8px' }}>

                {/* Tile switcher */}
                <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '8px', backdropFilter: 'blur(14px)' }}>
                    <p style={{ fontFamily: 'monospace', fontSize: '8px', color: '#334155', letterSpacing: '.1em', marginBottom: '5px' }}>MAP TYPE</p>
                    {Object.entries(TILES).map(([key, t]) => (
                        <button key={key} onClick={() => setTileMode(key)} style={{ display: 'block', width: '100%', padding: '5px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 600, cursor: 'pointer', transition: 'all .2s', background: tileMode === key ? 'rgba(234,179,8,.2)' : 'transparent', color: tileMode === key ? '#eab308' : '#64748b', border: tileMode === key ? '1px solid rgba(234,179,8,.4)' : '1px solid transparent', fontFamily: 'Inter', textAlign: 'left', marginBottom: '2px' }}>
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Layer toggles */}
                <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '10px 12px', backdropFilter: 'blur(14px)' }}>
                    <p style={{ fontFamily: 'monospace', fontSize: '8px', color: '#334155', letterSpacing: '.1em', marginBottom: '7px' }}>LAYERS</p>
                    {([['Villages', showVillages, setShowVillages, '#eab308'], ['Projects', showProjects, setShowProjects, '#10b981']] as const).map(([lbl, on, set, col]) => (
                        <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '6px' }} onClick={() => set(p => !p)}>
                            <div style={{ width: '28px', height: '15px', borderRadius: '8px', background: on ? col : '#1e293b', position: 'relative', transition: 'background .3s', border: `1px solid ${on ? col : '#334155'}`, flexShrink: 0 }}>
                                <div style={{ position: 'absolute', top: '1px', left: on ? '14px' : '1px', width: '11px', height: '11px', borderRadius: '50%', background: '#fff', transition: 'left .3s', boxShadow: '0 1px 3px rgba(0,0,0,.4)' }} />
                            </div>
                            <span style={{ fontFamily: 'Inter', fontSize: '11px', color: on ? '#0f172a' : '#475569', fontWeight: on ? 700 : 500 }}>{lbl}</span>
                        </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.06)' }} onClick={() => setShowHeatmap(p => !p)}>
                        <div style={{ width: '28px', height: '15px', borderRadius: '8px', background: showHeatmap ? '#ef4444' : '#1e293b', position: 'relative', transition: 'background .3s', border: `1px solid ${showHeatmap ? '#ef4444' : '#334155'}`, flexShrink: 0 }}>
                            <div style={{ position: 'absolute', top: '1px', left: showHeatmap ? '14px' : '1px', width: '11px', height: '11px', borderRadius: '50%', background: '#fff', transition: 'left .3s', boxShadow: '0 1px 3px rgba(0,0,0,.4)' }} />
                        </div>
                        <span style={{ fontFamily: 'Inter', fontSize: '11px', color: showHeatmap ? '#0f172a' : '#475569', fontWeight: showHeatmap ? 700 : 500 }}>🔥 {isTelugu ? 'హీట్మ్యాప్' : 'Heatmap'}</span>
                    </div>
                </div>
            </div>

            {/* ── Bottom-left: Category & Mandal filter ─────────── */}
            <div style={{ position: 'absolute', bottom: 12, left: 12, zIndex: 800, display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                {/* Category */}
                <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '8px', backdropFilter: 'blur(14px)' }}>
                    <p style={{ fontFamily: 'monospace', fontSize: '8px', color: '#334155', letterSpacing: '.1em', marginBottom: '5px' }}>FILTER</p>
                    {['All', ...Object.keys(CAT)].map(cat => (
                        <button key={cat} onClick={() => setFilterCat(cat)} style={{ display: 'block', width: '100%', padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 600, cursor: 'pointer', background: filterCat === cat ? `${CAT[cat]?.color || '#eab308'}20` : 'transparent', color: filterCat === cat ? CAT[cat]?.color || '#eab308' : '#475569', border: filterCat === cat ? `1px solid ${CAT[cat]?.color || '#eab308'}40` : '1px solid transparent', textAlign: 'left', fontFamily: 'Inter', marginBottom: '2px' }}>
                            {cat === 'All' ? '🗂️ All' : `${CAT[cat].emoji} ${cat}`}
                        </button>
                    ))}
                </div>

                {/* Mandal */}
                <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '8px', backdropFilter: 'blur(14px)' }}>
                    <p style={{ fontFamily: 'monospace', fontSize: '8px', color: '#334155', letterSpacing: '.1em', marginBottom: '5px' }}>MANDAL</p>
                    {['All', ...MANDALS.map((m: any) => m.name)].map((mandal: string, i: number) => {
                        const col = i === 0 ? '#eab308' : MANDAL_COLORS[mandal] || '#eab308';
                        return (
                            <button key={mandal} onClick={() => setFilterMandal(mandal)} style={{ display: 'block', width: '100%', padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 600, cursor: 'pointer', background: filterMandal === mandal ? `${col}20` : 'transparent', color: filterMandal === mandal ? col : '#475569', border: filterMandal === mandal ? `1px solid ${col}40` : '1px solid transparent', textAlign: 'left', fontFamily: 'Inter', marginBottom: '2px' }}>
                                {mandal === 'All' ? '◉ All Mandals' : mandal}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Bottom-right: Project stats ──────────────────── */}
            <div style={{ position: 'absolute', bottom: 12, right: 12, zIndex: 800 }}>
                <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '10px 14px', backdropFilter: 'blur(14px)', minWidth: '160px' }}>
                    <p style={{ fontFamily: 'monospace', fontSize: '8px', color: '#334155', letterSpacing: '.1em', marginBottom: '8px' }}>
                        SHOWING {visibleProjects.length} PROJECTS
                    </p>
                    {[['#10b981', 'Completed'], ['#f97316', 'In Progress'], ['#06b6d4', 'Planned']].map(([c, s]) => (
                        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '5px' }}>
                            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: c, boxShadow: `0 0 5px ${c}`, flexShrink: 0 }} />
                            <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#64748b', flex: 1 }}>{s}</span>
                            <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 700, color: c }}>
                                {visibleProjects.filter((p: any) => p.status === s).length}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Top-right: dev score legend (sits below zoom ctrl) ── */}
            <div style={{ position: 'absolute', top: 80, right: 12, zIndex: 800 }}>
                <div style={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', padding: '8px 12px', backdropFilter: 'blur(14px)' }}>
                    <p style={{ fontFamily: 'monospace', fontSize: '8px', color: '#334155', letterSpacing: '.1em', marginBottom: '6px' }}>DEV SCORE RING</p>
                    {[['#10b981', '80–100% High'], ['#eab308', '65–79% Good'], ['#f97316', '50–64% Growing'], ['#ef4444', '<50% Focus Needed']].map(([c, l]) => (
                        <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: c, boxShadow: `0 0 5px ${c}`, flexShrink: 0 }} />
                            <span style={{ fontFamily: 'monospace', fontSize: '8px', color: '#64748b' }}>{l}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Dark popup CSS + zoom style (injected once) ─────── */}
            <style>{`
        .nellore-popup .leaflet-popup-content-wrapper {
          background: rgba(255,255,255,0.97) !important;
          border: 1px solid rgba(234,179,8,0.25) !important;
          border-radius: 14px !important;
          box-shadow: 0 20px 60px rgba(0,0,0,.85), 0 0 30px rgba(234,179,8,.06) !important;
          color: #0f172a !important;
          backdrop-filter: blur(16px);
        }
        .nellore-popup .leaflet-popup-tip { background: rgba(255,255,255,.97) !important; }
        .nellore-popup .leaflet-popup-close-button { color:#64748b!important; font-size:16px!important; padding:6px 10px!important; }
        .nellore-popup .leaflet-popup-close-button:hover { color:#eab308!important; }
        .nellore-popup .leaflet-popup-content { margin:14px!important; }
        .mandal-tooltip {
          background:rgba(255,255,255,.95)!important; border:1px solid rgba(0,0,0,.09)!important;
          color:#94a3b8!important; font-family:monospace!important; font-size:10px!important;
          font-weight:700!important; letter-spacing:.1em!important; text-transform:uppercase!important;
          box-shadow:none!important; border-radius:6px!important;
        }
        .leaflet-control-zoom {
          border:1px solid rgba(0,0,0,.1)!important;
          border-radius:8px!important; overflow:hidden!important;
          box-shadow:none!important;
        }
        .leaflet-control-zoom a {
          background:rgba(255,255,255,.92)!important; color:#475569!important;
          border-bottom:1px solid rgba(0,0,0,.06)!important;
          width:30px!important; height:30px!important; line-height:30px!important;
          font-size:16px!important;
        }
        .leaflet-control-zoom a:hover { background:rgba(234,179,8,.15)!important; color:#eab308!important; }
        .leaflet-control-attribution {
          background:rgba(255,255,255,.9)!important; color:#475569!important; font-size:8px!important;
        }
        .leaflet-control-attribution a { color:#334155!important; }
      `}</style>
        </div>
    );
}
