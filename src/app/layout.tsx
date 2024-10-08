import "~/styles/globals.css";

import {GeistSans} from "geist/font/sans";

import {TRPCReactProvider} from "~/trpc/react";
import {Header} from "./_components/header";
import React from "react";

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
        <body>
            <TRPCReactProvider>
                <Header/>
                <div className="h-[calc(100vh-5rem)]">
                    {children}
                </div>
            </TRPCReactProvider>
        </body>
        </html>
    );
};