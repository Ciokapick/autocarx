import { useEffect, useState } from "react";
import { ArrowLeft, LogOut, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { leadApi, type Lead } from "@/services/api";

const statuses: Lead["status"][] = ["new", "contacted", "quoted", "booked", "closed"];

const WorkshopLeads = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const loadLeads = async () => {
    setBusy(true);
    try { setLeads(await leadApi.list()); setError(""); }
    catch (loadError) { setError(loadError instanceof Error ? loadError.message : "Could not load leads."); }
    finally { setBusy(false); }
  };

  useEffect(() => {
    leadApi.session().then(() => { setAuthenticated(true); return loadLeads(); }).catch(() => setAuthenticated(false));
  }, []);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try { await leadApi.login(credentials.email, credentials.password); setAuthenticated(true); setError(""); await loadLeads(); }
    catch (loginError) { setError(loginError instanceof Error ? loginError.message : "Login failed."); }
    finally { setBusy(false); }
  };

  const changeStatus = async (lead: Lead, status: Lead["status"]) => {
    const updated = await leadApi.updateStatus(lead.id, status);
    setLeads((current) => current.map((item) => item.id === updated.id ? updated : item));
  };

  if (authenticated === null) return <main className="grid min-h-screen place-items-center bg-background text-muted-foreground">Checking workshop session…</main>;

  if (!authenticated) return (
    <main className="grid min-h-screen place-items-center bg-background px-5">
      <form onSubmit={login} className="w-full max-w-md border border-white/10 bg-card p-8">
        <Link to="/" className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[.15em] text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Back to site</Link>
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Workshop access</p>
        <h1 className="mt-3 text-4xl font-black uppercase">Lead desk</h1>
        <div className="mt-8 space-y-4">
          <Input type="email" placeholder="Email" required value={credentials.email} onChange={(event) => setCredentials((value) => ({ ...value, email: event.target.value }))} />
          <Input type="password" placeholder="Password" required value={credentials.password} onChange={(event) => setCredentials((value) => ({ ...value, password: event.target.value }))} />
          {error && <p className="text-sm text-primary">{error}</p>}
          <Button disabled={busy} className="w-full">{busy ? "Signing in…" : "Sign in"}</Button>
        </div>
      </form>
    </main>
  );

  return (
    <main className="min-h-screen bg-background px-5 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">AutoCar X workshop</p><h1 className="mt-2 text-4xl font-black uppercase md:text-6xl">Lead desk</h1></div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={loadLeads} disabled={busy}><RefreshCw className={`mr-2 h-4 w-4 ${busy ? "animate-spin" : ""}`} />Refresh</Button>
            <Button variant="outline" onClick={async () => { await leadApi.logout(); setAuthenticated(false); }}><LogOut className="mr-2 h-4 w-4" />Logout</Button>
          </div>
        </header>
        {error && <p className="mt-6 border border-primary/30 bg-primary/10 p-4 text-sm text-primary">{error}</p>}
        <div className="mt-8 grid gap-4">
          {leads.map((lead) => (
            <article key={lead.id} className="grid gap-5 border border-white/10 bg-card p-6 lg:grid-cols-[1fr_1.5fr_180px]">
              <div><p className="font-bold">{lead.name}</p><a className="mt-1 block text-sm text-primary" href={`mailto:${lead.email}`}>{lead.email}</a>{lead.phone && <a className="mt-1 block text-sm text-muted-foreground" href={`tel:${lead.phone}`}>{lead.phone}</a>}<p className="mt-3 text-xs uppercase tracking-[.14em] text-muted-foreground">{lead.id}</p></div>
              <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-primary">{lead.service || "General enquiry"}</p><p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{lead.message}</p><p className="mt-4 text-xs text-white/30">{new Date(lead.createdAt).toLocaleString()}</p></div>
              <select aria-label={`Status for ${lead.name}`} value={lead.status} onChange={(event) => changeStatus(lead, event.target.value as Lead["status"])} className="h-11 border border-white/10 bg-background px-3 text-sm uppercase">
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </article>
          ))}
          {!busy && leads.length === 0 && <p className="border border-dashed border-white/15 p-12 text-center text-muted-foreground">No project enquiries yet.</p>}
        </div>
      </div>
    </main>
  );
};

export default WorkshopLeads;
