"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Users, User } from "lucide-react";

import CreateGroupModal from "./_components/create-group-modal";

export default function ContactsPage() {
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading } = useConvexQuery(api.contacts.getAllContacts);

  useEffect(() => {
    const createGroupParam = searchParams.get("createGroup");
    if (createGroupParam === "true") {
      setIsCreateGroupModalOpen(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("createGroup");
      router.replace(url.pathname + url.search);
    }
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  const { users, groups } = data || { users: [], groups: [] };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  function groupByAlphabet(list, key) {
    const sorted = [...list].sort((a, b) => a[key].localeCompare(b[key]));
    return sorted.reduce((acc, item) => {
      const letter = item[key][0]?.toUpperCase() || "#";
      acc[letter] = acc[letter] ? [...acc[letter], item] : [item];
      return acc;
    }, {});
  }

  const groupedUsers = groupByAlphabet(filteredUsers, "name");
  const groupedGroups = groupByAlphabet(filteredGroups, "name");

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="max-w-6xl mx-auto py-8 px-4 space-y-8"
    >

      {/* Header + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-5xl gradient-title">Contacts</h1>

        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people or groups..."
            className="px-3 py-2 border rounded-lg bg-white/70 backdrop-blur text-sm w-56 focus:outline-none focus:ring-2 focus:ring-green-900 transition"
          />

          <Button onClick={() => setIsCreateGroupModalOpen(true)} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* PEOPLE */}
        <Section title="People" icon={<User className="h-5 w-5" />}>
          {Object.keys(groupedUsers).length === 0 ? (
            <EmptyState message="No contacts match your search." />
          ) : (
            <div className="space-y-5">
              {Object.keys(groupedUsers).map((letter) => (
                <div key={letter}>
                  <p className="text-sm font-medium text-gray-500 mb-2">{letter}</p>
                  <div className="flex flex-col gap-3">
                    {groupedUsers[letter].map((user, i) => (
                      <FadeIn key={user.id} delay={i * 0.03}>
                        <Link href={`/person/${user.id}`}>
                          <Card className="rounded-xl border bg-white/70 backdrop-blur hover:bg-white/90 transition cursor-pointer">
                            <CardContent className="py-4 flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.imageUrl} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* GROUPS */}
        <Section title="Groups" icon={<Users className="h-5 w-5" />}>
          {Object.keys(groupedGroups).length === 0 ? (
            <EmptyState message="No groups match your search." />
          ) : (
            <div className="space-y-5">
              {Object.keys(groupedGroups).map((letter) => (
                <div key={letter}>
                  <p className="text-sm font-medium text-gray-500 mb-2">{letter}</p>
                  <div className="flex flex-col gap-3">
                    {groupedGroups[letter].map((group, i) => (
                      <FadeIn key={group.id} delay={i * 0.03}>
                        <Link href={`/groups/${group.id}`}>
                          <Card className="rounded-xl border bg-white/70 backdrop-blur hover:bg-white/90 transition cursor-pointer">
                            <CardContent className="py-4 flex items-center gap-3">
                              <div className="bg-green-900 p-2 rounded-lg">
                                <Users className="h-6 w-6 text-green-100" />
                              </div>
                              <div>
                                <p className="font-medium">{group.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {group.memberCount} members
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

      </div>

      {/* Modal */}
      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onSuccess={(groupId) => router.push(`/groups/${groupId}`)}
      />
    </motion.div>
  );
}

/* UI Helper Components */

function Section({ title, icon, children }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
        {icon} {title}
      </h2>
      {children}
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <Card className="rounded-xl bg-white/70 backdrop-blur border">
      <CardContent className="py-6 text-center text-muted-foreground">
        {message}
      </CardContent>
    </Card>
  );
}

function FadeIn({ children, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay }}
    >
      {children}
    </motion.div>
  );
}
