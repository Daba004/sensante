import SessionWrapper from "@/components/SessionWrapper";
// ... autres imports (Inter, Header, Sidebar, etc.)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <SessionWrapper>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 bg-gray-50 p-8">
                {children}
              </main>
            </div>
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
