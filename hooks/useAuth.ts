"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        // ✅ Déconnexion détectée, forcer un refresh propre
        setUser(null);
        router.refresh();
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return user;
}
