"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { Plus, User, Users, UserX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { BarLoader } from "react-spinners";
import CreateGroupModal from "./_components/create-group-modal";

const ContactsPage = () => {
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const { data, isLoading } = useConvexQuery(api.contacts.getAllContacts);

  const router = useRouter();

  if (isLoading) {
    return (
      <div className="container mx-auto py-24">
        <BarLoader width={"100%"} color="#4CAF50" />
      </div>
    );
  }

  const { users, groups } = data || { users: [], groups: [] };

  return (
    <div className="container mx-auto py-12 space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-background py-4 z-10 border-b">
        <h1 className="text-5xl gradient-title">Contacts</h1>
        <Button
          onClick={() => setIsCreateGroupModalOpen(true)}
          className="shadow-md"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>

      {/* People Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center text-foreground">
          <User className="mr-2 h-6 w-6 text-[#2E7D32]" />
          People
        </h2>

        {users.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="flex flex-col items-center gap-3 text-muted-foreground">
              <UserX className="h-10 w-10 opacity-70 text-[#4CAF50]" />
              <p>No contacts yet. Add an expense with someone to see them here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <Link key={user.id} href={`/person/${user.id}`}>
                <Card className="hover:bg-muted/30 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md border border-muted rounded-xl">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border border-muted-foreground/10">
                        <AvatarImage src={user.imageUrl} />
                        <AvatarFallback className="bg-[#C8E6C9] text-[#1B5E20] font-semibold">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-lg">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Groups Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center text-foreground">
          <Users className="mr-2 h-6 w-6 text-[#2E7D32]" />
          Groups
        </h2>

        {groups.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent className="flex flex-col items-center gap-3 text-muted-foreground">
              <Users className="h-10 w-10 opacity-70 text-[#4CAF50]" />
              <p>No groups yet. Create a group to start tracking shared expenses.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <Link key={group.id} href={`/groups/${group.id}`}>
                <Card className="hover:bg-muted/30 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md border border-muted rounded-xl">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#E8F5E9] p-3 rounded-xl">
                        <Users className="h-6 w-6 text-[#1B5E20]" />
                      </div>
                      <div>
                        <p className="font-medium text-lg">{group.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {group.memberCount} members
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose = {() => setIsCreateGroupModalOpen(false)}
        onSuccess={(groupId) => router.push(`/groups/${groupId}`)}
      />
    </div>
  );
};

export default ContactsPage;
