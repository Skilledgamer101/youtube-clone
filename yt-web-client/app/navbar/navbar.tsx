'use client';

import Image from "next/image"; //react Image element
import Link from "next/link"
import styles from "./navbar.module.css"
import SignIn from "./sign-in";
import { onAuthStateChangedHelper } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Upload from "./upload"

export default function Navbar() {
    // Init user state
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });

        // stop watching authentication state if the component dies
        return () => unsubscribe();
    });
    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image width = {90} height = {20}
                    src = "/youtube-logo.svg" alt = "YouTube Logo" />
            </Link>
            {
                user && <Upload />  // upload button only renders if user is signed in!
            }
            <SignIn user={user}/>
        </nav>
    );
}