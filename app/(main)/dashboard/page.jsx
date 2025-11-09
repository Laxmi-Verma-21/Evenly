"use client";

import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import Link from "next/link";
import { PlusCircle, ChevronRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { ExpenseSummary } from "./components/expense-summary";
import { BalanceSummary } from "./components/balance-summary";
import { GroupList } from "./components/group-list";

export default function Dashboard() {
  const { data: balances, isLoading: balancesLoading } = useConvexQuery(api.dashboard.getUserBalances);
  const { data: groups, isLoading: groupsLoading } = useConvexQuery(api.dashboard.getUserGroups);
  const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery(api.dashboard.getTotalSpent);
  const { data: monthlySpending, isLoading: monthlySpendingLoading } = useConvexQuery(api.dashboard.getMonthlySpending);

  const isLoading = balancesLoading || groupsLoading || totalSpentLoading || monthlySpendingLoading;

  return (
    <div className="max-w-7xl mx-auto py-8 space-y-8 px-4">
      {isLoading ? (
        <div className="w-full py-16 flex justify-center">
          <BarLoader width={"50%"} color="#14b8a6" />
        </div>
      ) : (
        <>
          {/* HEADER with GRADIENT-TITLE KEPT */}
          <div className="flex justify-between items-center">
            <h1 className="text-5xl gradient-title">Dashboard</h1>
            <Button asChild size="sm">
              <Link href="/expenses/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Expense
              </Link>
            </Button>
          </div>

          {/* BALANCE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <BalanceCard title="Total Balance">
              {balances?.totalBalance > 0 ? (
                <span className="text-green-600 font-semibold text-xl">
                  +₹{balances?.totalBalance.toFixed(2)}
                </span>
              ) : balances?.totalBalance < 0 ? (
                <span className="text-red-600 font-semibold text-xl">
                  -₹{Math.abs(balances?.totalBalance).toFixed(2)}
                </span>
              ) : (
                <span className="text-xl font-semibold">₹0.00</span>
              )}
            </BalanceCard>

            <BalanceCard title="You are owed">
              <span className="text-green-600 font-semibold text-xl">
                ₹{balances?.youAreOwed.toFixed(2)}
              </span>
            </BalanceCard>

            <BalanceCard title="You owe">
              <span className="text-red-600 font-semibold text-xl">
                ₹{balances?.youOwe.toFixed(2)}
              </span>
            </BalanceCard>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <ExpenseSummary monthlySpending={monthlySpending} totalSpent={totalSpent} />
            </div>

            <div className="space-y-6">
              <SectionCard title="Balance Details" link="/contacts">
                <BalanceSummary balances={balances} />
              </SectionCard>

              <SectionCard title="Your Groups" link="/contacts">
                <GroupList groups={groups} />
                <CardFooter className="pt-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contacts?createGroup=true">
                      <Users className="mr-2 h-4 w-4" />
                      Create new group
                    </Link>
                  </Button>
                </CardFooter>
              </SectionCard>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function BalanceCard({ title, children }) {
  return (
    <Card className="rounded-xl shadow-sm border bg-white/70 backdrop-blur">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function SectionCard({ title, link, children }) {
  return (
    <Card className="rounded-xl shadow-sm border bg-white/70 backdrop-blur">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle>{title}</CardTitle>
        <Button variant="link" asChild className="p-0 text-sm">
          <Link href={link}>
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
