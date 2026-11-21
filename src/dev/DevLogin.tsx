import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import { devAuth, type DevTenant } from "./devAuth";
import { setDevTokens } from "./devToken";

function DevLogin() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenants, setTenants] = useState<DevTenant[]>([]);
  const [preAuthToken, setPreAuthToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const finish = (access: string, refresh: string) => {
    setDevTokens(access, refresh);
    const redirect = params.get("redirect");
    let target = "/members";
    if (redirect) {
      try {
        const url = new URL(redirect, window.location.origin);
        if (url.origin === window.location.origin) {
          target = url.pathname + url.search + url.hash;
        }
      } catch {
        // Ignore malformed redirect values and use the default destination.
      }
    }
    window.location.assign(target);
  };

  const handle = async (fn: () => Promise<void>, fallback: string) => {
    setLoading(true);
    try {
      await fn();
    } catch (e) {
      toast.error(getErrorMessage(e, fallback));
    } finally {
      setLoading(false);
    }
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    return handle(async () => {
      const res = await devAuth.login(email, password);
      if ("tenants" in res.data) {
        setTenants(res.data.tenants);
        setPreAuthToken(res.data.preAuthToken);
        return;
      }
      finish(res.data.access.token, res.data.refresh.token);
    }, "Login failed.");
  };

  const selectTenant = (tenantId: string) =>
    handle(async () => {
      const res = await devAuth.selectTenant(tenantId, preAuthToken);
      finish(res.data.access.token, res.data.refresh.token);
    }, "Could not select tenant.");

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4 p-6 text-sm">
      <h1 className="text-lg font-semibold">Dev login</h1>
      <p className="text-muted-foreground">
        Localhost only. Uses a bearer token instead of the auth app cookie.
      </p>

      {tenants.length === 0 ? (
        <form onSubmit={login} className="flex flex-col gap-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-3 flex items-center text-[#8E95A2] cursor-pointer"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      ) : (
        <div className="flex flex-col gap-2">
          <p>Select tenant:</p>
          {tenants.map((t) => (
            <Button
              key={t.id}
              variant="outline"
              disabled={loading}
              onClick={() => selectTenant(t.id)}
            >
              {t.name}
            </Button>
          ))}
          <Button variant="ghost" onClick={() => navigate(0)}>
            Back
          </Button>
        </div>
      )}
    </div>
  );
}

export default DevLogin;
