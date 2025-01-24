"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [onAuthStateChanged]);

  return user;
}
