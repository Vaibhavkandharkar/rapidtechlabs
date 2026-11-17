// API helper for contact, schedule and lead operations
export async function submitLead(endpoint: string, payload: Record<string, unknown>) {
  try {
    const res = await fetch(`https://api.rapidtechlabs.in/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    return await res.json().catch(() => ({ success: true }));
  } catch (err: any) {
    console.warn(`Lead submission fallback for ${endpoint}:`, err);
    // Persist locally as fallback so no lead is lost
    try {
      const storageKey = `rapidtechlabs_pending_leads`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
      existing.push({ endpoint, payload, timestamp: new Date().toISOString() });
      localStorage.setItem(storageKey, JSON.stringify(existing));
    } catch {}
    return { success: true, queued: true, error: err?.message };
  }
}
