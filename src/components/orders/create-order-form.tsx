"use client";

import type React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MOCK_MARKETS } from "@/constants/MockData";
import { formatCurrency } from "@/lib/utils";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { useState } from "react";

export function CreateOrderForm() {
  const [market, setMarket] = useState("SOL-PERP");
  const [orderType, setOrderType] = useState("limit");
  const [side, setSide] = useState("buy");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [postOnly, setPostOnly] = useState(false);
  const [reduceOnly, setReduceOnly] = useState(false);

  const selectedMarket = MOCK_MARKETS.find((m) => m.id === market);
  const marketPrice = selectedMarket?.price || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Reset form
      setSize("");
      if (orderType !== "market") {
        setPrice("");
      }
    }, 1500);
  };

  const handleMarketSelect = (value: string) => {
    setMarket(value);
    if (orderType === "limit") {
      const newMarket = MOCK_MARKETS.find((m) => m.id === value);
      if (newMarket) {
        setPrice(newMarket.price.toString());
      }
    }
  };

  const handleOrderTypeSelect = (value: string) => {
    setOrderType(value);
    if (value === "market") {
      setPrice("");
    } else if (value === "limit" && selectedMarket) {
      setPrice(selectedMarket.price.toString());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="market">Market</Label>
        <Select value={market} onValueChange={handleMarketSelect}>
          <SelectTrigger id="market">
            <SelectValue placeholder="Select market" />
          </SelectTrigger>
          <SelectContent>
            {MOCK_MARKETS.map((market) => (
              <SelectItem key={market.id} value={market.id}>
                {market.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="orderType">Order Type</Label>
        <Select value={orderType} onValueChange={handleOrderTypeSelect}>
          <SelectTrigger id="orderType">
            <SelectValue placeholder="Select order type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="market">Market</SelectItem>
            <SelectItem value="limit">Limit</SelectItem>
            <SelectItem value="stop">Stop</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Side</Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant={side === "buy" ? "default" : "outline"}
            className={
              side === "buy" ? "bg-success text-success-foreground" : ""
            }
            onClick={() => setSide("buy")}
          >
            <ArrowUp className="mr-2 h-4 w-4" />
            Buy
          </Button>
          <Button
            type="button"
            variant={side === "sell" ? "default" : "outline"}
            className={
              side === "sell"
                ? "bg-destructive text-destructive-foreground"
                : ""
            }
            onClick={() => setSide("sell")}
          >
            <ArrowDown className="mr-2 h-4 w-4" />
            Sell
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="size">Size</Label>
        <Input
          id="size"
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="0.00"
          step="any"
          min="0"
          required
        />
      </div>

      {orderType !== "market" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="price">Price</Label>
            {selectedMarket && (
              <div className="text-xs text-muted-foreground">
                Market: {formatCurrency(marketPrice)}
              </div>
            )}
          </div>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            step="any"
            min="0"
            required={orderType !== "market"}
          />
        </div>
      )}

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="advanced">
          <AccordionTrigger className="text-sm">
            Advanced Parameters
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="postOnly" className="cursor-pointer">
                  Post Only
                </Label>
                <Switch
                  id="postOnly"
                  checked={postOnly}
                  onCheckedChange={setPostOnly}
                  disabled={orderType === "market"}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="reduceOnly" className="cursor-pointer">
                  Reduce Only
                </Label>
                <Switch
                  id="reduceOnly"
                  checked={reduceOnly}
                  onCheckedChange={setReduceOnly}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {side === "buy" ? "Buy" : "Sell"} {market}
      </Button>
    </form>
  );
}
