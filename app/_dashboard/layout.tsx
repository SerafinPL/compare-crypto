

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
          <div className="layout">
            {children}
          </div>
     
  );
}
