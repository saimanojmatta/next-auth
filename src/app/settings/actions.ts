"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { UpdateProfileValues, updateProfileSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

// To learn more about server actions, watch my YT tutorial: https://www.youtube.com/watch?v=XD5FpbVpWzk

export async function updateProfile(values: UpdateProfileValues) {
  // TODO: Get the currently authenticated user
  const sessions=await auth()
  const userId=sessions?.user?.id
  if(!userId){
    throw Error('unauthorized action')
  }

  const { name } = updateProfileSchema.parse(values);
  await prisma.user.update({
    where:{
      id:userId,
    },
    data:{
      name,
    }
  })
  revalidatePath('/')

  // TODO: Update user
}
