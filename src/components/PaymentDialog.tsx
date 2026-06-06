import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "BRL",
  "INR",
  "NGN",
  "CNY",
];

const paymentMethods = [
  "Credit Card",
  "Bank Transfer",
  "Crypto Wallet",
  "Stablecoin",
  "Mobile Pay",
];

const rates: Record<string, number> = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.82,
  JPY: 145,
  AUD: 1.55,
  CAD: 1.37,
  BRL: 5.30,
  INR: 83.6,
  NGN: 1370,
  CNY: 7.30,
};

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);

const convertAmount = (amount: number, from: string, to: string) => {
  if (!amount || from === to) return amount;
  const usd = amount / (rates[from] || 1);
  return usd * (rates[to] || 1);
};

const PaymentDialog = ({ hubName }: { hubName: string }) => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("120");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");

  const numericAmount = Number(amount) || 0;
  const convertedAmount = useMemo(
    () => convertAmount(numericAmount, fromCurrency, toCurrency),
    [numericAmount, fromCurrency, toCurrency],
  );
  const networkFee = useMemo(() => Math.max(0.75, numericAmount * 0.015), [numericAmount]);

  const handleSubmit = async () => {
    setStatus("processing");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="lg">
          Pay in any currency
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay and Off-ramp</DialogTitle>
          <DialogDescription>
            Pay for {hubName} using any currency, then off-ramp into the local currency you need.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="space-y-4 pt-4">
            <p className="text-body text-foreground">Payment complete. Your funds were routed through a universal currency bridge and can be withdrawn or spent anywhere in the world.</p>
            <div className="rounded-xl border border-border bg-secondary/50 p-4">
              <p className="text-sm font-medium text-foreground">Payment summary</p>
              <p className="text-sm text-muted-foreground">Amount paid: {formatCurrency(numericAmount, fromCurrency)}</p>
              <p className="text-sm text-muted-foreground">Off-ramp currency: {toCurrency}</p>
              <p className="text-sm text-muted-foreground">Payment method: {paymentMethod}</p>
              <p className="text-sm text-muted-foreground">Network fee: {formatCurrency(networkFee, fromCurrency)}</p>
            </div>
            <Button onClick={() => setStatus("idle")}>Make another payment</Button>
          </div>
        ) : (
          <div className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Amount</label>
                <Input
                  type="number"
                  value={amount}
                  min={0}
                  step={1}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Pay with</label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="From currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Off-ramp to</label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="To currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Payment method</label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-secondary/50 p-4 text-sm">
              <p className="font-medium text-foreground">Payment preview</p>
              <p className="text-muted-foreground">You will pay {formatCurrency(numericAmount, fromCurrency)}.</p>
              <p className="text-muted-foreground">Receive approximately {formatCurrency(convertedAmount, toCurrency)} in {toCurrency}.</p>
              <p className="text-muted-foreground">Network fee: {formatCurrency(networkFee, fromCurrency)}</p>
            </div>

            <DialogFooter className="gap-2">
              <Button disabled={status === "processing" || numericAmount <= 0} onClick={handleSubmit}>
                {status === "processing" ? "Processing…" : "Confirm payment"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
