"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const settlementSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Amount must be a positive number",
    }),
  note: z.string().optional(),
  paymentType: z.enum(["youPaid", "theyPaid"]),
});

export default function SettlementForm({ entityType, entityData, onSuccess }) {
  const currentUser = useQuery(api.users.getCurrentUser);
  const createSettlement = useMutation(api.settlements.createSettlement);

  const [selectedGroupMemberId, setSelectedGroupMemberId] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(settlementSchema),
    defaultValues: {
      amount: "",
      note: "",
      paymentType: "youPaid",
    },
  });

  const onSubmit = async (data) => {
    const amount = parseFloat(data.amount);

    try {
      if (entityType === "user") {
        const paidByUserId =
          data.paymentType === "youPaid"
            ? currentUser._id
            : entityData.counterpart.userId;

        const receivedByUserId =
          data.paymentType === "youPaid"
            ? entityData.counterpart.userId
            : currentUser._id;

        await createSettlement({
          amount,
          note: data.note,
          paidByUserId,
          receivedByUserId,
        });
      }

      if (entityType === "group") {
        if (!selectedGroupMemberId) {
          toast.error("Please select a group member to settle with");
          return;
        }

        const paidByUserId =
          data.paymentType === "youPaid"
            ? currentUser._id
            : selectedGroupMemberId;

        const receivedByUserId =
          data.paymentType === "youPaid"
            ? selectedGroupMemberId
            : currentUser._id;

        await createSettlement({
          amount,
          note: data.note,
          paidByUserId,
          receivedByUserId,
          groupId: entityData.group.id,
        });
      }

      toast.success("Settlement recorded successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to record settlement: " + error.message);
    }
  };

  if (!currentUser) return null;

  if (entityType === "user") {
    const otherUser = entityData.counterpart;
    const netBalance = entityData.netBalance;

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">Current balance</h3>
          {netBalance === 0 ? (
            <p>You are all settled up with {otherUser.name}</p>
          ) : netBalance > 0 ? (
            <p>
              <span className="font-medium">{otherUser.name}</span> owes you{" "}
              <span className="font-bold text-green-600">
                ${netBalance.toFixed(2)}
              </span>
            </p>
          ) : (
            <p>
              You owe <span className="font-medium">{otherUser.name}</span>{" "}
              <span className="font-bold text-red-600">
                ${Math.abs(netBalance).toFixed(2)}
              </span>
            </p>
          )}
        </div>

        <RadioGroup
          defaultValue="youPaid"
          {...register("paymentType")}
          onValueChange={(value) =>
            register("paymentType").onChange({
              target: { name: "paymentType", value },
            })
          }
          className="space-y-2"
        >
          <div className="flex items-center space-x-2 border rounded-md p-3">
            <RadioGroupItem value="youPaid" id="youPaid" />
            <Label htmlFor="youPaid">You paid {otherUser.name}</Label>
          </div>

          <div className="flex items-center space-x-2 border rounded-md p-3">
            <RadioGroupItem value="theyPaid" id="theyPaid" />
            <Label htmlFor="theyPaid">{otherUser.name} paid you</Label>
          </div>
        </RadioGroup>

        <div className="space-y-2">
          <Label>Amount</Label>
          <Input type="number" step="0.01" min="0.01" {...register("amount")} />
          {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>Note (optional)</Label>
          <Textarea {...register("note")} />
        </div>

        <Button disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Recording..." : "Record settlement"}
        </Button>
      </form>
    );
  }

  // GROUP UI
  const groupMembers = entityData.balances;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Label>Select a member to settle with</Label>
      <div className="space-y-2">
        {groupMembers.map((member) => (
          <div
            key={member.userId}
            className={`border rounded-md p-3 cursor-pointer ${
              selectedGroupMemberId === member.userId
                ? "border-primary bg-primary/5"
                : "hover:bg-muted/50"
            }`}
            onClick={() => setSelectedGroupMemberId(member.userId)}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.imageUrl} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{member.name}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedGroupMemberId && (
        <>
          <RadioGroup
            defaultValue="youPaid"
            {...register("paymentType")}
            onValueChange={(value) =>
              register("paymentType").onChange({
                target: { name: "paymentType", value },
              })
            }
            className="space-y-2"
          >
            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="youPaid" id="youPaid" />
              <Label>You paid them</Label>
            </div>

            <div className="flex items-center space-x-2 border rounded-md p-3">
              <RadioGroupItem value="theyPaid" id="theyPaid" />
              <Label>They paid you</Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label>Amount</Label>
            <Input type="number" step="0.01" min="0.01" {...register("amount")} />
            {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Note (optional)</Label>
            <Textarea {...register("note")} />
          </div>
        </>
      )}

      <Button disabled={isSubmitting || !selectedGroupMemberId} className="w-full">
        {isSubmitting ? "Recording..." : "Record settlement"}
      </Button>
    </form>
  );
}
